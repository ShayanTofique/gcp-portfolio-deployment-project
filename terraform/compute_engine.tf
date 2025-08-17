resource "google_compute_firewall" "default_allow_http" {
  name    = "default-allow-http"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80", "8080"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["http-server"]
} 


resource "google_compute_instance" "vm_instance" {
  name         = var.instance_name
  machine_type = var.machine_type
  zone         = var.zone
  tags         = ["http-server"]

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-2204-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  metadata_startup_script = file("${path.module}/startup.sh") 

  metadata = {
  APP_BRANCH   = var.app_branch
  APP_REPO_URL = var.app_repo_url
  MONGODB_URI  = var.mongodb_uri
  PORT         = var.expose_port
}

}