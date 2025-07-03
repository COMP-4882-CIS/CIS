#!/bin/bash

# CIS Backend Autobuild Script
# Builds, tests, and pushes Docker images for the CIS backend application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository. Please initialize git first."
    exit 1
fi

print_header "CIS Backend Autobuild for Traefik Deployment"


# Get Git information with descriptive messages
echo "** Retrieving Git information..."
COMMIT_ID=$(git rev-parse HEAD)
echo "  - Commit ID: $COMMIT_ID"
BUILD_TIMESTAMP=$(date +"%A %Y-%m-%d")
echo "  - Build Timestamp: $BUILD_TIMESTAMP"
BUILDER_USERNAME=$(git config user.name)
echo "  - Builder Username: $BUILDER_USERNAME"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)  # Use git rev-parse for branch name
echo "  - Branch: $CURRENT_BRANCH"
REPO_URL=$(git config --get remote.origin.url)
echo "  - Repository URL: $REPO_URL"

# Get the last 5 commit messages
COMMIT_MESSAGES=$(git log --pretty=format:"%s" -n 5 HEAD | sed 's/\n//g')

#remove newlines from commit messages
COMMIT_MESSAGES=$(echo $COMMIT_MESSAGES | tr -d '\n')

#remove all double quotes from commit messages
COMMIT_MESSAGES=$(echo $COMMIT_MESSAGES | tr -d '"')

# Create a release on GitHub with datestamp (vYYYY-MM-DD-HH-MM-SS)
RELEASE_NAME="v$(date +"%Y-%m-%d-%H-%M-%S")-$CURRENT_BRANCH-autobuild"
# Create a release on GitHub with Traefik deployment info
RELEASE_BODY="Built and pushed image for branch: $CURRENT_BRANCH\\n\\nDeployment URL: https://iis.memphis.edu/apis/cis/\\nAPI Documentation: https://iis.memphis.edu/apis/cis/api\\nHealth Check: https://iis.memphis.edu/apis/cis/health\\n\\nLast 5 Commit Messages:\\n$COMMIT_MESSAGES"

# Construct the JSON data with Traefik deployment info
echo "** Constructing JSON data..."
JSON_DATA="{
  \"commitID\": \"$COMMIT_ID\",
  \"buildTimestamp\": \"$BUILD_TIMESTAMP\",
  \"buildersUsername\": \"$BUILDER_USERNAME\",
  \"branch\": \"$CURRENT_BRANCH\",
  \"repoURL\": \"$REPO_URL\",
  \"last5commitMessages\": \"$COMMIT_MESSAGES\",
  \"releaseName\": \"$RELEASE_NAME\",
  \"deploymentURL\": \"https://iis.memphis.edu/apis/cis/\",
  \"apiDocsURL\": \"https://iis.memphis.edu/apis/cis/api\",
  \"healthCheckURL\": \"https://iis.memphis.edu/apis/cis/health\",
  \"buildInfoURL\": \"https://iis.memphis.edu/apis/cis/build-info\"
}"
echo "  - JSON Data: $JSON_DATA"


# Save the JSON data to the file
echo "** Saving JSON data to file..."
mkdir -p ./build-info
echo "$JSON_DATA" > ./build-info/versionInfo.json

# Make a build info file for the application
echo "** Creating build info for CIS backend..."
echo "export const BUILD_INFO = $JSON_DATA;" > ./build-info/buildInfo.js
echo "  - Build info created"

# Update the sudo docker compose.yml tag
echo "** Updating sudo docker compose.yml tag... to $CURRENT_BRANCH"
sed -i "s/image: cis-backend:main/image: cis-backend:$CURRENT_BRANCH/g" ./docker-compose.yml
echo "  - Updated sudo docker compose.yml tag to $CURRENT_BRANCH"


#get the github token from the environment, if it exists
if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_TOKEN not set, please enter your GitHub token:"
  read GITHUB_TOKEN
  export GITHUB_TOKEN
fi


# Tag the commit with the release name
echo "** Tagging the commit with the release name: $RELEASE_NAME"
git tag -a $RELEASE_NAME -m "Autobuild release for branch: $CURRENT_BRANCH"
git push origin $RELEASE_NAME
echo "  - Tagged the commit with the release name: $RELEASE_NAME"


# Create a release on GitHub
echo "** Creating a release on GitHub, Release Name: $RELEASE_NAME" 
REPO_NAME=$(basename -s .git $(git config --get remote.origin.url))
REPO_OWNER=$(git config --get remote.origin.url | sed 's/.*:\([^/]*\)\/.*/\1/' | sed 's/.*\/\([^/]*\)\/.*/\1/')
curl -sSL -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github.v3+json" -X POST https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases -d "{\"tag_name\": \"$RELEASE_NAME\", \"name\": \"$RELEASE_NAME\", \"body\": \"$RELEASE_BODY\"}"
echo "  - Release created on GitHub"

# Clean up the local docker cache
#ask the user if they want to clean up the local docker cache
echo "Do you want to clean up the local docker cache? (y/n)"
read CLEANUP
if [ "$CLEANUP" == "y" ]; then
  echo "** Cleaning up the local docker cache..."
  sudo docker system prune -a
  echo "  - Local docker cache cleaned up"
fi


# Build and push the image
print_header "Building and Testing Docker Image"
print_status "Building Docker image..."
docker login

# Build the image
sudo docker compose build cis-backend

# Run Docker tests to verify the build
print_status "Running Docker tests to verify the build..."
if [ -f "./docker-test.sh" ]; then
  print_status "Running container tests..."
  # Run tests in non-interactive mode with base path
  export DOCKER_TEST_AUTO=true
  export BASE_URL="http://localhost:3001/apis/cis"  # Test with base path
  ./docker-test.sh
  if [ $? -eq 0 ]; then
    print_status "✅ Docker tests passed successfully"
  else
    print_error "❌ Docker tests failed"
    exit 1
  fi
else
  print_warning "docker-test.sh not found, skipping tests"
fi

# Push the image
print_status "Pushing image to registry..."
sudo docker compose push cis-backend
print_status "✅ Build and push completed for tag: $CURRENT_BRANCH"

print_header "Autobuild Complete - Ready for Traefik Deployment"
print_status "Release: $RELEASE_NAME"
print_status "Branch: $CURRENT_BRANCH"
print_status "Image: cis-backend:$CURRENT_BRANCH"
print_status "Build info saved to: ./build-info/versionInfo.json"
print_status ""
print_status "🌐 Deployment URLs:"
print_status "   Main API: https://iis.memphis.edu/apis/cis/"
print_status "   Documentation: https://iis.memphis.edu/apis/cis/api"
print_status "   Health Check: https://iis.memphis.edu/apis/cis/health"
print_status "   Build Info: https://iis.memphis.edu/apis/cis/build-info"
print_status ""
print_status "📋 Next Steps:"
print_status "   1. Deploy with: docker compose up -d"
print_status "   2. Ensure Traefik network exists: docker network create traefik"
print_status "   3. Verify Traefik can reach the service"