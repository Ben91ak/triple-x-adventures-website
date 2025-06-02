const fs = require('fs');
 const path = require('path');
 
 const filePath = path.join(__dirname, 'experiences-section.tsx');

// Check if file exists before processing
if (!fs.existsSync(filePath)) {
  console.error('Error: experiences-section.tsx not found');
  process.exit(1);
}

try {
 let content = fs.readFileSync(filePath, 'utf8');
 
 // Normalize content (remove any extra closing braces at the end)
 content = content.trimEnd();
 if (content.endsWith('}}}')) {
   content = content.substring(0, content.length - 2);
 } else if (content.endsWith('}}')) {
   content = content.substring(0, content.length - 1);
 }
 
 // Ensure proper closing
 if (!content.endsWith('}')) {
   content += '}';
 }
 
 fs.writeFileSync(filePath, content, 'utf8');
 console.log('File structure fixed!');
} catch (error) {
  console.error('Error processing file:', error.message);
  process.exit(1);
}
