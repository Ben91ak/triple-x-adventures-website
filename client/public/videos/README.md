# Video Assets for Triple X Adventures

## Large Video Files

The large video files in this directory are not tracked in Git due to their size. Instead, they should be:

1. Stored in a cloud storage service (like AWS S3, Google Cloud Storage, or Cloudinary)
2. Served from a CDN for better performance
3. Referenced in the code using their CDN URLs

## For Development

For local development, you can:
1. Download the video files from the shared storage location
2. Place them in this directory
3. The application will use them locally

## For Production

In production:
1. The videos should be served from the CDN
2. Update the video URLs in the code to point to the CDN locations

## Current Videos

The following videos are used in the application:
- `Reels/TXA Reels_1.mp4` through `Reels/TXA Reels_8.mp4`
- `TXA Teaser 2025 Homepage.mp4`
- `TXA Teaser 2025 Homepage.webm`

## Optimized Versions

Optimized versions of the videos are stored in the `optimized` directory.
