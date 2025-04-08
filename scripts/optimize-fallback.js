import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optimize the fallback image for LCP improvements
async function main() {
  try {
    const inputPath = path.join(__dirname, '../public/images/TXA_fallback.jpg');
    const outputPath = path.join(__dirname, '../public/images/TXA_fallback_optimized.jpg');
    const webpPath = path.join(__dirname, '../public/images/TXA_fallback.webp');
    const avifPath = path.join(__dirname, '../public/images/TXA_fallback.avif');
    
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.error(`Input file not found: ${inputPath}`);
      return;
    }
    
    console.log(`Optimizing fallback image: ${inputPath}`);
    
    // Create a JPEG optimized version
    await sharp(inputPath)
      .resize(1280) // Resize to reasonable width for hero
      .jpeg({ quality: 85, progressive: true })
      .toFile(outputPath);
    
    console.log(`Created optimized JPEG: ${outputPath}`);
    
    // Create a WebP version
    await sharp(inputPath)
      .resize(1280)
      .webp({ quality: 80 })
      .toFile(webpPath);
    
    console.log(`Created WebP version: ${webpPath}`);
    
    // Create an AVIF version
    await sharp(inputPath)
      .resize(1280)
      .avif({ quality: 70 })
      .toFile(avifPath);
    
    console.log(`Created AVIF version: ${avifPath}`);
    
    console.log('All optimizations complete');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

main();