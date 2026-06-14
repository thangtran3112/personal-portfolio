terraform {
  required_version = ">= 1.5.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }

  # Recommended: keep state in a private GCS bucket so the Resend secret never
  # lives on a laptop. Create the bucket once, then uncomment and run
  # `terraform init -migrate-state`.
  #
  # backend "gcs" {
  #   bucket = "tobytran-portfolio-tfstate"
  #   prefix = "portfolio/gcp"
  # }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

data "google_project" "portfolio" {
  project_id = var.project_id
}
