variable "region" {
  description = "The Google Cloud region"
  type        = string
  default     = "us-central1"
}

variable "repository_id" {
  description = "Artifact Registry for my gcp app images"
  type        = string
  default     = "my-gcp-app-repo"
}