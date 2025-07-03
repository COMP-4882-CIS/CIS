#!/bin/bash

# Quick build script for local development
# Builds and runs the CIS backend Docker container locally

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_header "Quick Build - CIS Backend with Traefik Support"

# Build the Docker image
print_status "Building Docker image..."
docker build -t cis-backend:latest .

# Run a quick test with base path
print_status "Starting container for testing with base path..."
docker run -d --name cis-backend-quick-test -p 3002:3000 \
    -e NODE_ENV=production \
    -e BASE_PATH=/apis/cis \
    -e PORT=3000 \
    cis-backend:latest

# Wait a moment for startup
print_status "Waiting for container to start..."
sleep 10

# Test health endpoint with base path
if curl -f -s http://localhost:3002/apis/cis/health > /dev/null; then
    print_status "✅ Container is running successfully with base path!"
    print_status "API available at: http://localhost:3002/apis/cis"
    print_status "Swagger docs at: http://localhost:3002/apis/cis/api"
    print_status "Build info at: http://localhost:3002/apis/cis/build-info"
    print_status ""
    print_status "Production URLs will be:"
    print_status "  https://iis.memphis.edu/apis/cis/"
    print_status "  https://iis.memphis.edu/apis/cis/api"
else
    print_status "❌ Container health check failed"
    print_status "Checking logs..."
    docker logs cis-backend-quick-test
fi

echo
read -p "Keep container running? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_status "Stopping and removing container..."
    docker stop cis-backend-quick-test
    docker rm cis-backend-quick-test
    print_status "Container cleaned up"
else
    print_status "Container left running at http://localhost:3002"
    print_status "To stop: docker stop cis-backend-quick-test"
    print_status "To remove: docker rm cis-backend-quick-test"
fi
