import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only process Husky images folder
const SOURCE_DIR = '../public/images/Huskys';

async function optimizeImage(sourcePath) {
  console.log(`Optimizing: ${sourcePath}`);
  
  const fileName = path.basename(sourcePath);
  const fileNameWithoutExt = path.basename(fileName, path.extname(fileName));
  const targetDir = path.dirname(sourcePath);
  
  // Create optimized directory if it doesn't exist
  const optimizedDir = path.join(targetDir, 'optimized');
  try {
    await fs.mkdir(optimizedDir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  
  // Load the image once
  const image = sharp(sourcePath);
  
  // Only create WebP versions
  const sizes = [
    { width: 800, suffix: 'medium' },
    { width: 400, suffix: 'small' }
  ];
  
  for (const { width, suffix } of sizes) {
    const targetPath = path.join(
      optimizedDir, 
      `${fileNameWithoutExt}-${suffix}.webp`
    );
    
    try {
      await image
        .clone()
        .resize({ width, withoutEnlargement: true })
        .toFormat('webp', { quality: 85 })
        .toFile(targetPath);
      
      console.log(`Created: ${targetPath}`);
    } catch (err) {
      console.error(`Error creating ${targetPath}:`, err);
    }
  }
}

async function processDirectory() {
  const fullPath = path.resolve(__dirname, SOURCE_DIR);
  console.log(`Processing directory: ${fullPath}`);
  
  try {
    const files = await fs.readdir(fullPath);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext) && !file.includes('optimized');
    });
    
    for (const file of imageFiles) {
      const filePath = path.join(fullPath, file);
      await optimizeImage(filePath);
    }
  } catch (err) {
    console.error(`Error processing directory:`, err);
  }
}

async function main() {
  console.log('Starting image optimization for Husky images...');
  await processDirectory();
  console.log('Image optimization complete!');
}

main().catch(err => {
  console.error('Error in main process:', err);
  process.exit(1);
});