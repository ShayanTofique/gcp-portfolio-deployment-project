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

variable "cluster_name" {
  description = "GKE Cluster Name"
  type        = string
  default     = "portfolio-gke-cluster"
}

variable "vpc_id" {
    default = "projects/gcpportfolio-469108/global/networks/portfolio-vpc"
}
variable "private_subnet_id" {
    default = "projects/gcpportfolio-469108/regions/us-central1/subnetworks/gcpportfolio-469108-public-subnet"
}
