/**
 * Script to generate optimized thumbnails for videos
 * This helps improve loading speed and provides fallbacks
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { execSync } from 'child_process';

// Get the directory name for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure paths
const videoDir = path.join(__dirname, '../public/videos/Reels');
const outputDir = path.join(__dirname, '../public/images/video-thumbnails');

// Make sure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Extract frame from video at the specified time using ffmpeg
async function extractFrame(videoPath, outputPath, timeInSeconds = 0.5) {
  try {
    // Create the ffmpeg command to extract a frame
    const command = `ffmpeg -i "${videoPath}" -ss ${timeInSeconds} -frames:v 1 -q:v 2 "${outputPath}" -y`;
    execSync(command);
    console.log(`✓ Extracted frame from ${path.basename(videoPath)} at ${timeInSeconds}s`);
    return true;
  } catch (error) {
    console.error(`× Error extracting frame from ${path.basename(videoPath)}:`, error.message);
    return false;
  }
}

// Optimize the extracted frame using sharp to reduce file size
async function optimizeImage(inputPath, id) {
  try {
    const jpgOutput = path.join(outputDir, `thumb-${id}.jpg`);
    const webpOutput = path.join(outputDir, `thumb-${id}.webp`);
    
    // Read the image
    const image = sharp(inputPath);
    
    // Generate a JPEG version - good compatibility
    await image
      .clone()
      .resize({ width: 800, height: 1440, fit: 'cover' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(jpgOutput);
    
    // Generate a WebP version - better compression
    await image
      .clone()
      .resize({ width: 800, height: 1440, fit: 'cover' })
      .webp({ quality: 75 })
      .toFile(webpOutput);
    
    console.log(`✓ Optimized thumbnails for video ${id}`);
    
    // Remove the temporary file after optimization
    fs.unlinkSync(inputPath);
    
    return true;
  } catch (error) {
    console.error(`× Error optimizing thumbnails for video ${id}:`, error.message);
    return false;
  }
}

// Process all videos in the Reels directory
async function processVideos() {
  try {
    // Get all MP4 files from the videos directory
    const videoFiles = fs.readdirSync(videoDir)
      .filter(file => file.toLowerCase().endsWith('.mp4'));
    
    console.log(`🎬 Found ${videoFiles.length} videos to process`);
    
    // Process each video file
    let successCount = 0;
    
    for (let i = 0; i < videoFiles.length; i++) {
      const videoFile = videoFiles[i];
      const videoPath = path.join(videoDir, videoFile);
      
      // Extract video ID from filename (e.g., "TXA Reels_1.mp4" -> "1")
      const videoId = videoFile.match(/(\d+)/)?.[0];
      
      if (!videoId) {
        console.warn(`⚠️ Could not extract ID from ${videoFile}, skipping`);
        continue;
      }
      
      // Generate temporary file for the extracted frame
      const tempFramePath = path.join(outputDir, `temp-${videoId}.jpg`);
      
      // Extract a frame from later in the video (more interesting content)
      const extracted = await extractFrame(videoPath, tempFramePath, 1.5);
      
      if (extracted) {
        // Optimize the extracted frame
        const optimized = await optimizeImage(tempFramePath, videoId);
        if (optimized) successCount++;
      }
    }
    
    console.log(`✅ Successfully generated thumbnails for ${successCount} of ${videoFiles.length} videos`);
  } catch (error) {
    console.error('× Error processing videos:', error.message);
  }
}

// Run the processing function
processVideos();