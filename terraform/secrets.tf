resource "google_secret_manager_secret" "mongodb_uri" {
  secret_id = "mongodb-uri"
  replication {
    auto {}
  }
}

resource "google_secret_manager_secret_version" "mongodb_uri_version" {
  secret      = google_secret_manager_secret.mongodb_uri.id
  secret_data = var.mongodb_uri
}
