# Enable Firebase on the existing GCP project.
resource "google_firebase_project" "portfolio" {
  provider = google-beta
  project  = var.project_id

  depends_on = [google_project_service.services]
}

# Firebase Hosting site. site_id == project_id is Firebase's "default" site
# naming. For a brand-new project this creates it; if the project already had a
# default site provisioned, import it once:
#   terraform import google_firebase_hosting_site.portfolio <project-id>
resource "google_firebase_hosting_site" "portfolio" {
  provider = google-beta
  project  = var.project_id
  site_id  = var.project_id

  depends_on = [google_firebase_project.portfolio]
}

# Attach the custom domain. After apply, read the required DNS records from
# `terraform output custom_domain_dns_records` (or the Firebase console) and add
# them at your registrar. Firebase then auto-provisions the managed SSL cert.
resource "google_firebase_hosting_custom_domain" "domain" {
  provider              = google-beta
  project               = var.project_id
  site_id               = google_firebase_hosting_site.portfolio.site_id
  custom_domain         = var.domain
  wait_dns_verification = false

  depends_on = [google_firebase_hosting_site.portfolio]
}
