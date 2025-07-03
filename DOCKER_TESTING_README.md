# Docker Test Documentation

This directory contains comprehensive Docker testing scripts to ensure your CIS backend application works correctly in a containerized environment.

## Test Scripts Overview

### 1. `docker-test.sh` - Main Container Test
**Primary comprehensive test for the Docker container**

**Features:**
- Builds and runs the Docker container
- Tests container health and resource usage
- Validates all major API endpoints
- Checks environment configuration
- Provides interactive option to keep container running

**Usage:**
```bash
chmod +x docker-test.sh
./docker-test.sh
```

### 2. `api-test.sh` - Detailed API Testing
**Comprehensive API endpoint testing**

**Features:**
- Tests all Census API endpoints
- Tests all Landmarks API endpoints  
- Tests Schools and Mem-DataHub APIs
- Tests Export functionality (POST requests)
- Error handling verification
- Generates detailed test report

**Usage:**
```bash
chmod +x api-test.sh
./api-test.sh
```

### 3. `docker-compose-test.sh` - Stack Integration Testing
**Tests the complete application stack with dependencies**

**Features:**
- Uses docker-compose for full stack testing
- Includes Redis cache testing
- Service health monitoring
- Network connectivity verification
- Integration between services

**Usage:**
```bash
chmod +x docker-compose-test.sh
./docker-compose-test.sh
```

### 4. `performance-test.sh` - Performance & Load Testing
**Performance and load testing for production readiness**

**Features:**
- Load testing with Apache Benchmark
- Resource usage monitoring
- Performance metrics collection
- Response time analysis
- Concurrent request handling

**Requirements:**
- Apache Benchmark (ab) tool
- bc calculator

**Usage:**
```bash
chmod +x performance-test.sh
./performance-test.sh
```

## Docker Compose Setup

### Files:
- `docker-compose.yml` - Production-ready compose configuration
- `.env.docker` - Environment variables template
- `Dockerfile.test` - Test container configuration

### Usage:
```bash
# Start the stack
docker-compose up -d

# Run integration tests
./docker-compose-test.sh

# Stop the stack
docker-compose down
```

## Quick Start Guide

1. **Make scripts executable:**
```bash
chmod +x *.sh
```

2. **Run basic container test:**
```bash
./docker-test.sh
```

3. **Run comprehensive API tests:**
```bash
./api-test.sh
```

4. **Test with docker-compose:**
```bash
./docker-compose-test.sh
```

5. **Performance testing:**
```bash
./performance-test.sh
```

## Test Results

Each test script generates detailed results:

- **docker-test.sh**: Console output with interactive prompts
- **api-test.sh**: `api-test-results.txt` with detailed endpoint results
- **performance-test.sh**: CSV files with performance metrics
- **docker-compose-test.sh**: Real-time console output

## Configuration

### Environment Variables
Update `.env.docker` with your actual API keys:
```env
CENSUS_API_KEY=your_actual_census_api_key
API_KEY=your_actual_mem_datahub_api_key
```

### Test Parameters
Modify test scripts to adjust:
- Port numbers
- Timeout values
- Performance thresholds
- Test endpoints

## Troubleshooting

### Common Issues:

1. **Port conflicts**: Change `TEST_PORT` in scripts if 3001 is in use
2. **Permission denied**: Run `chmod +x *.sh` to make scripts executable
3. **Docker not found**: Ensure Docker is installed and running
4. **API failures**: Check if external APIs (Census, Mem-DataHub) are accessible

### Debug Steps:

1. Check container logs:
```bash
docker logs cis-backend-test
```

2. Inspect container:
```bash
docker exec -it cis-backend-test /bin/sh
```

3. Verify Dockerfile builds:
```bash
docker build -t cis-backend .
```

## CI/CD Integration

These scripts can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions step
- name: Run Docker Tests
  run: |
    chmod +x docker-test.sh
    ./docker-test.sh
```

## Test Coverage

The test suite covers:
- ✅ Container build and startup
- ✅ Health endpoint verification
- ✅ All API endpoint functionality
- ✅ Error handling
- ✅ Performance under load
- ✅ Resource usage monitoring
- ✅ Service integration
- ✅ Environment configuration
- ✅ Cache functionality (Redis)
- ✅ Security (non-root user)

## Next Steps

After successful testing:
1. Deploy to production environment
2. Set up monitoring and alerting
3. Configure backup strategies
4. Implement log aggregation
5. Set up auto-scaling if needed
