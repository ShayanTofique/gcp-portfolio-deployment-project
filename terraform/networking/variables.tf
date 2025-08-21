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

variable "my_ip" {
  description = "Your local IP address for SSH access"
  type = string 
  default = "202.47.35.45"
}

variable "vpc_name" {
  description = "VPC Name"
  type        = string
  default     = "portfolio-vpc"
}