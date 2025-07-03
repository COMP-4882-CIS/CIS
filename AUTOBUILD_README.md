# CIS Backend Autobuild Documentation

## Overview
The autobuild script automates the process of building, testing, and deploying the CIS backend Docker container. It's designed to work with your existing Docker Compose setup and integrates with the comprehensive test suite.

## Scripts Available

### 1. `autobuild.sh` - Full CI/CD Pipeline
**Complete automated build and release process**

**Features:**
- Extracts Git information (commit, branch, messages)
- Creates version information files
- Builds Docker image with docker-compose
- Runs comprehensive Docker tests
- Tags and pushes to registry
- Creates GitHub releases
- Includes cleanup options

**Usage:**
```bash
./autobuild.sh
```

**Prerequisites:**
- Docker and docker-compose installed
- Git repository initialized
- GitHub token (will prompt if not set)
- Docker registry access

### 2. `quick-build.sh` - Local Development
**Fast local build and test**

**Features:**
- Quick Docker image build
- Basic health check
- Local testing on port 3002
- Interactive cleanup

**Usage:**
```bash
./quick-build.sh
```

## Environment Variables

### Required for autobuild.sh:
- `GITHUB_TOKEN` - GitHub personal access token (will prompt if not set)

### Optional:
- `DOCKER_TEST_AUTO` - Set to "true" for non-interactive testing
- `CENSUS_API_KEY` - Census API key
- `API_KEY` - Mem-DataHub API key

## Docker Compose Integration

The autobuild script works with the docker-compose.yml configuration:

```yaml
services:
  cis-backend:
    build:
      context: .
      dockerfile: Dockerfile
    image: cis-backend:main  # Updated by autobuild
```

The script automatically updates the image tag to match the current branch.

## Build Artifacts

### Generated Files:
- `./build-info/versionInfo.json` - Complete build metadata
- `./build-info/buildInfo.js` - JavaScript export format

### Build Info Structure:
```json
{
  "commitID": "abc123...",
  "buildTimestamp": "Monday 2025-07-02",
  "buildersUsername": "username",
  "branch": "main",
  "repoURL": "git@github.com:user/repo.git",
  "last5commitMessages": "Recent commits...",
  "releaseName": "v2025-07-02-14-30-00-main-autobuild"
}
```

## Test Integration

The autobuild script automatically runs:
1. Docker container tests (`docker-test.sh`)
2. API endpoint validation
3. Health checks
4. Resource monitoring

Tests must pass before pushing to registry.

## Git Integration

### Automatic Tagging:
- Format: `v{YYYY-MM-DD-HH-MM-SS}-{branch}-autobuild`
- Example: `v2025-07-02-14-30-00-main-autobuild`

### GitHub Releases:
- Automatic release creation
- Includes commit messages
- Tagged with build timestamp

## Error Handling

The script includes comprehensive error handling:
- Git repository validation
- Docker build verification
- Test failure detection
- Registry push confirmation

## Workflow Example

```bash
# 1. Make your changes
git add .
git commit -m "Add new feature"

# 2. Run autobuild
./autobuild.sh

# 3. Script will:
#    - Extract git info
#    - Build Docker image
#    - Run tests
#    - Push to registry
#    - Create GitHub release
```

## Local Development Workflow

```bash
# Quick build and test
./quick-build.sh

# Full test suite
./docker-test.sh

# Performance testing
./performance-test.sh

# Stack integration testing
./docker-compose-test.sh
```

## Customization

### Modify Image Names:
Edit the `docker-compose.yml` and autobuild script to change:
- Image repository
- Registry location
- Tagging strategy

### Add Build Steps:
Extend `autobuild.sh` to include:
- Additional testing
- Security scanning
- Deployment hooks
- Notification systems

## Troubleshooting

### Common Issues:

1. **Docker login fails**
   - Ensure Docker credentials are configured
   - Check registry access permissions

2. **Git push fails**
   - Verify GitHub token permissions
   - Check repository access rights

3. **Tests fail**
   - Review test output in console
   - Check container logs: `docker logs cis-backend-test`

4. **Build context issues**
   - Verify .dockerignore is properly configured
   - Check file permissions

### Debug Mode:
Add `set -x` to any script for verbose output:
```bash
#!/bin/bash
set -x  # Enable debug mode
set -e  # Exit on error
```

## Integration with CI/CD

The autobuild script can be integrated with:
- GitHub Actions
- GitLab CI
- Jenkins
- Azure DevOps

Example GitHub Action:
```yaml
name: Autobuild
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run autobuild
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: ./autobuild.sh
```
