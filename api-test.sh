#!/bin/bash

# Comprehensive API Test Suite for Docker Container
# Tests all major API endpoints with sample data

set -e

# Configuration
BASE_PATH="/apis/cis"
BASE_URL=${BASE_URL:-"http://localhost:3001${BASE_PATH}"}
TEST_RESULTS_FILE="api-test-results.txt"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_test() {
    echo -e "${YELLOW}[TEST]${NC} $1"
}

print_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    PASSED_TESTS=$((PASSED_TESTS + 1))
}

print_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    FAILED_TESTS=$((FAILED_TESTS + 1))
}

# Function to test an endpoint
test_endpoint() {
    local name="$1"
    local url="$2"
    local expected_status="${3:-200}"
    local description="$4"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    print_test "$name: $description"
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    
    if [ "$response" -eq "$expected_status" ]; then
        print_pass "$name (HTTP $response)"
        echo "PASS: $name - $description (HTTP $response)" >> $TEST_RESULTS_FILE
    else
        print_fail "$name (Expected $expected_status, got $response)"
        echo "FAIL: $name - $description (Expected $expected_status, got $response)" >> $TEST_RESULTS_FILE
    fi
}

# Function to test POST endpoint
test_post_endpoint() {
    local name="$1"
    local url="$2"
    local data="$3"
    local expected_status="${4:-200}"
    local description="$5"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    print_test "$name: $description"
    
    response=$(curl -s -o /dev/null -w "%{http_code}" \
        -X POST \
        -H "Content-Type: application/json" \
        -d "$data" \
        "$url" 2>/dev/null)
    
    if [ "$response" -eq "$expected_status" ]; then
        print_pass "$name (HTTP $response)"
        echo "PASS: $name - $description (HTTP $response)" >> $TEST_RESULTS_FILE
    else
        print_fail "$name (Expected $expected_status, got $response)"
        echo "FAIL: $name - $description (Expected $expected_status, got $response)" >> $TEST_RESULTS_FILE
    fi
}

# Initialize test results file
echo "API Test Results - $(date)" > $TEST_RESULTS_FILE
echo "=================================" >> $TEST_RESULTS_FILE

print_header "CIS API Test Suite with Traefik Base Path"
echo "Testing against: $BASE_URL"
echo "Base path: $BASE_PATH"
echo "Results will be saved to: $TEST_RESULTS_FILE"
echo

# Test 1: Basic Health and Documentation
print_header "Basic Health and Documentation Tests"

test_endpoint "Health" "$BASE_URL/health" 200 "Health endpoint with base path"
test_endpoint "Swagger-HTML" "$BASE_URL/api" 200 "Swagger documentation page"
test_endpoint "Swagger-JSON" "$BASE_URL/api-json" 200 "Swagger JSON specification"
test_endpoint "Build-Info" "$BASE_URL/build-info" 200 "Build information endpoint"

# Test 2: Census API Endpoints
print_header "Census API Tests"

test_endpoint "Census-Breakdown" "$BASE_URL/census/breakdown" 200 "Census population breakdown (all areas)"
test_endpoint "Census-Breakdown-Tract" "$BASE_URL/census/breakdown?tract=47157001100" 200 "Census breakdown for specific tract"
test_endpoint "Census-Breakdown-Zip" "$BASE_URL/census/breakdown?zipCode=38103" 200 "Census breakdown for specific zip code"
test_endpoint "Census-Total" "$BASE_URL/census/total" 200 "Total population data"
test_endpoint "Census-Under18" "$BASE_URL/census/under18" 200 "Under 18 population data"
test_endpoint "Census-Under5" "$BASE_URL/census/under5" 200 "Under 5 population data"
test_endpoint "Census-Age5to9" "$BASE_URL/census/age5to9" 200 "Age 5-9 population data"
test_endpoint "Census-Age10to14" "$BASE_URL/census/age10to14" 200 "Age 10-14 population data"
test_endpoint "Census-Age15to17" "$BASE_URL/census/age15to17" 200 "Age 15-17 population data"

# Test 3: Landmarks API Endpoints
print_header "Landmarks API Tests"

test_endpoint "Landmarks-Summary" "$BASE_URL/landmarks/summary?zipCode=38103" 200 "Landmarks summary for zip code"
test_endpoint "Landmarks-Parks" "$BASE_URL/landmarks/parks" 200 "All parks data"
test_endpoint "Landmarks-Parks-Zip" "$BASE_URL/landmarks/parks?zipCode=38103" 200 "Parks for specific zip code"
test_endpoint "Landmarks-Libraries" "$BASE_URL/landmarks/libraries" 200 "All libraries data"
test_endpoint "Landmarks-Community" "$BASE_URL/landmarks/community" 200 "Community centers data"
test_endpoint "Landmarks-ChildCare-Family" "$BASE_URL/landmarks/cc_family" 200 "Family child care data"
test_endpoint "Landmarks-ChildCare-Center" "$BASE_URL/landmarks/cc_center" 200 "Child care centers data"
test_endpoint "Landmarks-Crime-Assault" "$BASE_URL/landmarks/cr_assault" 200 "Assault crime data"
test_endpoint "Landmarks-Crime-Burglary" "$BASE_URL/landmarks/cr_burgrob" 200 "Burglary/robbery crime data"
test_endpoint "Landmarks-Crime-Drug" "$BASE_URL/landmarks/cr_drug" 200 "Drug crime data"
test_endpoint "Landmarks-Crime-Theft" "$BASE_URL/landmarks/cr_theft" 200 "Theft crime data"
test_endpoint "Landmarks-Crime-Traffic" "$BASE_URL/landmarks/cr_trafficother" 200 "Traffic crime data"
test_endpoint "Landmarks-Crime-Weapon" "$BASE_URL/landmarks/cr_weapon" 200 "Weapon crime data"
test_endpoint "Landmarks-Lead-0" "$BASE_URL/landmarks/lead_data0" 200 "Lead data level 0"
test_endpoint "Landmarks-Lead-1" "$BASE_URL/landmarks/lead_data1" 200 "Lead data level 1"
test_endpoint "Landmarks-COVID-Vacc" "$BASE_URL/landmarks/covid_vacc" 200 "COVID vaccination data"
test_endpoint "Landmarks-COVID-Case" "$BASE_URL/landmarks/covid_case" 200 "COVID case data"

