import { FlatTranslations, NestedTranslations } from './types';

/**
 * Gets a value from a nested object using a dot notation path
 * Example: getNestedValue({ a: { b: 'c' } }, 'a.b') -> 'c'
 */
export function getNestedValue(
   obj: NestedTranslations,
   path: string
 ): string | undefined {
   const keys = path.split('.');
   let current: any = obj;

   for (const key of keys) {
     if (current === undefined || current === null) return undefined;
     current = (current as Record<string, any>)[key];
   }

  // Handle JSON-serialized arrays from flattenTranslations
  if (typeof current === 'string') {
    // Check if it's a JSON-serialized array
    if (current.startsWith('[') && current.endsWith(']')) {
      try {
        JSON.parse(current); // Validate it's valid JSON
        return current; // Return the JSON string for the caller to parse
      } catch {
        // Not valid JSON, return as regular string
      }
    }
    return current;
  }
  return undefined;
 }

/**
 * Interpolates values into a translation string
 * Example: interpolate('Hello, {{name}}!', { name: 'World' }) -> 'Hello, World!'
 */
export function interpolate(
  text: string,
  params?: Record<string, any>
): string {
  if (!params) return text;

  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return params[key] !== undefined ? String(params[key]) : `{{${key}}}`;
  });
}

/**
 * Flattens a nested translations object into a flat key-value object
 * Example: flattenTranslations({ a: { b: 'c' } }) -> { 'a.b': 'c' }
 */
export function flattenTranslations(obj: NestedTranslations, prefix = ''): FlatTranslations {
  return Object.keys(obj).reduce((acc: FlatTranslations, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    
 if (Array.isArray(obj[key])) {
   // keep array intact – treat the whole array as a JSON string
   acc[prefixedKey] = JSON.stringify(obj[key]);
 } else if (typeof obj[key] === 'object' && obj[key] !== null) {
     const flattened = flattenTranslations(obj[key] as NestedTranslations, prefixedKey);
     Object.assign(acc, flattened);
 } else if (['string','number','boolean'].includes(typeof obj[key])) {
     acc[prefixedKey] = String(obj[key]);
 }
    
    return acc;
  }, {});
}

/**
 * Unflattens a flat key-value object into a nested translations object
 * Example: unflattenTranslations({ 'a.b': 'c' }) -> { a: { b: 'c' } }
 */
export function unflattenTranslations(flatObj: FlatTranslations): NestedTranslations {
  const result: NestedTranslations = {};
  
  Object.keys(flatObj).forEach(key => {
    const keys = key.split('.');
    let current: any = result;
    
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        // Last key, set the value
        current[k] = flatObj[key];
      } else {
        // Not the last key, create nested object if it doesn't exist
        current[k] = current[k] || {};
        current = current[k];
      }
    });
  });
  
  return result;
}

/**
 * Exports translations to CSV format
 */
export function exportTranslationsToCSV(
  translations: Record<string, FlatTranslations>
): string {
  const languages = Object.keys(translations);
  if (!languages.length) return '';
  
  // Get all unique keys across all languages
  const allKeys = new Set<string>();
  languages.forEach(lang => {
    Object.keys(translations[lang]).forEach(key => allKeys.add(key));
  });
  
  const keys = Array.from(allKeys).sort();
  
  // Create CSV header
  let csv = `key,${languages.join(',')}`;
  
  // Add each row
  keys.forEach(key => {
    csv += `\n"${key.replace(/"/g, '""')}"`; // Escape quotes in key
    
    languages.forEach(lang => {
      const value = translations[lang][key] || '';
      csv += `,"${value.replace(/"/g, '""')}"`; // Escape quotes in value
    });
  });
  
  return csv;
}

/**
 * Imports translations from a CSV format
 */
export function importTranslationsFromCSV(
  csv: string
): Record<string, FlatTranslations> {
  // Handle empty input
  if (!csv || !csv.trim()) {
    return {};
  }

  const lines = csv.split('\n');
  
  // Handle empty CSV or just header
  if (lines.length <= 1) {
    return {};
  }
  
  const header = lines[0].split(',');
  
  // First column is the key, the rest are languages
  const languages = header.slice(1).filter(Boolean);
  const result: Record<string, FlatTranslations> = {};
  
  // Initialize result object
  for (const lang of languages) {
    result[lang] = {};
  }
  
  // Parse each line
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i] || !lines[i].trim()) continue;
    
    // Split by comma, but respect quoted values
    const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    
    // Skip if no values or first value (key) is missing
    if (!values.length) continue;
    
    // First value is the key - with additional type safety
    // TypeScript should know values[0] exists because of the check above, but let's be extra safe
    const key = values[0] ? values[0].replace(/^"|"$/g, '').replace(/""/g, '"') : '';
    if (!key) continue; // Skip if key is empty
    
    // The rest are translations for each language
    for (let j = 0; j < languages.length; j++) {
      const lang = languages[j];
      
      // Skip if language is undefined or not in result
      if (!lang || !result[lang]) continue;
      
      // Handle the value with null check
      let value = '';
      if (values[j + 1]) {
        value = values[j + 1].replace(/^"|"$/g, '').replace(/""/g, '"');
      }
      
      // Now we can safely assign the value
      result[lang][key] = value;
    }
  }
  
  return result;
}

/**
 * Validates translations across languages
 * Returns an object with missing keys for each language
 */
export function validateTranslations(
  translations: Record<string, FlatTranslations>
): Record<string, string[]> {
  const languages = Object.keys(translations);
  if (languages.length <= 1) return {};
  
  // Get all unique keys across all languages
  const allKeys = new Set<string>();
  languages.forEach(lang => {
    Object.keys(translations[lang]).forEach(key => allKeys.add(key));
  });
  
  // Check each language for missing keys
  const missingKeys: Record<string, string[]> = {};
  
  languages.forEach(lang => {
    const langKeys = Object.keys(translations[lang]);
    const missing = Array.from(allKeys).filter(key => !langKeys.includes(key));
    
    if (missing.length > 0) {
      missingKeys[lang] = missing;
    }
  });
  
  return missingKeys;
}
