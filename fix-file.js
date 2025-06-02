#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as t from '@babel/types';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const srcFile = path.join(__dirname, 'client/src/components/experiences-section.tsx');
const tmpFile = path.join(__dirname, 'client/src/components/experiences-section-fixed.tsx');

// Read the content
const content = fs.readFileSync(srcFile, 'utf8');

/**
 * Process the file using AST parsing with Babel
 * @param {string} fileContent - The content of the file to process
 * @returns {string} The processed content
 */
async function processWithAST(fileContent) {
  try {
    // Dynamically import Babel packages
    const parser = await import('@babel/parser');
    const traverse = (await import('@babel/traverse')).default;
    const generator = await import('@babel/generator');
    const generate = generator.default || generator;
    
    console.log('Using AST-based parsing with Babel');
    
    // Parse the file into an AST with TypeScript and JSX support
    const ast = parser.default.parse(fileContent, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties', 'decorators-legacy']
    });
    
    // Define sections to collect
    const sections = {
      imports: [],
      interfaces: [],
      types: [],
      constants: [],
      components: [],
      mainComponent: null,
      helpers: []
    };
    
    // Find comments to identify section boundaries
    const comments = [];
    let mainComponentMarkerIndex = -1;
    
    // First pass: collect all comments and find the main component marker
    ast.program.body.forEach((node, index) => {
      // Check for leading comments on nodes
      if (node.leadingComments) {
        node.leadingComments.forEach(comment => {
          comments.push({ index, comment });
          if (comment.type === 'CommentLine' && 
              comment.value.trim().toLowerCase().includes('main component')) {
            mainComponentMarkerIndex = index;
          }
        });
      }
      
      // Also check for standalone comments
      if (node.type === 'ExpressionStatement' && 
          node.expression.type === 'StringLiteral' && 
          node.expression.value.includes('main component')) {
        mainComponentMarkerIndex = index;
      }
      
      // For CommentLine nodes directly
      if (node.type === 'CommentLine' && 
          node.value.trim().toLowerCase().includes('main component')) {
        mainComponentMarkerIndex = index;
      }
    });
    
    // If we couldn't find the main component marker, try another approach
    if (mainComponentMarkerIndex === -1) {
      // Look for export declarations that might be the main component
      ast.program.body.forEach((node, index) => {
        if ((node.type === 'ExportNamedDeclaration' || 
             node.type === 'ExportDefaultDeclaration') && 
            index > ast.program.body.length / 2) { // Assume main component is in the latter half of the file
          mainComponentMarkerIndex = index;
        }
      });
    }
    
    // If we still couldn't find it, return null to fall back to string-based parsing
    if (mainComponentMarkerIndex === -1) {
      console.error('Could not find the main component marker');
      return null;
    }
    
    // Second pass: categorize nodes based on their type and position
    ast.program.body.forEach((node, index) => {
      // Import declarations
      if (node.type === 'ImportDeclaration') {
        sections.imports.push(node);
      }
      // Interface and type declarations
      else if (node.type === 'TSInterfaceDeclaration') {
        sections.interfaces.push(node);
      }
      else if (node.type === 'TSTypeAliasDeclaration') {
        sections.types.push(node);
      }
      // Constants (like iconMap)
      else if (node.type === 'VariableDeclaration' && 
               node.kind === 'const' && 
               index < mainComponentMarkerIndex) {
        sections.constants.push(node);
      }
      // Component declarations before main component
      else if (index < mainComponentMarkerIndex && 
               (node.type === 'FunctionDeclaration' || 
                (node.type === 'VariableDeclaration' && 
                 node.declarations[0].init && 
                 (node.declarations[0].init.type === 'ArrowFunctionExpression' || 
                  node.declarations[0].init.type === 'FunctionExpression' || 
                  (node.declarations[0].init.type === 'CallExpression' && 
                   node.declarations[0].init.callee.property && 
                   node.declarations[0].init.callee.property.name === 'memo'))))) {
        sections.components.push(node);
      }
      // Main component (at or after the marker)
      else if (index >= mainComponentMarkerIndex && !sections.mainComponent && 
               (node.type === 'FunctionDeclaration' || 
                node.type === 'VariableDeclaration' || 
                node.type === 'ExportDefaultDeclaration' || 
                node.type === 'ExportNamedDeclaration')) {
        sections.mainComponent = node;
      }
      // Helper functions and other nodes
      else if (index < mainComponentMarkerIndex) {
        sections.helpers.push(node);
      }
    });
    
    // Create a new AST with the reorganized structure
    const newAst = parser.default.parse('', {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties', 'decorators-legacy']
    });
    
    // Build the new AST body in the desired order
    const newBody = [
      ...sections.imports,
      ...sections.interfaces,
      ...sections.types
    ];
    
    // Add constants with a separator comment
    if (sections.constants.length > 0) {
      const emptyStmt = t.emptyStatement();
      emptyStmt.leadingComments = [{ type: 'CommentLine', value: ' Constants' }];
      newBody.push(emptyStmt);
      newBody.push(...sections.constants);
    }
    
// Add component declarations
if (sections.components.length > 0) {
 const emptyStmt = t.emptyStatement();
 emptyStmt.leadingComments = [{ type: 'CommentLine', value: ' Component declarations' }];
 newBody.push(emptyStmt);
  newBody.push(...sections.components);
}
    
    // Add helper functions
    if (sections.helpers.length > 0) {
      newBody.push({
        type: 'CommentLine',
        value: ' Helper functions'
      });
      newBody.push(...sections.helpers);
    }
    
    // Add main component marker
    newBody.push({
      type: 'CommentLine',
      value: ' Main component'
    });
    
    // Add main component
    if (sections.mainComponent) {
      newBody.push(sections.mainComponent);
    }
    
    // Set the new body
    newAst.program.body = newBody;
    
    // Generate code from the AST
    const output = generate(newAst, {
      retainLines: true,
      comments: true,
      compact: false,
      jsescOption: {
        quotes: 'single'
      },
      sourceMaps: false
    }, fileContent);
    
    return output.code;
  } catch (error) {
    console.error('Error using AST parsing:', error.message);
    return null;
  }
}

