output "vm_ip" {
  description = "Public IP of the VM"
  value       = google_compute_instance.vm_instance.network_interface[0].access_config[0].nat_ip
}

output "mongodb_uri" {
  value     = var.mongodb_uri
  sensitive = true
}

output "vpc_name" {
  value = module.networking.vpc_name
}

output "vpc_id" {
  value = module.networking.vpc_id
}

output "public_subnet_id" {
  value = module.networking.public_subnet_id
}

output "private_subnet_id" {
  value = module.networking.private_subnet_id
}
