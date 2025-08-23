module "networking" {
  source     = "./networking"
  project_id = var.project_id
  region     = var.region
  vpc_name   = "portfolio-vpc"
  my_ip      = var.my_ip
}

module "gke" {
  source            = "./gke"
  project_id        = var.project_id
  region            = var.region
  cluster_name      = var.cluster_name
  vpc_id            = module.networking.vpc_id
  private_subnet_id = module.networking.private_subnet_id
}

module "artifact_registry" {
  source            = "./artifact_registry"
}

module "appengine" {
  source = "./app_engine"
}

module "compute_engine" {
  source = "./compute_engine"
}

module "secrets" {
  source = "./secrets"
  
}


