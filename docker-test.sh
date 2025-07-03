#!/bin/bash

# Docker Container Test Script
# This script tests the Docker container to ensure it's working correctly
#
# Usage:
#   ./docker-test.sh          - Run tests with existing image or build if needed
#   ./docker-test.sh --rebuild - Force rebuild the image before testing
#   ./docker-test.sh -r       - Short form of --rebuild

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="cis-backend"
CONTAINER_NAME="cis-backend-test"
TEST_PORT=3001
BASE_PATH="/apis/cis"
BASE_URL=${BASE_URL:-"http://localhost:${TEST_PORT}${BASE_PATH}"}
HEALTH_ENDPOINT="/health"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to cleanup containers
cleanup() {
    print_status "Cleaning up test containers..."
    sudo docker stop $CONTAINER_NAME 2>/dev/null || true
    sudo docker rm $CONTAINER_NAME 2>/dev/null || true
}

# Function to wait for container to be ready
wait_for_container() {
    local timeout=60
    local count=0
    
    print_status "Waiting for container to be ready..."
    
    while [ $count -lt $timeout ]; do
        if curl -f -s "$BASE_URL$HEALTH_ENDPOINT" > /dev/null 2>&1; then
            print_status "Container is ready!"
            return 0
        fi
        
        sleep 1
        count=$((count + 1))
        
        if [ $((count % 10)) -eq 0 ]; then
            print_status "Still waiting... ($count/$timeout seconds)"
        fi
    done
    
    print_error "Container failed to become ready within $timeout seconds"
    return 1
}

# Function to test API endpoints
test_api_endpoints() {
    print_status "Testing API endpoints..."
    
    # Test health endpoint
    print_status "Testing health endpoint..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$HEALTH_ENDPOINT")
    if [ "$response" -eq 200 ]; then
        print_status "✅ Health endpoint test passed"
    else
        print_error "❌ Health endpoint test failed (HTTP $response)"
        return 1
    fi
    
    # Test Swagger documentation
    print_status "Testing Swagger documentation..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api")
    if [ "$response" -eq 200 ]; then
        print_status "✅ Swagger documentation accessible"
    else
        print_warning "⚠️  Swagger documentation not accessible (HTTP $response)"
    fi
    
    # Test build info endpoint
    print_status "Testing build info endpoint..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/build-info")
    if [ "$response" -eq 200 ]; then
        print_status "✅ Build info endpoint accessible"
    else
        print_warning "⚠️  Build info endpoint not accessible (HTTP $response)"
    fi
    
    # Test Census API endpoints
    print_status "Testing Census API endpoints..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/census/breakdown")
    if [ "$response" -eq 200 ]; then
        print_status "✅ Census breakdown endpoint accessible"
    else
        print_warning "⚠️  Census breakdown endpoint not accessible (HTTP $response)"
    fi
    
    # Test Landmarks API endpoints
    print_status "Testing Landmarks API endpoints..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/landmarks/parks")
    if [ "$response" -eq 200 ]; then
        print_status "✅ Landmarks parks endpoint accessible"
    else
        print_warning "⚠️  Landmarks parks endpoint not accessible (HTTP $response)"
    fi
    
    # Test Schools API endpoints
    print_status "Testing Schools API endpoints..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/schools/breakdown?schoolID=1")
    if [ "$response" -eq 200 ]; then
        print_status "✅ Schools breakdown endpoint accessible"
    else
        print_warning "⚠️  Schools breakdown endpoint not accessible (HTTP $response)"
    fi
    
    # Test Mem-DataHub API endpoints
    print_status "Testing Mem-DataHub API endpoints..."
    response=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/mem-datahub/test")
    if [ "$response" -eq 200 ]; then
        print_status "✅ Mem-DataHub test endpoint accessible"
    else
        print_warning "⚠️  Mem-DataHub test endpoint not accessible (HTTP $response)"
    fi
}

