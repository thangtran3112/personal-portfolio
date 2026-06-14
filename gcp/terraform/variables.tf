variable "project_id" {
  description = "GCP project ID for the Portfolio project (globally unique)."
  type        = string
}

variable "region" {
  description = "Region for the Cloud Function and its source bucket."
  type        = string
  default     = "us-west1"
}

variable "domain" {
  description = "Custom domain served by Firebase Hosting."
  type        = string
  default     = "tobytran.dev"
}

variable "notification_email" {
  description = "Where contact-form submissions are emailed."
  type        = string
  default     = "thangtran3112@gmail.com"
}

variable "from_email" {
  description = "Resend sender address (must be on a domain verified in Resend)."
  type        = string
  default     = "Portfolio Contact <contact@tobytran.dev>"
}

variable "resend_api_key" {
  description = "Resend API key. Pass via TF_VAR_resend_api_key; never commit it."
  type        = string
  sensitive   = true
}

variable "function_name" {
  description = "Name of the contact Cloud Function (also the URL path segment)."
  type        = string
  default     = "contact"
}

variable "allowed_origins" {
  description = "CORS allowlist (comma-separated) for the contact function."
  type        = string
  default     = "https://tobytran.dev,https://thangtrandev.net,https://tobytran-portfolio.web.app,http://localhost:3000"
}
