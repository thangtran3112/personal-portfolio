# Dedicated least-privilege runtime service account for the function.
resource "google_service_account" "fn_runtime" {
  project      = var.project_id
  account_id   = "contact-fn-runtime"
  display_name = "Contact function runtime SA"

  depends_on = [google_project_service.services]
}

# The operator bootstrap owns this existing project-level grant. Forget the
# old state entry WITHOUT revoking it; site deploys do not need Project IAM Admin.
removed {
  from = google_project_iam_member.compute_sa_builder

  lifecycle {
    destroy = false
  }
}

# --- Package the function source and upload it to a private bucket ---
# contact-function lives at the repo root (cloud-agnostic; may also target AWS
# Lambda later), two levels up from this Terraform module.
data "archive_file" "fn_source" {
  type        = "zip"
  source_dir  = "${path.module}/../../contact-function"
  output_path = "${path.module}/.build/contact-function.zip"
  excludes    = ["node_modules", ".gcloudignore", "README.md"]
}

resource "google_storage_bucket" "fn_source" {
  project                     = var.project_id
  name                        = "${var.project_id}-gcf-source"
  location                    = var.region
  uniform_bucket_level_access = true
  force_destroy               = true

  depends_on = [google_project_service.services]
}

resource "google_storage_bucket_object" "fn_source" {
  name   = "contact-function-${data.archive_file.fn_source.output_md5}.zip"
  bucket = google_storage_bucket.fn_source.name
  source = data.archive_file.fn_source.output_path
}

resource "google_cloudfunctions2_function" "contact" {
  project  = var.project_id
  name     = var.function_name
  location = var.region

  build_config {
    runtime     = "nodejs22"
    entry_point = "contact"

    source {
      storage_source {
        bucket = google_storage_bucket.fn_source.name
        object = google_storage_bucket_object.fn_source.name
      }
    }
  }

  service_config {
    max_instance_count    = 3
    min_instance_count    = 0 # scale to zero; cold start accepted
    available_memory      = "256Mi"
    timeout_seconds       = 30
    ingress_settings      = "ALLOW_ALL"
    service_account_email = google_service_account.fn_runtime.email

    environment_variables = {
      ALLOWED_ORIGINS    = var.allowed_origins
      NOTIFICATION_EMAIL = var.notification_email
      FROM_EMAIL         = var.from_email
    }

    secret_environment_variables {
      key        = "RESEND_API_KEY"
      project_id = var.project_id
      secret     = google_secret_manager_secret.resend_api_key.secret_id
      version    = "latest"
    }
  }

  depends_on = [
    google_project_service.services,
    google_secret_manager_secret_iam_member.fn_accessor,
    google_secret_manager_secret_version.resend_api_key,
  ]
}

# Public contact endpoint. 2nd-gen functions are backed by Cloud Run, so allow
# unauthenticated invocations by granting run.invoker to allUsers.
resource "google_cloud_run_v2_service_iam_member" "public_invoker" {
  project  = var.project_id
  location = var.region
  name     = google_cloudfunctions2_function.contact.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
