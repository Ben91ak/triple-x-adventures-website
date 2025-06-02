#!/bin/bash

# Exit on any error
set -e

# Function to handle errors
handle_error() {
  echo "Error occurred in script at line $1"
  exit 1
}
trap 'handle_error $LINENO' ERR

 # Vercel Build Script for Triple X Adventures Website
 echo "Starting Vercel build process..."

# Validate prerequisites
if [ ! -f "package.json" ]; then
  echo "Error: package.json not found"
  exit 1
fi

 # Install dependencies
 echo "Installing dependencies..."
 npm ci

if [ $? -ne 0 ]; then
  echo "Error: Failed to install dependencies"
  exit 1
fi

 # Build the application with production settings
 echo "Building application..."
 npm run vercel-build

if [ $? -ne 0 ]; then
  echo "Error: Build failed"
  exit 1
fi

 # Copy necessary files to the output directory
 echo "Copying service worker and other public files..."
if [ -d "client/public" ]; then
  cp -r client/public/* dist/ 2>/dev/null || echo "Warning: No files to copy from client/public"
else
  echo "Warning: client/public directory not found"
fi

 # Ensure permissions are correct
 echo "Setting permissions..."
if [ -d "dist" ]; then
  chmod -R 755 dist
else
  echo "Error: dist directory not found"
  exit 1
fi

 echo "Build completed successfully!"
