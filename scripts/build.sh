#!/bin/bash

# Clean build script that ensures consistent use of dist directories

# Clean existing build artifacts
echo "Cleaning existing build artifacts..."
find packages -type d -name "dist" -exec rm -rf {} +
mkdir -p packages/*/dist

# Build using TypeScript project references to respect dependency graph
echo "Building all packages using project references..."
npx tsc --build tsconfig.json

# Clean up any JS files that were generated in src dirs
echo "Cleaning any misplaced JS files..."
bash scripts/clean-js-files.sh

echo "Build completed successfully!"