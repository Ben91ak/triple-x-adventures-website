#!/bin/bash

# Triple X Adventures - Vercel Deployment Script
echo "===== Triple X Adventures - Vercel Deployment ====="
echo "This script will help you deploy your application to Vercel"

# Check if Vercel CLI is installed
# Use npx to run vercel without global installation
VERCEL_CMD="npx vercel@latest"

# Check if user is logged in
echo "Checking Vercel authentication..."
if ! vercel whoami &>/dev/null; then
    echo "You are not logged in to Vercel. Please log in:"
    if ! vercel login; then
        echo "Login failed. Please try again."
        exit 1
    fi
else
    echo "Already logged in to Vercel as: $(vercel whoami)"
fi

# Build the application
 echo "Building application for production..."
if ! npm run build:prod; then
    echo "Build failed! Please fix the errors and try again."
    exit 1
fi

# Confirm deployment
echo ""
echo "Your application is ready to deploy to Vercel."
echo "Do you want to proceed with deployment? (y/n)"
read -r CONFIRM

if [[ $CONFIRM =~ ^[Yy]$ ]]; then
    echo "Deploying to Vercel..."
    
    # Deploy to Vercel with production flag
    vercel --prod
    
    echo ""
    echo "Deployment complete! Your site is now live on Vercel."
    echo "You can set up a custom domain in the Vercel dashboard."
else
    echo "Deployment cancelled."
fi
