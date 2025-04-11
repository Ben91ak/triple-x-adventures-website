import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    // Ensure directories exist
    await fs.mkdir('public/icons', { recursive: true });
    await fs.mkdir('public/screenshots', { recursive: true });
    
    // Generate icons
    const logoPath = path.join('attached_assets', '170804_Logo-TripleX_final.png');
    
    // Regular icons
    await sharp(logoPath)
      .resize(192, 192, { fit: 'contain', background: { r: 26, g: 29, b: 31, alpha: 1 } })
      .toFile('public/icons/icon-192x192.png');
    
    await sharp(logoPath)
      .resize(512, 512, { fit: 'contain', background: { r: 26, g: 29, b: 31, alpha: 1 } })
      .toFile('public/icons/icon-512x512.png');
    
    // Maskable icons (with padding for safe zone)
    await sharp(logoPath)
      .resize(144, 144) // Smaller to allow for padding
      .extend({
        top: 24,
        bottom: 24,
        left: 24,
        right: 24,
        background: { r: 26, g: 29, b: 31, alpha: 1 }
      })
      .toFile('public/icons/maskable-icon-192x192.png');
    
    await sharp(logoPath)
      .resize(400, 400) // Smaller to allow for padding
      .extend({
        top: 56,
        bottom: 56,
        left: 56,
        right: 56,
        background: { r: 26, g: 29, b: 31, alpha: 1 }
      })
      .toFile('public/icons/maskable-icon-512x512.png');
    
    // Generate screenshots
    // Using existing images for screenshots
    const screenshots = [
      { source: 'attached_assets/Screenshot 2025-04-11 at 14.43.05.png', output: 'public/screenshots/desktop.jpg', width: 1280, height: 800 },
      { source: 'attached_assets/LBR51689.jpg', output: 'public/screenshots/mobile.jpg', width: 390, height: 844 }
    ];
    
    for (const screenshot of screenshots) {
      await sharp(screenshot.source)
        .resize(screenshot.width, screenshot.height, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(screenshot.output);
    }
    
    console.log('PWA assets generated successfully!');
  } catch (error) {
    console.error('Error generating PWA assets:', error);
  }
}

main();
