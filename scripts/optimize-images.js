import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIRS = [
  '../public/images/Snowmobile',
  '../public/images/Huskys'
];

const FORMAT_OPTIONS = {
  webp: { quality: 85 },
  avif: { quality: 80 }
};

// Sizes for responsive images
const SIZES = [
  { width: 1200, suffix: 'large' },
  { width: 800, suffix: 'medium' },
  { width: 400, suffix: 'small' }
];

async function optimizeImage(sourcePath, targetDir) {
  console.log(`Optimizing: ${sourcePath}`);
  
  const fileName = path.basename(sourcePath);
  const fileNameWithoutExt = path.basename(fileName, path.extname(fileName));
  
  // Create optimized directory if it doesn't exist
  const optimizedDir = path.join(targetDir, 'optimized');
  try {
    await fs.mkdir(optimizedDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  
  // Load the image once
  const image = sharp(sourcePath);
  
  // Create multiple sizes in each format
  for (const format of Object.keys(FORMAT_OPTIONS)) {
    for (const { width, suffix } of SIZES) {
      const targetPath = path.join(
        optimizedDir, 
        `${fileNameWithoutExt}-${suffix}.${format}`
      );
      
      // Skip if file already exists
      try {
        await fs.access(targetPath);
        console.log(`Skipping ${targetPath} (already exists)`);
        continue;
      } catch (err) {
        // File doesn't exist, proceed with optimization
      }
      
      try {
        await image
          .clone()
          .resize({ width, withoutEnlargement: true })
          .toFormat(format, FORMAT_OPTIONS[format])
          .toFile(targetPath);
        
        console.log(`Created: ${targetPath}`);
      } catch (err) {
        console.error(`Error creating ${targetPath}:`, err);
      }
    }
  }
  
  // Also create a smaller version of the original format for thumbnail use
  try {
    const originalFormat = path.extname(sourcePath).substring(1);
    const thumbnailPath = path.join(
      optimizedDir,
      `${fileNameWithoutExt}-thumbnail.${originalFormat}`
    );
    
    await image
      .clone()
      .resize({ width: 200, height: 200, fit: 'cover' })
      .toFile(thumbnailPath);
    
    console.log(`Created: ${thumbnailPath}`);
  } catch (err) {
    console.error(`Error creating thumbnail:`, err);
  }
}

async function processDirectory(dir) {
  const fullPath = path.resolve(__dirname, dir);
  console.log(`Processing directory: ${fullPath}`);
  
  try {
    const files = await fs.readdir(fullPath);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext) && !file.includes('optimized');
    });
    
    for (const file of imageFiles) {
      const filePath = path.join(fullPath, file);
      await optimizeImage(filePath, fullPath);
    }
  } catch (err) {
    console.error(`Error processing directory ${dir}:`, err);
  }
}

async function main() {
  console.log('Starting image optimization...');
  
  for (const dir of SOURCE_DIRS) {
    await processDirectory(dir);
  }
  
  console.log('Image optimization complete!');
}

main().catch(err => {
  console.error('Error in main process:', err);
  process.exit(1);
});