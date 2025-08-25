output "vpc_name" {
  description = "Name of the VPC"
  value       = module.networking.vpc_name
}

output "vpc_id" {
  description = "VPC Id"
  value       = module.networking.vpc_id
}

output "public_subnet_id" {
  value = module.networking.public_subnet_id
}

output "private_subnet_id" {
  value = module.networking.public_subnet_id
}

output "cluster_name" {
  description = "GKE cluster name"
  value       = module.gke_small.cluster_name
}

output "cluster_zone" {
  description = "GKE cluster zone"
  value       = module.gke_small.cluster_zones
}

output "cluster_endpoint" {
  description = "GKE cluster endpoint"
  value       = module.gke_small.cluster_endpoint
}

output "cluster_location" {
  description = "GKE cluster location"
  value       = module.gke_small.cluster_location
}

output "cluster_ca_certificate" {
  description = "Cluster CA certificate for authentication"
  value       = module.gke_small.cluster_ca_certificate
  sensitive   = true
}

