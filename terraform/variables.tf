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


variable "machine_type" {
  description = "The machine type for the VM"
  type        = string
  default     = "e2-micro"
}

variable "instance_name" {
  description = "Compute Engine VM name"
  type        = string
  default     = "portfolio-vm"
}

variable "expose_port" {
  description = "App listening port on VM"
  type        = number
  default     = 8080
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

variable "app_repo_url" {
  description = "The GitHub repository containing the application"
  type        = string
  default     = "https://github.com/ShayanTofique/gcp-portfolio-deployment-project.git"
}

variable "mongodb_uri" {
  description = "The MongoDB connection URI"
  type        = string
  sensitive   = true
}

variable "cluster_name" {
  description = "GKE Cluster Name"
  type        = string
  default     = "portfolio-gke-cluster"
}

variable "repository_id" {
  description = "Artifact Registry for my gcp app images"
  type        = string
  default     = "my-gcp-app-repo"
}
