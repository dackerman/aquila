#!/bin/bash

# Simple health check script for the Aquila gateway server
# Usage: ./health-check.sh [host] [port]
# Default: http://localhost:3000/health

# Parse command line arguments
HOST=${1:-localhost}
PORT=${2:-3000}
URL="http://${HOST}:${PORT}/health"

echo "Checking health of server at ${URL}..."

# Make the HTTP request using curl
RESPONSE=$(curl -s -w "\n%{http_code}" ${URL})
HTTP_BODY=$(echo "${RESPONSE}" | sed '$ d')
HTTP_STATUS=$(echo "${RESPONSE}" | tail -n 1)

if [ "${HTTP_STATUS}" -ne 200 ]; then
  echo "❌ Error: HTTP status code ${HTTP_STATUS}"
  exit 1
fi

# Check if response contains "status": "ok"
if echo "${HTTP_BODY}" | grep -q '"status":"ok"' || echo "${HTTP_BODY}" | grep -q '"status": "ok"'; then
  echo -e "\n${HTTP_BODY}\n"
  echo "✅ Server is healthy!"
  
  # Check if database is connected
  if echo "${HTTP_BODY}" | grep -q '"database":"connected"' || echo "${HTTP_BODY}" | grep -q '"database": "connected"'; then
    echo "✅ Database is connected!"
  fi
  
  exit 0
else
  echo -e "\n${HTTP_BODY}\n"
  echo "❌ Server is reporting an error status!"
  exit 1
fi