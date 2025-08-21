provider "google" {
  project     = var.project_id
  region      = var.region
  credentials = file("terraform-sa-key.json")

}

# GKE Cluster
resource "google_container_cluster" "primary" {
  name     = var.cluster_name
  location = var.region
  deletion_protection = false

  network    = var.vpc_id
  subnetwork = var.private_subnet_id

  remove_default_node_pool = true
  initial_node_count       = 1

  # Secondary ranges for IP aliasing (must match subnet definition)
  ip_allocation_policy {
    cluster_secondary_range_name  = "gke-pods"
    services_secondary_range_name = "gke-services"
  }

  # Workload Identity
  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  # Enable autoscaling & load balancing
  addons_config {
    horizontal_pod_autoscaling {
      disabled = false
    }
    http_load_balancing {
      disabled = false
    }
  }

  # Required when using custom subnets with secondary ranges
  networking_mode = "VPC_NATIVE"
}

# Node Pool
resource "google_container_node_pool" "primary_nodes" {
  name     = "primary-node-pool"
  cluster  = google_container_cluster.primary.name
  location = var.region

  node_config {
    machine_type = "e2-medium" # or e2-standard-4
    oauth_scopes = ["https://www.googleapis.com/auth/cloud-platform"]

    labels = {
      env  = "dev"
      team = "devops"
    }

    tags = ["gke-node"]
  }

  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }

  initial_node_count = 1
}
