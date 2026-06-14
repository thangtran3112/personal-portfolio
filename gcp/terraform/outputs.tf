output "function_uri" {
  description = "Cloud Run URL backing the contact function."
  value       = google_cloudfunctions2_function.contact.service_config[0].uri
}

output "function_url_stable" {
  description = "Stable cloudfunctions.net URL. Set this as the NEXT_PUBLIC_CONTACT_API_URL GitHub variable."
  value       = "https://${var.region}-${var.project_id}.cloudfunctions.net/${var.function_name}"
}

output "hosting_site_id" {
  description = "Firebase Hosting site id (use in .firebaserc / firebase deploy)."
  value       = google_firebase_hosting_site.portfolio.site_id
}

output "custom_domain_dns_records" {
  description = "DNS records to add at your registrar for the custom domain (Firebase Hosting)."
  value       = google_firebase_hosting_custom_domain.domain.required_dns_updates
}
