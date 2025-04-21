#!/bin/bash

# This script cleans up compiled JS files that shouldn't be in the repo
# It preserves config files and files in dist directories

# Remove compiled JS files that match the .gitignore patterns
echo "Removing compiled JS files from source directories..."

# Clean src directories
find packages/*/src -name "*.js" -o -name "*.js.map" | 
  grep -v ".config.js" |
  xargs rm -f 2>/dev/null || true

# Clean test directories
find packages/*/test -name "*.js" -o -name "*.js.map" |
  grep -v ".config.js" |
  xargs rm -f 2>/dev/null || true

echo "Done!"