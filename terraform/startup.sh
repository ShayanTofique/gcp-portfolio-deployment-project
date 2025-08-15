#!/bin/bash
set -eux

# Fetch metadata values from GCP
APP_BRANCH=$(curl -s -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/attributes/APP_BRANCH")
APP_REPO_URL=$(curl -s -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/attributes/APP_REPO_URL")
PORT=$(curl -s -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/attributes/PORT")
MONGODB_URI=$(curl -s -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/attributes/MONGODB_URI")

# Install dependencies
apt-get update
apt-get install -y ca-certificates curl git gnupg

# Install Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo ${VERSION_CODENAME}) stable" \
| tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

systemctl enable docker
systemctl start docker

# Clone application
mkdir -p /opt/app
cd /opt/app
git clone --branch "$APP_BRANCH" "$APP_REPO_URL" repo
cd repo

# Create .env file for app
cat <<EOF > /opt/app/repo/.env
PORT=$PORT
MONGODB_URI=$MONGODB_URI
EOF

# Run app with Docker Compose
docker compose up -d
