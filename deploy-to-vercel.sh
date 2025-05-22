#!/bin/bash

# Triple X Adventures - Vercel Deployment Script
echo "===== Triple X Adventures - Vercel Deployment ====="
echo "This script will help you deploy your application to Vercel"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
echo "Checking Vercel authentication..."
VERCEL_USER=$(vercel whoami 2>/dev/null)
if [ $? -ne 0 ]; then
    echo "You are not logged in to Vercel. Please log in:"
    vercel login
fi

# Build the application
echo "Building application for production..."
npm run build:prod

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
