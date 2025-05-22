#!/bin/bash

# Vercel Build Script for Triple X Adventures Website
echo "Starting Vercel build process..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application with production settings
echo "Building application..."
npm run vercel-build

# Copy necessary files to the output directory
echo "Copying service worker and other public files..."
cp -r client/public/* dist/

# Ensure permissions are correct
echo "Setting permissions..."
chmod -R 755 dist

echo "Build completed successfully!"