# Test 4: Schools API Endpoints
print_header "Schools API Tests"

test_endpoint "Schools-Breakdown" "$BASE_URL/schools/breakdown?schoolID=1" 200 "School breakdown for ID 1"
test_endpoint "Schools-Breakdown-Alt" "$BASE_URL/schools/breakdown?schoolID=100" 200 "School breakdown for ID 100"

# Test 5: Mem-DataHub API Endpoints
print_header "Mem-DataHub API Tests"

test_endpoint "MemHub-Test" "$BASE_URL/mem-datahub/test" 200 "DataHub test endpoint"
test_endpoint "MemHub-Parks" "$BASE_URL/mem-datahub/Parks" 200 "DataHub parks data"
test_endpoint "MemHub-Libraries" "$BASE_URL/mem-datahub/Libraries" 200 "DataHub libraries data"
test_endpoint "MemHub-ZipCodes" "$BASE_URL/mem-datahub/zipCodes" 200 "DataHub zip codes"
test_endpoint "MemHub-ZipCodes-Count" "$BASE_URL/mem-datahub/zipCodes?getCount=true" 200 "DataHub zip codes count"
test_endpoint "MemHub-Tracts" "$BASE_URL/mem-datahub/tracts" 200 "DataHub census tracts"
test_endpoint "MemHub-Tracts-Count" "$BASE_URL/mem-datahub/tracts?getCount=true" 200 "DataHub tracts count"
test_endpoint "MemHub-ZipGeometry" "$BASE_URL/mem-datahub/page/zipGeometry" 200 "DataHub zip geometry pagination"
test_endpoint "MemHub-TractGeometry" "$BASE_URL/mem-datahub/page/tractGeometry" 200 "DataHub tract geometry pagination"
test_endpoint "MemHub-TractGeometry-Specific" "$BASE_URL/mem-datahub/tractGeometry?tract=47157001100" 200 "Specific tract geometry"

# Test 6: Export API Endpoints (POST requests)
print_header "Export API Tests"

zip_export_data='{
  "zipCode": "38103",
  "zipCodeSummary": "Test zip code",
  "populationData": {
    "totalPopulation": 1000,
    "under18Population": 250
  }
}'

tract_export_data='{
  "tract": "47157001100",
  "tractSummary": "Test tract",
  "populationData": {
    "totalPopulation": 1500,
    "under18Population": 375
  }
}'

school_export_data='{
  "schoolName": "Test School",
  "schoolID": 1,
  "totalEnrollment": 500,
  "studentGradeBreakdown": {
    "kindergarten": 50,
    "grade1": 55
  }
}'

test_post_endpoint "Export-Zip" "$BASE_URL/export/zip" "$zip_export_data" 200 "Zip code export"
test_post_endpoint "Export-Tract" "$BASE_URL/export/tract" "$tract_export_data" 200 "Tract export"
test_post_endpoint "Export-School" "$BASE_URL/export/school" "$school_export_data" 200 "School export"

# Test 7: Error Handling
print_header "Error Handling Tests"

test_endpoint "NotFound" "$BASE_URL/nonexistent" 404 "Non-existent endpoint should return 404"
test_endpoint "Invalid-School-ID" "$BASE_URL/schools/breakdown?schoolID=invalid" 400 "Invalid school ID should return 400"

# Summary
print_header "Test Summary"
echo "Total Tests: $TOTAL_TESTS"
echo "Passed: $PASSED_TESTS"
echo "Failed: $FAILED_TESTS"
echo "Success Rate: $(( PASSED_TESTS * 100 / TOTAL_TESTS ))%"

echo "" >> $TEST_RESULTS_FILE
echo "=================================" >> $TEST_RESULTS_FILE
echo "SUMMARY:" >> $TEST_RESULTS_FILE
echo "Total Tests: $TOTAL_TESTS" >> $TEST_RESULTS_FILE
echo "Passed: $PASSED_TESTS" >> $TEST_RESULTS_FILE
echo "Failed: $FAILED_TESTS" >> $TEST_RESULTS_FILE
echo "Success Rate: $(( PASSED_TESTS * 100 / TOTAL_TESTS ))%" >> $TEST_RESULTS_FILE

echo
echo "Detailed results saved to: $TEST_RESULTS_FILE"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Check the results above.${NC}"
    exit 1
fi
