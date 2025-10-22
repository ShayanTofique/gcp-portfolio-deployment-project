🚀 Portfolio Website - Full-Stack Cloud Application

[![Deploy Status](https://img.shields.io/badge/Deploy-Success-brightgreen)](https://github.com/ShayanTofique/gcp-portfolio-deployment-project)
[![Cloud Platform](https://img.shields.io/badge/Cloud-Google%20Cloud-blue)](https://cloud.google.com)
[![Container](https://img.shields.io/badge/Container-Docker-blue)](https://www.docker.com/)
[![Monitoring](https://img.shields.io/badge/Monitoring-Prometheus%20%26%20Grafana-orange)](https://grafana.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-green)](https://github.com/features/actions)

A modern, cloud-native portfolio website demonstrating multiple deployment strategies on Google Cloud Platform. This project showcases full-stack development, containerization, orchestration, monitoring, and DevOps practices across different cloud deployment models.

## 🎯 Project Overview

This portfolio project demonstrates proficiency in modern cloud deployment strategies, from local development to production-grade Kubernetes clusters. It features comprehensive monitoring, CI/CD automation, and scalability testing across multiple GCP services.

[portfolio website.webm](https://github.com/user-attachments/assets/747a00ff-4e70-4c1f-89c8-190dccde5d41)

## 🛠️ Technology Stack

### **Frontend**
- **HTML5 & CSS3** - Modern responsive design
- **Bootstrap 5** - Mobile-first responsive framework
- **JavaScript** - Interactive components

### **Backend**
- **Node.js & Express.js** - Server-side application
- **RESTful APIs** - Clean API architecture
- **Prometheus Metrics** - Custom application monitoring

### **Containerization & Cloud**
- **Docker** - Application containerization
- **Google Cloud Platform** - Multi-service deployment
- **Kubernetes (GKE)** - Container orchestration
- **Terraform** - Infrastructure as Code

### **Monitoring & Observability**
- **Prometheus** - Metrics collection
- **Grafana** - Real-time dashboards
- **Custom Metrics** - HTTP requests, response times, errors
- **Horizontal Pod Autoscaler** - Load-based scaling

### **DevOps**
- **GitHub Actions** - Automated CI/CD pipeline
- **Multi-environment deployment** - Seamless deployments
- **Load testing** - Performance validation

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Users/Clients │───▶│  Cloud Load      │───▶│   Application   │
│                 │    │  Balancer        │    │    Services     │
└─────────────────┘    └──────────────────┘    └─────────────────┘

┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   GitHub Repo   │───▶│  GitHub Actions  │───▶│  GCP Deployment │
│                 │    │     CI/CD        │    │   (Multi-mode)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘

┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Prometheus    │───▶│     Grafana      │───▶│  Real-time      │
│   (Metrics)     │    │   (Dashboard)    │    │  Monitoring     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Deployment Demonstrations

### **1. Local Development with Docker Compose**

🎬 **[Watch Demo](https://youtu.be/C_qEkeIr_Zw)**

**Setup:**
```bash
# Clone and setup
git clone https://github.com/ShayanTofique/gcp-portfolio-deployment-project.git
cd gcp_portfolio

# Run with Docker Compose
docker-compose up --build
# Access at http://localhost:3000
```

### **2. Google App Engine Deployment**

🎬 [app_engine.webm](https://github.com/user-attachments/assets/257593dc-7fe0-4931-b83b-8a7e72f2bfc1)

**Commands:**
```bash
# Deploy to App Engine
gcloud app deploy app.yaml
gcloud app browse
```

### **3. Compute Engine Deployment**

🎬 [compute engine VM.webm](https://github.com/user-attachments/assets/a39d0d74-2876-4423-8e27-c9204bd82874)

**Key Features:**
```bash
# Create VM with startup script
gcloud compute instances create portfolio-vm \
    --image-family=ubuntu-2004-lts \
    --image-project=ubuntu-os-cloud \
    --machine-type=e2-medium \
    --startup-script-url=gs://your-bucket/startup.sh
```

**Demo Highlights:**
- VM provisioning with terraform and Docker setup
- SSH to VM 
- Application deployment via startup scripts

---

### **4. Google Kubernetes Engine (GKE) Deployment**

🎬 

**Cluster Setup:**
```bash
# Create GKE cluster
gcloud container clusters create portfolio-cluster \
    --num-nodes=3 \
    --machine-type=e2-medium \
    --zone=us-central1-a

# Deploy application
kubectl apply -f k8s/deployment.yaml
kubectl get pods -l app=portfolio
```

### **5. Kubernetes HPA & Load Testing**

🎬 **[HPA Auto-scaling Under Load Demo](https://www.youtube.com/watch?v=YOUR_HPA_VIDEO_ID)**
> **Duration:** 5 minutes | **Real-time scaling based on CPU/memory usage**

**Load Testing Setup:**
```bash

# Generate load
python load_test.py

# Watch scaling in real-time
kubectl get hpa portfolio-deployment --watch
kubectl get pods -l app=portfolio --watch
```

**Demo Highlights:**
- HPA configuration and thresholds
- Load generation with multiple concurrent requests
- Real-time pod scaling (1→5→10 pods)

---

### **6. Complete CI/CD Pipeline**

🎬 **[End-to-End CI/CD Pipeline Demo](https://www.youtube.com/watch?v=YOUR_CICD_VIDEO_ID)**
> **Duration:** 7 minutes | **Automated deployment from code commit to production**

**Pipeline Stages:**
```yaml
# GitHub Actions Workflow
name: Deploy to GKE
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      - name: Run tests  
      - name: Build Docker image
      - name: Push to GCR
      - name: Deploy to GKE
      - name: Verify deployment
```

**Demo Highlights:**
- Code commit triggering automated pipeline
- Automated testing and security scanning
- Docker image build and registry push
- Kubernetes deployment with rolling updates
- Health check validation
- Rollback demonstration on failure
- Real-time pipeline monitoring

---

### **7. Prometheus & Grafana Monitoring**

🎬 **[Complete Monitoring Stack Demo](https://www.youtube.com/watch?v=YOUR_MONITORING_VIDEO_ID)**
> **Duration:** **Real-time application and infrastructure monitoring**

**Monitoring Setup:**
```bash
# Deploy monitoring stack with Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring

# Create ServiceMonitor for app
kubectl apply -f monitoring/portfolio-servicemonitor.yaml
```

**Demo Highlights:**
- Prometheus metrics collection setup
- Custom Node.js application metrics
- 5-panel Grafana dashboard creation
- Real-time traffic simulation
- HTTP request rates, response times, error tracking



## 📊 Monitoring Dashboard Features

### **5 Core Monitoring Panels:**
1. **HTTP Requests per Second** - Real-time traffic patterns
2. **Response Time Percentiles** - 95th/50th percentile tracking
3. **Total HTTP Requests** - Cumulative request counter
4. **Current Request Rate** - Live traffic indicator
5. **HTTP Status Codes** - Health and error monitoring

### **Custom Metrics Integration:**
- Application performance monitoring
- Infrastructure resource utilization
- Business metrics tracking
- Proactive alerting on anomalies

## 🎯 Skills Demonstrated

### **Cloud & Infrastructure**
✅ Multi-platform GCP deployments  
✅ Kubernetes cluster management  
✅ Infrastructure as Code (Terraform)  
✅ Container orchestration  
✅ Load balancing and auto-scaling  

### **DevOps & Automation**
✅ Complete CI/CD pipeline implementation  
✅ Automated testing and deployment  
✅ Infrastructure monitoring and alerting  
✅ Performance testing and optimization  
✅ Multi-environment management  

### **Development & Architecture**
✅ Full-stack application development  
✅ RESTful API design  
✅ Containerized application architecture  
✅ Observability and metrics integration  
✅ Security best practices  

## 🔧 Quick Start

```bash
# Clone the repository
git clone https://github.com/ShayanTofique/gcp-portfolio-deployment-project.git
cd portfolio

# Local development
docker-compose up --build

# Deploy to GCP (choose your deployment method)
# Option 1: App Engine
gcloud app deploy

# Option 2: Compute Engine  
./scripts/deploy-compute-engine.sh

# Option 3: GKE
./scripts/deploy-gke.sh
```

## 📞 Contact

- **GitHub:** [https://github.com/ShayanTofique/gcp-portfolio-deployment-project](https://github.com/ShayanTofique/gcp-portfolio-deployment-project)
- **LinkedIn:** [https://www.linkedin.com/in/shayan-tofique-374457294/](https://www.linkedin.com/in/shayan-tofique-374457294/)
- **Email:** shayantofique137@gmail.com

---


*This portfolio demonstrates modern cloud deployment strategies, DevOps automation, and production-ready monitoring across multiple Google Cloud Platform services.*







