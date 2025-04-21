#!/bin/bash

# Clean build script that ensures consistent use of dist directories

# Clean existing build artifacts
echo "Cleaning existing build artifacts..."
find packages -type d -name "dist" -exec rm -rf {} +
mkdir -p packages/*/dist

# Use a sequential build approach to ensure dependencies are built first
echo "Building packages in dependency order..."
for pkg in core data api-contract agent-runtime test-kit orchestrator gateway; do
  echo "Building @aquila/$pkg..."
  (cd packages/$pkg && ../../node_modules/.bin/tsc --outDir dist)
done

# Clean up any JS files that were generated in src dirs
echo "Cleaning any misplaced JS files..."
bash scripts/clean-js-files.sh

echo "Build completed successfully!"