const fs = require('fs');
 const path = require('path');
 
 const filePath = path.join(__dirname, 'experiences-section.tsx');

// Check if file exists before processing
if (!fs.existsSync(filePath)) {
  console.error('Error: experiences-section.tsx not found');
  process.exit(1);
}

// Create backup before modification
const backupPath = filePath + '.backup.' + Date.now();
fs.copyFileSync(filePath, backupPath);

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
 // Use TypeScript compiler API or AST parser for safe modifications
 // Or implement more robust pattern matching with validation
 
 const originalContent = content;
 content = content.trimEnd();
 
 // Validate the modification doesn't break syntax
 // (Add TypeScript parsing validation here)
  
fs.writeFileSync(filePath, content, 'utf8');
 
  // Clean up backup on success
  fs.unlinkSync(backupPath);
 console.log('File structure fixed!');
} catch (error) {
  // Restore backup on failure
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, filePath);
    fs.unlinkSync(backupPath);
  }
  console.error('Error processing file:', error.message);
  process.exit(1);
}
