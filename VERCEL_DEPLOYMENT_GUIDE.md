# Triple X Adventures - Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Triple X Adventures website to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Vercel CLI installed (optional, for command-line deployment)

## Deployment Options

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Vercel account
3. Click "Add New" → "Project"
4. Import your Git repository
5. Configure the project with these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`
6. Set up environment variables (see below)
7. Click "Deploy"

### Option 2: Deploy via Command Line

1. Install Vercel CLI: `npm install -g vercel`
2. Log in to Vercel: `vercel login`
3. Run the deployment script: `./deploy-to-vercel.sh`
   - Or simply run: `npm run deploy`

## Environment Variables

Add these environment variables in the Vercel dashboard:

```
# SMTP Configuration for Contact Form
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_SECURE=true_or_false
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=your_from_email

# Google Places API
GOOGLE_PLACE_ID=ChIJS3EmQH1YeEYRX8PdBeA8h_Q

# Vercel Blob Storage (if using media uploads)
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

## Custom Domain Setup

1. Go to your project settings in the Vercel dashboard
2. Navigate to "Domains"
3. Add your custom domain and follow the DNS configuration instructions

## Troubleshooting

- **Build Failures**: Check build logs in the Vercel dashboard
- **Missing Assets**: Ensure all assets are properly referenced with correct paths
- **Environment Variables**: Verify all required variables are set correctly
- **Routing Issues**: Check the `vercel.json` configuration

## Maintenance

- Each push to your main branch will trigger a new deployment
- Preview deployments are created for pull requests
- Monitor performance in the Vercel Analytics dashboard
