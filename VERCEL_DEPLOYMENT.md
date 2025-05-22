# Deploying Triple X Adventures to Vercel

This guide provides step-by-step instructions for deploying the Triple X Adventures website to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository with your project code
- Node.js installed locally for testing

## Deployment Steps

### 1. Connect Your Repository

1. Log in to your Vercel account
2. Click "Add New" → "Project"
3. Import your Git repository
4. Select the Triple X Adventures project

### 2. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`

#### Environment Variables

Add the following environment variables in the Vercel dashboard (Settings → Environment Variables):

- `SMTP_HOST`: Your SMTP server host
- `SMTP_PORT`: Your SMTP server port
- `SMTP_SECURE`: Whether to use secure connection (true/false)
- `SMTP_USER`: Your SMTP username
- `SMTP_PASSWORD`: Your SMTP password
- `SMTP_FROM`: Email address to send from
- `GOOGLE_PLACE_ID`: Google Place ID for maps integration
- `NODE_ENV`: Set to `production`

If using Vercel Blob Storage for media uploads:
- `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob token

### 3. Deploy

1. Click "Deploy" to start the deployment process
2. Vercel will build and deploy your application
3. Once complete, you'll receive a deployment URL

### 4. Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Follow the instructions to configure DNS settings

## Troubleshooting

- **Build Failures**: Check the build logs for errors
- **Missing Assets**: Ensure all assets are properly referenced in your code
- **Environment Variables**: Verify all required environment variables are set
- **API Routes**: Make sure API routes are properly configured in `vercel.json`

## Maintenance

- Each push to your main branch will trigger a new deployment
- You can set up preview deployments for pull requests
- Monitor performance in the Vercel Analytics dashboard

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
