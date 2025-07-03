#!/bin/bash

# Performance Test Script for Docker Container
# Tests the application under load to ensure it performs well in production

set -e

# Configuration
BASE_PATH="/apis/cis"
BASE_URL="http://localhost:3001${BASE_PATH}"
CONTAINER_NAME="cis-backend-perf-test"
CONCURRENT_REQUESTS=10
TOTAL_REQUESTS=100
TEST_DURATION=60  # seconds

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

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    local missing_tools=()
    
    if ! command -v docker &> /dev/null; then
        missing_tools+=("docker")
    fi
    
    if ! command -v curl &> /dev/null; then
        missing_tools+=("curl")
    fi
    
    if ! command -v ab &> /dev/null; then
        print_warning "Apache Benchmark (ab) not found. Installing..."
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y apache2-utils
        elif command -v yum &> /dev/null; then
            sudo yum install -y httpd-tools
        else
            missing_tools+=("apache2-utils (for ab command)")
        fi
    fi
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        print_error "Missing required tools: ${missing_tools[*]}"
        exit 1
    fi
}

# Function to run performance test on endpoint
run_performance_test() {
    local endpoint="$1"
    local description="$2"
    
    print_status "Testing $description..."
    
    # Run Apache Benchmark
    ab -n $TOTAL_REQUESTS -c $CONCURRENT_REQUESTS -g "${endpoint//\//_}.tsv" "$BASE_URL$endpoint" > "${endpoint//\//_}_results.txt" 2>&1
    
    # Extract key metrics
    local requests_per_sec=$(grep "Requests per second:" "${endpoint//\//_}_results.txt" | awk '{print $4}')
    local mean_time=$(grep "Time per request:" "${endpoint//\//_}_results.txt" | head -1 | awk '{print $4}')
    local failed_requests=$(grep "Failed requests:" "${endpoint//\//_}_results.txt" | awk '{print $3}')
    
    echo "  Requests per second: $requests_per_sec"
    echo "  Mean time per request: $mean_time ms"
    echo "  Failed requests: $failed_requests"
    
    # Store results
    echo "$description,$requests_per_sec,$mean_time,$failed_requests" >> performance_results.csv
}

# Function to monitor container resources during test
monitor_resources() {
    local duration=$1
    local interval=5
    local count=0
    local max_count=$((duration / interval))
    
    print_status "Monitoring container resources for ${duration}s..."
    
    echo "timestamp,cpu_percent,memory_usage,memory_limit" > resource_usage.csv
    
    while [ $count -lt $max_count ]; do
        local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
        local stats=$(docker stats --no-stream --format "{{.CPUPerc}},{{.MemUsage}}" $CONTAINER_NAME 2>/dev/null)
        
        if [ -n "$stats" ]; then
            echo "$timestamp,$stats" >> resource_usage.csv
        fi
        
        sleep $interval
        count=$((count + 1))
    done
}

# Main performance test function
main() {
    print_header "Docker Container Performance Tests with Traefik Base Path"
    
    # Check requirements
    check_requirements
    
    # Initialize results file
    echo "endpoint,requests_per_sec,mean_time_ms,failed_requests" > performance_results.csv
    
    # Check if container is running
    if ! docker ps | grep -q $CONTAINER_NAME; then
        print_error "Container $CONTAINER_NAME is not running"
        print_status "Please run the docker-test.sh script first to start the container"
        exit 1
    fi
    
    # Wait for application to be ready
    print_status "Waiting for application to be ready..."
    for i in {1..30}; do
        if curl -f -s "$BASE_URL/api" > /dev/null; then
            break
        fi
        sleep 1
    done
    
    # Start resource monitoring in background
    monitor_resources $TEST_DURATION &
    local monitor_pid=$!
    
    print_status "Starting performance tests..."
    print_status "Configuration: $CONCURRENT_REQUESTS concurrent requests, $TOTAL_REQUESTS total requests per endpoint"
    
    # Test various endpoints with base path
    run_performance_test "/health" "Health endpoint"
    run_performance_test "/api" "API documentation"
    run_performance_test "/build-info" "Build info endpoint"
    run_performance_test "/census/breakdown" "Census breakdown"
    run_performance_test "/landmarks/parks" "Landmarks parks"
    run_performance_test "/schools/breakdown?schoolID=1" "Schools breakdown"
    run_performance_test "/mem-datahub/test" "Mem-DataHub test"
    
    # Wait for resource monitoring to complete
    wait $monitor_pid
    
    # Generate summary report
    print_header "Performance Test Summary"
    
    if [ -f performance_results.csv ]; then
        print_status "Performance Results:"
        column -t -s',' performance_results.csv
        
        # Calculate averages
        local avg_rps=$(awk -F',' 'NR>1 {sum+=$2; count++} END {if(count>0) print sum/count; else print 0}' performance_results.csv)
        local avg_time=$(awk -F',' 'NR>1 {sum+=$3; count++} END {if(count>0) print sum/count; else print 0}' performance_results.csv)
        local total_failed=$(awk -F',' 'NR>1 {sum+=$4} END {print sum+0}' performance_results.csv)
        
        echo
        print_status "Overall Averages:"
        echo "  Average requests per second: $avg_rps"
        echo "  Average response time: $avg_time ms"
        echo "  Total failed requests: $total_failed"
    fi
    
    if [ -f resource_usage.csv ]; then
        print_status "Resource Usage Summary:"
        echo "  Peak CPU usage: $(awk -F',' 'NR>1 {gsub(/%/, "", $2); if($2>max) max=$2} END {print max"%"}' resource_usage.csv)"
        echo "  Peak memory usage: $(awk -F',' 'NR>1 {print $3}' resource_usage.csv | sort -n | tail -1)"
    fi
    
    # Performance thresholds
    local min_rps=10
    local max_response_time=1000
    
    if (( $(echo "$avg_rps >= $min_rps" | bc -l) )); then
        print_status "✅ Performance test PASSED - Average RPS ($avg_rps) meets minimum threshold ($min_rps)"
    else
        print_error "❌ Performance test FAILED - Average RPS ($avg_rps) below minimum threshold ($min_rps)"
    fi
    
    if (( $(echo "$avg_time <= $max_response_time" | bc -l) )); then
        print_status "✅ Response time test PASSED - Average response time ($avg_time ms) within acceptable limit"
    else
        print_error "❌ Response time test FAILED - Average response time ($avg_time ms) exceeds limit ($max_response_time ms)"
    fi
    
    print_status "Detailed results saved to:"
    print_status "  - performance_results.csv"
    print_status "  - resource_usage.csv"
    print_status "  - Individual endpoint results: *_results.txt"
}

# Run main function
main "$@"
