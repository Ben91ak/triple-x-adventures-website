import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Source and destination paths
const sourceDir = path.join(__dirname, '../client/public/videos/Reels');
const destDir = path.join(__dirname, '../client/public/videos/optimized');
const thumbnailDir = path.join(__dirname, '../client/public/images/video-thumbnails');

// Create destination directories if they don't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (!fs.existsSync(thumbnailDir)) {
  fs.mkdirSync(thumbnailDir, { recursive: true });
}

// Configuration for video optimization
const videoConfig = {
  maxWidth: 720,        // HD resolution width
  maxHeight: 1280,      // For vertical videos
  bitrate: '1M',        // Target bitrate
  format: 'mp4',        // Output format
  preset: 'veryfast',   // FFmpeg encoding preset
  crf: 28               // Constant Rate Factor (lower = better quality, higher = smaller size)
};

// Function to generate a thumbnail from a video
async function generateThumbnail(videoPath, outputPath) {
  return new Promise((resolve, reject) => {
    // Use ffmpeg to extract a frame at 0.5 seconds
    const command = `ffmpeg -y -i "${videoPath}" -ss 00:00:00.5 -vframes 1 -f image2 "${outputPath}.png"`;
    
    exec(command, async (error) => {
      if (error) {
        console.error(`Error generating thumbnail: ${error}`);
        reject(error);
        return;
      }
      
      try {
        // Optimize the thumbnail with sharp
        await sharp(`${outputPath}.png`)
          .resize({ 
            width: 400, 
            height: 400, 
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 80, progressive: true })
          .toFile(`${outputPath}.jpg`);
        
        // Remove the png file after creating jpg
        fs.unlinkSync(`${outputPath}.png`);
        resolve(`${outputPath}.jpg`);
      } catch (err) {
        console.error(`Error optimizing thumbnail: ${err}`);
        reject(err);
      }
    });
  });
}

// Function to optimize a video
function optimizeVideo(videoPath, outputPath) {
  return new Promise((resolve, reject) => {
    // Use ffmpeg with optimized settings for web playback
    const command = `ffmpeg -y -i "${videoPath}" -c:v libx264 -crf ${videoConfig.crf} -preset ${videoConfig.preset} -vf "scale='min(${videoConfig.maxWidth},iw)':'-2'" -c:a aac -b:a 128k -movflags +faststart "${outputPath}"`;
    
    exec(command, (error) => {
      if (error) {
        console.error(`Error optimizing video: ${error}`);
        reject(error);
        return;
      }
      resolve(outputPath);
    });
  });
}

// Process all videos in the source directory
async function processVideos() {
  try {
    // Get all MP4 files in the source directory
    const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.mp4'));
    
    console.log(`Found ${files.length} videos to process`);
    
    // Process each video
    for (const file of files) {
      const videoPath = path.join(sourceDir, file);
      const videoName = path.basename(file, '.mp4');
      const outputVideoPath = path.join(destDir, file);
      const thumbnailPath = path.join(thumbnailDir, videoName);
      
      console.log(`Processing video: ${file}`);
      
      // Generate thumbnail
      console.log(`- Generating thumbnail...`);
      await generateThumbnail(videoPath, thumbnailPath);
      
      // Optimize video
      console.log(`- Optimizing video...`);
      await optimizeVideo(videoPath, outputVideoPath);
      
      console.log(`✓ Completed processing: ${file}`);
    }
    
    console.log('All videos processed successfully');
  } catch (error) {
    console.error('Error processing videos:', error);
  }
}

// Run the processing
processVideos();