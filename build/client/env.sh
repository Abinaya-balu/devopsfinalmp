#!/bin/sh

# Replace environment variables in the built app
echo "Replacing environment variables in JS files..."

# Define JS files where to replace env variables
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i 's|%REACT_APP_SERVER_URL%|'"${REACT_APP_SERVER_URL}"'|g' {} \;
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i 's|%REACT_APP_TITLE%|'"${REACT_APP_TITLE:-Kongu Hall Booking System}"'|g' {} \;
find /usr/share/nginx/html -type f -name "*.js" -exec sed -i 's|%REACT_APP_HOD_FEATURE%|'"${REACT_APP_HOD_FEATURE:-true}"'|g' {} \;

echo "Environment variables replaced successfully"

exit 0 