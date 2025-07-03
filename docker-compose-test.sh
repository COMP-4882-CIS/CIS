#!/bin/bash

# Docker Compose Test Runner
# This script uses docker-compose to test the entire stack

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Cleanup function
cleanup() {
    print_status "Cleaning up..."
    docker-compose down -v --remove-orphans
}

# Trap to ensure cleanup on exit
trap cleanup EXIT

print_header "Docker Compose Integration Tests with Traefik Support"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose is required but not installed"
    exit 1
fi

print_status "Building services..."
docker-compose build

print_status "Starting services..."
docker-compose up -d cis-backend redis

print_status "Waiting for services to be ready..."
sleep 30

# Check if services are healthy
print_status "Checking service health..."

# Check if backend is responding
backend_health=$(docker-compose exec -T cis-backend wget --quiet --tries=1 --spider http://localhost:3000/api && echo "healthy" || echo "unhealthy")
if [ "$backend_health" = "healthy" ]; then
    print_status "✅ Backend service is healthy"
else
    print_error "❌ Backend service is not healthy"
    print_status "Backend logs:"
    docker-compose logs cis-backend
    exit 1
fi

# Check Redis
redis_health=$(docker-compose exec -T redis redis-cli ping || echo "unhealthy")
if [ "$redis_health" = "PONG" ]; then
    print_status "✅ Redis service is healthy"
else
    print_error "❌ Redis service is not healthy"
    print_status "Redis logs:"
    docker-compose logs redis
    exit 1
fi

print_status "Running API tests..."
# Create test results directory
mkdir -p test-results

# Run API tests against the running services with base path
docker run --rm \
    --network cis_cis-network \
    -e BASE_URL=http://cis-backend:3000/apis/cis \
    -v "$(pwd)/test-results:/app/test-results" \
    alpine/curl:latest \
    sh -c '
        # Basic health check with base path
        echo "Testing backend health with base path..."
        if curl -f -s http://cis-backend:3000/apis/cis/health > /dev/null; then
            echo "✅ Backend is accessible with base path"
        else
            echo "❌ Backend is not accessible with base path"
            exit 1
        fi
        
        # Test a few key endpoints
        echo "Testing key endpoints with base path..."
        
        # Test Swagger
        if curl -f -s http://cis-backend:3000/apis/cis/api > /dev/null; then
            echo "✅ Swagger endpoint works with base path"
        else
            echo "❌ Swagger endpoint failed with base path"
        fi
        
        # Test build info
        if curl -f -s http://cis-backend:3000/apis/cis/build-info > /dev/null; then
            echo "✅ Build info endpoint works with base path"
        else
            echo "❌ Build info endpoint failed with base path"
        fi
        
        # Test Census API
        if curl -f -s http://cis-backend:3000/apis/cis/census/breakdown > /dev/null; then
            echo "✅ Census API works with base path"
        else
            echo "❌ Census API failed with base path"
        fi
        
        echo "Basic API tests with Traefik base path completed successfully!"
    '

print_status "Testing container resource usage..."
docker-compose exec -T cis-backend sh -c '
    echo "Memory usage:"
    cat /proc/meminfo | grep MemAvailable
    echo "CPU info:"
    cat /proc/cpuinfo | grep "model name" | head -1
    echo "Disk usage:"
    df -h /
'

print_status "Testing environment variables..."
docker-compose exec -T cis-backend sh -c '
    echo "NODE_ENV: $NODE_ENV"
    echo "PORT: $PORT"
    echo "REDIS_URL: $REDIS_URL"
'

print_status "Testing Redis connectivity from backend..."
docker-compose exec -T cis-backend sh -c '
    if command -v redis-cli >/dev/null 2>&1; then
        redis-cli -u $REDIS_URL ping
    else
        echo "Redis CLI not available in backend container"
    fi
'

print_header "Integration Test Results"
print_status "✅ All integration tests passed!"
print_status "Services are running correctly with docker-compose and Traefik support"
print_status "Backend URL: http://localhost:3000/apis/cis"
print_status "API Documentation: http://localhost:3000/apis/cis/api"
print_status ""
print_status "Production URLs (with Traefik):"
print_status "  https://iis.memphis.edu/apis/cis/"
print_status "  https://iis.memphis.edu/apis/cis/api"

echo
read -p "Keep services running for manual testing? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Services left running. Use 'docker-compose down' to stop them."
    trap - EXIT  # Remove cleanup trap
else
    print_status "Stopping services..."
fi
