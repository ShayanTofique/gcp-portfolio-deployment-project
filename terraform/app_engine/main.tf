resource "google_project_service" "appengine" {
  project = var.project_id
  service = "appengine.googleapis.com"
}

resource "google_project_service" "cloudbuild" {
  project = var.project_id
  service = "cloudbuild.googleapis.com"
}

resource "google_project_service" "cloudapis" {
  project = var.project_id
  service = "cloudapis.googleapis.com"
}

resource "google_app_engine_application" "app" {
  project     = var.project_id
  location_id = var.region
}



