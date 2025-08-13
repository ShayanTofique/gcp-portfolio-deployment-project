# GCP Portfolio Deployment Project  

## 📌 Overview  
This project demonstrates the **development and cloud deployment** of a modern portfolio application using **Google Cloud Platform (GCP)**.  
It covers deployment on both **Compute Engine** and **App Engine**, along with a **CI/CD pipeline** to automate builds, testing, and deployment.  
The project follows DevOps best practices for **scalability, automation, and monitoring**.  

## 🛠️ Tech Stack  
- **Frontend:** HTML, CSS, Bootstrap  
- **Backend:** Node.js & Javascript  
- **Containerization:** Docker  
- **Cloud Platform:** Google Cloud Platform (GCP)  
  - Compute Engine  
  - App Engine  
- **CI/CD:** GitHub Actions  
- **Infrastructure as Code (Optional):** Terraform  
- **Version Control:** Git & GitHub  

---

## ⚙️ Local Environment Setup
Before deploying or running locally, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js (v18)](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/docs/manual/installation/) (if running locally without Docker)

## 📥 Clone the Repository
Clone the repository to your local machine using Git.
```bash
git clone https://github.com/YourUsername/gcp-portfolio-deployment-project.git
cd gcp-portfolio-deployment-project
```

## 📦 Install Dependencies
Install the required dependencies based on your local environment setup.

- If running with **Docker**:
    ```bash
    docker compose --build up 
    ```

- If running **without Docker** (local setup):
    ```bash
    npm install
    ```

## ▶️ Run the Application Locally

### Using Docker
Start the application using Docker Compose:
```bash
docker compose up
```
Access the application at:  
[http://localhost:3000](http://localhost:3000)


(https://github.com/user-attachments/assets/a779ae7e-e16a-4db0-8264-5ac172cc1a32)

### Without Docker
Start the application directly:
```bash
npm start
```

## ☁️ Deploying to Google Cloud Platform (GCP)

### 1. Compute Engine Deployment
1. Build the Docker image:
    ```bash
    docker build -t gcp-portfolio .
    ```
2. Push the image to **Google Container Registry (GCR)**:
    ```bash
    docker tag gcp-portfolio gcr.io/<PROJECT_ID>/gcp-portfolio
    docker push gcr.io/<PROJECT_ID>/gcp-portfolio
    ```
3. Deploy the image to a **Compute Engine VM**.

### 2. App Engine Deployment
1. Ensure you have an `app.yaml` file configured.
2. Deploy using:
    ```bash
    gcloud app deploy
    ```

(https://github.com/user-attachments/assets/a5173095-6eb8-44d1-a423-d822930a9a9c)


## 🔄 CI/CD Pipeline
This project uses **GitHub Actions** for CI/CD:
- On every push to the `main` branch:
  - Code is built and tested.
  - The application is deployed to GCP automatically.

## 🛠️ Backend Stack
- **Node.js** – Backend runtime environment.
- **Express.js** – Web application framework.
- **MongoDB** – Database (Atlas or local).
- **Mongoose** – ODM for MongoDB.
- **Docker** – Containerization.
- **Google Cloud Platform** – Deployment infrastructure.

## 📂 Project Structure
```
├── src/                  # Application source code
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── controllers/      # Business logic
│   └── app.js            # Main application entry point
├── public/               # Static files
├── Dockerfile            # Docker build file
├── docker-compose.yml    # Docker Compose configuration
├── app.yaml              # GCP App Engine config
└── README.md             # Project documentation
```

## 🧪 Running Tests
Run tests locally:
```bash
npm test
```