# Function to test container health
test_container_health() {
    print_status "Testing container health..."
    
    # Check if container is running
    if sudo docker ps | grep -q $CONTAINER_NAME; then
        print_status "✅ Container is running"
    else
        print_error "❌ Container is not running"
        return 1
    fi
    
    # Check container logs for errors
    print_status "Checking container logs for errors..."
    error_count=$(sudo docker logs $CONTAINER_NAME 2>&1 | grep -i error | wc -l)
    if [ "$error_count" -eq 0 ]; then
        print_status "✅ No errors found in container logs"
    else
        print_warning "⚠️  Found $error_count error(s) in container logs"
        print_status "Recent logs:"
        sudo docker logs --tail 10 $CONTAINER_NAME
    fi
    
    # Test container resource usage
    print_status "Checking container resource usage..."
    stats=$(sudo docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" $CONTAINER_NAME)
    print_status "Container stats:"
    echo "$stats"
}

# Function to test environment variables
test_environment() {
    print_status "Testing environment configuration..."
    
    # Check if NODE_ENV is set
    node_env=$(sudo docker exec $CONTAINER_NAME printenv NODE_ENV 2>/dev/null || echo "not_set")
    print_status "NODE_ENV: $node_env"
    
    # Check if port is properly configured
    port=$(sudo docker exec $CONTAINER_NAME printenv PORT 2>/dev/null || echo "3000")
    print_status "PORT: $port"
}

# Main test function
main() {
    print_status "Starting Docker container tests..."
    print_status "Image: cis-backend:latest"
    print_status "Container: $CONTAINER_NAME"
    print_status "Test Port: $TEST_PORT"
    print_status "Base Path: $BASE_PATH"
    print_status "Test URL: $BASE_URL"
    
    # Cleanup any existing test containers
    cleanup
    
    # Check if we should force rebuild
    if [ "$1" = "--rebuild" ] || [ "$1" = "-r" ]; then
        print_status "Force rebuilding Docker image..."
        sudo docker rmi cis-backend:latest 2>/dev/null || true
        sudo docker build -t cis-backend:latest .
    else
        # Build the Docker image if it doesn't exist
        if ! sudo docker images | grep -q "cis-backend.*latest"; then
            print_status "Building Docker image..."
            sudo docker build -t cis-backend:latest .
        else
            print_status "Using existing Docker image cis-backend:latest"
        fi
    fi
    
    # Run the container with base path support
    print_status "Starting test container with Traefik base path support..."
    
    # Check if image exists before running
    if ! sudo docker images | grep -q "cis-backend.*latest"; then
        print_error "Image cis-backend:latest not found!"
        print_status "Available images:"
        sudo docker images | grep cis-backend || echo "No cis-backend images found"
        exit 1
    fi
    
    sudo docker run -d --name $CONTAINER_NAME -p $TEST_PORT:3000 \
        -e NODE_ENV=production \
        -e BASE_PATH=$BASE_PATH \
        -e PORT=3000 \
        cis-backend:latest
    
    # Wait for container to be ready
    if ! wait_for_container; then
        print_error "Container failed to start properly"
        sudo docker logs $CONTAINER_NAME
        cleanup
        exit 1
    fi
    
    # Run tests
    test_container_health
    test_environment
    test_api_endpoints
    
    print_status "All tests completed!"
    print_status "Container is running at: $BASE_URL"
    print_status "Swagger documentation: $BASE_URL/api"
    print_status "Build info: $BASE_URL/build-info"
    print_status "Production URLs will be:"
    print_status "  Main API: https://iis.memphis.edu$BASE_PATH/"
    print_status "  Swagger: https://iis.memphis.edu$BASE_PATH/api"
    
    # Ask user if they want to keep the container running (unless in auto mode)
    echo
    if [ "$DOCKER_TEST_AUTO" = "true" ]; then
        print_status "Auto mode: cleaning up test container"
        cleanup
        print_status "Test container cleaned up"
    else
        read -p "Keep container running for manual testing? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            cleanup
            print_status "Test container cleaned up"
        else
            print_status "Container left running for manual testing"
            print_status "To stop: docker stop $CONTAINER_NAME"
            print_status "To remove: docker rm $CONTAINER_NAME"
        fi
    fi
}

# Check if required tools are installed
command -v docker >/dev/null 2>&1 || { print_error "Docker is required but not installed. Aborting."; exit 1; }
command -v curl >/dev/null 2>&1 || { print_error "curl is required but not installed. Aborting."; exit 1; }

# Run main function
main "$@"