/**
 * Process the file using string-based parsing as a fallback
 * @param {string} fileContent - The content of the file to process
 * @returns {string} The processed content
 */
function processWithStringParsing(fileContent) {
  console.log('Using string-based parsing as fallback');
  
  // Find the main component marker
  const mainComponentMatch = fileContent.match(/\/\/\s*Main component/);
  
  if (!mainComponentMatch) {
    console.error('Could not find the main component marker');
    process.exit(1);
  }
  
  // Find the imports section
  const importEndIndex = fileContent.indexOf('\n\n', fileContent.indexOf('import'));
  const importsPart = fileContent.substring(0, importEndIndex !== -1 ? importEndIndex : fileContent.indexOf('\n\n'));
  
  // Find the interfaces and type definitions
  const interfaceStartIndex = importEndIndex;
  const interfaceEndIndex = fileContent.indexOf('// Icon mapping');
  const interfacesPart = fileContent.substring(interfaceStartIndex, interfaceEndIndex);
  
  // Find the icon mapping
  const iconMappingStartIndex = interfaceEndIndex;
  const iconMappingEndIndex = fileContent.indexOf('const ExperienceDetailModal');
  const iconMappingPart = fileContent.substring(iconMappingStartIndex, iconMappingEndIndex);
  
  // Find the ExperienceDetailModal component
  const modalStartIndex = iconMappingEndIndex;
  const modalEndIndex = fileContent.indexOf('// Experience Card component');
  const modalPart = fileContent.substring(modalStartIndex, modalEndIndex);
  
  // Find the ExperienceCard component
  const cardStartIndex = modalEndIndex;
  const cardEndIndex = mainComponentMatch.index;
  const cardPart = fileContent.substring(cardStartIndex, cardEndIndex);
  
  // Get the main component part
  const mainComponentStartIndex = mainComponentMatch.index;
  const mainComponentPart = fileContent.substring(mainComponentStartIndex);
  
  // Create a new file structure where the components are properly organized
  let newContent = importsPart + '\n\n';
  newContent += interfacesPart.trim() + '\n\n';
  newContent += iconMappingPart.trim() + '\n\n';
  newContent += modalPart.trim() + '\n\n';
  newContent += cardPart.trim() + '\n\n';
  newContent += mainComponentPart.trim();
  
  return newContent;
}

// Main execution
(async () => {
  try {
    // Try AST-based parsing first
    const astResult = await processWithAST(content);
    
    // If AST parsing fails, fall back to string-based parsing
    const newContent = astResult || processWithStringParsing(content);
    
    // Write the fixed content to the temp file
    fs.writeFileSync(tmpFile, newContent, 'utf8');
    console.log('Created fixed file at:', tmpFile);
  } catch (error) {
    console.error('Error processing file:', error.message);
    process.exit(1);
  }
})();
