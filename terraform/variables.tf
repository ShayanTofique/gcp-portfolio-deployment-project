variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
  default     = "gcpportfolio-469108"
}

variable "region" {
  description = "The Google Cloud region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "The Google Cloud zone"
  type        = string
  default     = "us-central1-c"
}

variable "my_ip" {
  description = "Your local IP address for SSH access"
  type = string 
  default = "202.47.35.45"
}

variable "use_docker" {
  description = "true to use docker-compose on the VM, false for Node+PM2"
  type        = bool
  default     = true
}

variable "app_branch" {
  description = "The branch of the repository to deploy"
  type        = string
  default     = "master"
}

variable "cluster_name" {
  description = "GKE Cluster Name"
  type        = string
  default     = "portfolio-gke-cluster"
}

