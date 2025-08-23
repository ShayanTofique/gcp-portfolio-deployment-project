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

variable "zone" {
  description = "The Google Cloud zone"
  type        = string
  default     = "us-central1-c"
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

variable "expose_port" {
  description = "App listening port on VM"
  type        = number
  default     = 8080
}

# variable "mongodb_uri" {
#   description = "The MongoDB connection URI"
#   type        = string
#   sensitive   = true
# }