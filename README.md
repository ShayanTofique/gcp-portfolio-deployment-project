# 🚀 Portfolio Website - Full-Stack Cloud Application

[![Deploy Status](https://img.shields.io/badge/Deploy-Success-brightgreen)](https://github.com/yourusername/portfolio)
[![Cloud Platform](https://img.shields.io/badge/Cloud-Google%20Cloud-blue)](https://cloud.google.com)
[![Container](https://img.shields.io/badge/Container-Docker-blue)](https://www.docker.com/)
[![Monitoring](https://img.shields.io/badge/Monitoring-Prometheus%20%26%20Grafana-orange)](https://grafana.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-green)](https://github.com/features/actions)

A modern, cloud-native portfolio website showcasing full-stack development, DevOps practices, and cloud engineering skills. Built with scalability, observability, and best practices in mind.

## 🎯 Project Overview

This portfolio project demonstrates proficiency in modern web development, containerization, cloud deployment, and DevOps practices. It features a complete CI/CD pipeline, comprehensive monitoring, and multi-environment deployment strategies.

<!-- **Live Demo:** [https://your-portfolio-url.com](https://your-portfolio-url.com) -->

## 🛠️ Technology Stack

### **Frontend**
- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Custom styling with modern layout techniques
- **Bootstrap 5** - Responsive design framework
- **JavaScript** - Interactive user interface components

### **Backend**
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web framework for routing and middleware
- **RESTful APIs** - Clean API design for data management
- **Environment Configuration** - Secure configuration management

### **Containerization & Orchestration**
- **Docker** - Application containerization
- **Multi-stage builds** - Optimized container images
- **Kubernetes (GKE)** - Container orchestration and scaling
- **Pod autoscaling** - Dynamic resource management

### **Cloud Infrastructure (Google Cloud Platform)**
- **Compute Engine** - Virtual machine instances
- **App Engine** - Serverless application hosting
- **Google Kubernetes Engine (GKE)** - Managed Kubernetes clusters
  - **Node Types:** e2-medium, e2-small for cost optimization
- **Cloud Load Balancing** - Traffic distribution and high availability
- **Cloud Storage** - Static asset management

### **DevOps & CI/CD**
- **GitHub Actions** - Automated build, test, and deployment pipelines
- **Docker Registry** - Container image management
- **Automated testing** - Quality assurance integration
- **Security scanning** - Vulnerability detection

### **Infrastructure as Code**
- **Terraform** - Infrastructure provisioning and management
- **Environment parity** - Consistent deployments across environments

### **Observability & Monitoring**
- **Prometheus** - Metrics collection and monitoring
- **Grafana** - Data visualization and dashboards
- **Custom metrics** - Application performance monitoring
- **Alerting** - Proactive incident detection
- **Health checks** - Service reliability monitoring

### **Version Control & Collaboration**
- **Git** - Distributed version control
- **GitHub** - Code repository and collaboration platform
- **Branch protection** - Code quality enforcement

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Users/Clients │───▶│  Cloud Load      │───▶│   GKE Cluster   │
│                 │    │  Balancer        │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                │                 │
┌─────────────────┐    ┌──────────────────┐    │  ┌───────────┐  │
│   GitHub Repo   │───▶│  GitHub Actions  │───▶│  │    App    │  │
│                 │    │     CI/CD        │    │  │   Pods    │  │
└─────────────────┘    └──────────────────┘    │  └───────────┘  │
                                                │                 │
┌─────────────────┐    ┌──────────────────┐    │  ┌───────────┐  │
│   Terraform     │───▶│   GCP Resources  │    │  │Prometheus │  │
│   (IaC)         │    │                  │    │  │ Grafana   │  │
└─────────────────┘    └──────────────────┘    │  └───────────┘  │
                                                └─────────────────┘
```

## 🚀 Key Features

### **Application Features**
- 📱 **Responsive Design** - Mobile-first approach with Bootstrap
- ⚡ **Fast Loading** - Optimized assets and efficient caching
- 🔒 **Security** - HTTPS, security headers, and input validation
- 📊 **Analytics Ready** - Integrated tracking and metrics
- 🎨 **Modern UI/UX** - Clean, professional design

### **DevOps Features**
- 🔄 **Automated CI/CD** - Zero-downtime deployments
- 📈 **Horizontal Scaling** - Kubernetes-based auto-scaling
- 🔍 **Comprehensive Monitoring** - Real-time metrics and alerts
- 🛡️ **Security Scanning** - Automated vulnerability detection
- 📋 **Infrastructure as Code** - Version-controlled infrastructure

### **Cloud-Native Features**
- ☁️ **Multi-cloud Ready** - Portable containerized architecture
- 📊 **Observability** - Distributed tracing and logging
- 🔧 **Configuration Management** - Environment-specific configs
- 💾 **Data Persistence** - Stateful and stateless components

## 📊 Monitoring & Observability

### **Custom Metrics**
- HTTP request rates and response times
- Application uptime and health status
- Resource utilization (CPU, memory, disk)
- Error rates and status code distribution
- Active connections and throughput

### 🎬 **Monitoring Dashboard Demo**
[![Prometheus Grafana Visualization](https://img.youtube.com/vi/YOUR_MONITORING_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_MONITORING_VIDEO_ID)
> **Duration:** 4-5 minutes  
> **Content:**  Real-time metrics visualization.

### **Dashboards**
- **Application Performance** - Response times, throughput, errors
- **Infrastructure Metrics** - Node health, resource usage
- **Business Metrics** - User interactions, page views
- **Alerts Configuration** - Proactive monitoring and notifications

### **Health Endpoints**
- `/health` - Application health check
- `/metrics` - Prometheus metrics endpoint
- `/ready` - Kubernetes readiness probe

## 🚀 Local Development

### **Prerequisites**
- Node.js 18+
- Docker & Docker Compose
- kubectl (for Kubernetes)
- Terraform (optional)

### **Setup**
```bash
# Clone the repository
git clone https://github.com/ShayanTofique/gcp-portfolio-deployment-project.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run locally
node backend/app.js
# Access at http://localhost:3000

# Run with Docker
docker-compose up --build
# Access at http://localhost:3000
```

### 🎬 **Docker Compose Local Development Demo**
[![Docker Compose](https://img.youtube.com/vi/YOUR_DOCKER_COMPOSE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_DOCKER_COMPOSE_VIDEO_ID)
> **Duration:** 2-3 minutes  
> **Content:** Complete local setup 

### **Development Workflow**
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
npm test
npm run lint

# Build and test container
docker build -t portfolio:dev .
docker run -p 3000:3000 portfolio:dev

# Commit and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create pull request
```

## 🚢 Deployment

### **Environments**
- **Development** - Local development environment
- **Production** - GKE cluster for live application (`main` branch)

### 🎬 **Multi-Platform Deployment Demos**

#### **1. Google App Engine Deployment**
[![App Engine Deployment](https://img.youtube.com/vi/YOUR_APP_ENGINE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_APP_ENGINE_VIDEO_ID)
> **Duration:** 3-4 minutes  
> **Content:** Serverless deployment to App Engine

**Demo Highlights:**
- `app.yaml` configuration explanation
- `gcloud app deploy` process
- Automatic scaling demonstration
- Custom domain setup
- Log monitoring in Cloud Console

#### **2. Compute Engine Deployment**
[![Compute Engine Deployment](https://img.youtube.com/vi/YOUR_COMPUTE_ENGINE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_COMPUTE_ENGINE_VIDEO_ID)
> **Duration:** 4-5 minutes  
> **Content:** VM-based deployment, startup scripts, load balancer configuration, and manual scaling process.

**Demo Highlights:**
- VM instance creation and configuration
- Docker installation and setup
- Application deployment via startup script
- Load balancer configuration
- Health check setup
- Manual scaling demonstration

#### **3. Google Kubernetes Engine (GKE) Deployment**
[![GKE Deployment](https://img.youtube.com/vi/YOUR_GKE_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_GKE_VIDEO_ID)
> **Duration:** 5-6 minutes  
> **Content:** Complete Kubernetes deployment and cluster management.

**Demo Highlights:**
- GKE cluster creation (e2-medium, e2-small nodes)
- Kubernetes manifests walkthrough
- Pod deployment and service exposure
- Ingress controller setup
- ConfigMap and Secret management
- Rolling updates demonstration

### 🎬 **Horizontal Pod Autoscaler (HPA) & Load Testing**
[![HPA Load Testing Demo](https://img.youtube.com/vi/YOUR_HPA_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_HPA_VIDEO_ID)
> **Duration:** 4-5 minutes  
> **Content:** HPA configuration, load testing setup, real-time scaling observation, and performance metrics analysis.

**Commands Demonstrated:**
```bash
# HPA Setup
kubectl autoscale deployment portfolio-deployment --cpu-percent=50 --min=1 --max=10

# Load Testing
kubectl run -i --tty load-generator --rm --image=busybox --restart=Never -- /bin/sh
# while true; do wget -q -O- http://portfolio-service; done

# Monitoring Scaling
kubectl get hpa portfolio-deployment --watch
kubectl get pods -l app=portfolio --watch
```

### **Deployment Pipeline**
1. **Code Push** - Developer pushes to GitHub
2. **CI Pipeline** - Automated testing and security scanning
3. **Container Build** - Docker image creation and registry push
4. **Infrastructure Update** - Terraform applies infrastructure changes
5. **Application Deploy** - Kubernetes deployment with rolling updates
6. **Health Verification** - Automated health checks and monitoring
7. **Notification** - Deployment status updates 

### 🎬 **Complete CI/CD Pipeline Demo**
[![Full CI/CD Demo](https://img.youtube.com/vi/YOUR_CICD_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_CICD_VIDEO_ID)
> **Duration:** 6-8 minutes  
> **Content:** End-to-end CI/CD demonstration from code commit to production deployment, including automated testing, security scanning and deployment to GKE Cluster.

**Pipeline Stages Demonstrated:**

#### **1. Continuous Integration (CI)**
- Code push trigger demonstration
- Automated testing execution
- Code quality checks (ESLint, security scanning)
- Docker image build and push to registry
- Multi-stage pipeline execution in GitHub Actions

#### **2. Continuous Deployment (CD)**
- Kubernetes manifests deployment
- Rolling update strategy
- Health check validation
- Rollback demonstration (if deployment fails)

#### **3. Pipeline Monitoring**
- GitHub Actions workflow visualization
- Real-time build logs
- Deployment status notifications
- Integration with email notifications

**GitHub Actions Workflow Highlights:**
```yaml
# Shown in video: .github/workflows/deploy.yml
name: Deploy to GKE
on:
  push:
    branches: [main]
jobs:
  test-build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      - name: Run tests
      - name: Build Docker image
      - name: Deploy to GKE
      - name: Verify deployment
```

### **Manual Deployment**
```bash
# Build and push container
docker build -t gcr.io/your-project/portfolio:latest .
docker push gcr.io/your-project/portfolio:latest

# Deploy to Kubernetes
kubectl apply -f k8s/
kubectl rollout status deployment/portfolio-deployment

# Verify deployment
kubectl get pods -l app=portfolio
curl https://your-domain.com/health
```

## 🎯 Skills Demonstrated

### **Technical Skills**
- ✅ Full-stack web development
- ✅ Container orchestration with Kubernetes
- ✅ Cloud-native application design
- ✅ Infrastructure as Code with Terraform
- ✅ CI/CD pipeline implementation
- ✅ Monitoring and observability
- ✅ Security best practices
- ✅ Performance optimization

### **DevOps & Cloud Skills**
- ✅ Google Cloud Platform expertise
- ✅ Docker containerization
- ✅ Kubernetes cluster management
- ✅ Automated deployment pipelines
- ✅ Infrastructure automation
- ✅ Monitoring and alerting setup
- ✅ Multi-environment management
- ✅ Incident response and troubleshooting

## 🚧 Future Enhancements

- [ ] **Multi-region deployment** for global availability
- [ ] **Progressive Web App** features
- [ ] **Advanced caching** with Redis
- [ ] **Microservices architecture** migration
- [ ] **Service mesh** implementation (Istio)
- [ ] **GitOps** workflow with ArgoCD
- [ ] **Machine Learning** integration for analytics
- [ ] **Chaos engineering** for resilience testing

## 📞 Contact & Links

<!-- - **Portfolio Website:** [https://your-portfolio-url.com](https://your-portfolio-url.com) -->
- **GitHub Repository:** [https://github.com/ShayanTofique/gcp-portfolio-deployment-project](https://github.com/ShayanTofique/gcp-portfolio-deployment-project)
- **LinkedIn:** [https://www.linkedin.com/in/shayan-tofique-374457294/](https://www.linkedin.com/in/shayan-tofique-374457294/)
- **Email:** shayantofique137@gmail.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*This portfolio project demonstrates modern full-stack development, cloud engineering, and DevOps practices. It showcases the ability to design, develop, deploy, and maintain production-ready applications using industry best practices and cutting-edge technologies.*