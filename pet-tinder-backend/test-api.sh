#!/bin/bash

echo "🧪 Testing Pet Tinder API endpoints..."
echo "======================================"

BASE_URL="http://localhost:5001/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: Health check (server running)
echo -e "\n${BLUE}1. Testing server health...${NC}"
if curl -s $BASE_URL > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Server is running on port 5001${NC}"
else
    echo -e "${RED}❌ Server is not responding${NC}"
    exit 1
fi

# Test 2: User Signup
echo -e "\n${BLUE}2. Testing user signup...${NC}"
SIGNUP_RESPONSE=$(curl -s -X POST $BASE_URL/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}' \
  -c cookies.txt \
  -w "%{http_code}")

if [[ $SIGNUP_RESPONSE == *"201"* ]]; then
    echo -e "${GREEN}✅ Signup successful${NC}"
else
    echo -e "${YELLOW}⚠️  Signup response: $SIGNUP_RESPONSE${NC}"
fi

# Test 3: User Login
echo -e "\n${BLUE}3. Testing user login...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}' \
  -c cookies.txt \
  -w "%{http_code}")

if [[ $LOGIN_RESPONSE == *"200"* ]]; then
    echo -e "${GREEN}✅ Login successful${NC}"
else
    echo -e "${RED}❌ Login failed: $LOGIN_RESPONSE${NC}"
fi

# Test 4: Get current user
echo -e "\n${BLUE}4. Testing get current user...${NC}"
ME_RESPONSE=$(curl -s -X GET $BASE_URL/auth/me \
  -b cookies.txt \
  -w "%{http_code}")

if [[ $ME_RESPONSE == *"200"* ]]; then
    echo -e "${GREEN}✅ Get user info successful${NC}"
else
    echo -e "${RED}❌ Get user info failed: $ME_RESPONSE${NC}"
fi

# Test 5: Get pets (should be empty initially)
echo -e "\n${BLUE}5. Testing get pets...${NC}"
PETS_RESPONSE=$(curl -s -X GET $BASE_URL/pets \
  -b cookies.txt \
  -w "%{http_code}")

if [[ $PETS_RESPONSE == *"200"* ]]; then
    echo -e "${GREEN}✅ Get pets successful${NC}"
else
    echo -e "${RED}❌ Get pets failed: $PETS_RESPONSE${NC}"
fi

# Test 6: Test CORS
echo -e "\n${BLUE}6. Testing CORS headers...${NC}"
CORS_RESPONSE=$(curl -s -X OPTIONS $BASE_URL/auth/signup \
  -H "Origin: http://localhost:3001" \
  -H "Access-Control-Request-Method: POST" \
  -I)

if [[ $CORS_RESPONSE == *"Access-Control-Allow-Origin"* ]]; then
    echo -e "${GREEN}✅ CORS configured correctly${NC}"
else
    echo -e "${RED}❌ CORS not configured properly${NC}"
fi

# Cleanup
rm -f cookies.txt

echo -e "\n${BLUE}API Testing Complete!${NC}"
echo "======================================"
