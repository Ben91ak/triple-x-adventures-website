import { FlatTranslations, NestedTranslations } from './types';

/**
 * Flattens a nested translations object into a flat object with dot notation keys
 * Example: { a: { b: 'c' } } -> { 'a.b': 'c' }
 */
export function flattenTranslations(
  obj: NestedTranslations,
  prefix: string = '',
  result: FlatTranslations = {}
): FlatTranslations {
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      result[newKey] = value;
    } else if (value !== null && typeof value === 'object') {
      flattenTranslations(value as NestedTranslations, newKey, result);
    }
  }

  return result;
}

/**
 * Unflattens a flat translations object with dot notation keys into a nested object
 * Example: { 'a.b': 'c' } -> { a: { b: 'c' } }
 */
export function unflattenTranslations(
  flatObj: FlatTranslations
): NestedTranslations {
  const result: NestedTranslations = {};

  for (const key in flatObj) {
    const value = flatObj[key];
    const keys = key.split('.');
    let current: any = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        // Last key, set the value
        current[k] = value;
      } else {
        // Not the last key, create nested object if it doesn't exist
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }

  return result;
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
    current = current[key];
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Validates that all keys in the reference object exist in the target object
 * Useful for ensuring all translations exist in all languages
 */
export function validateTranslations(
  reference: FlatTranslations,
  target: FlatTranslations
): { missingKeys: string[]; extraKeys: string[] } {
  const referenceKeys = Object.keys(reference);
  const targetKeys = Object.keys(target);

  const missingKeys = referenceKeys.filter(key => !targetKeys.includes(key));
  const extraKeys = targetKeys.filter(key => !referenceKeys.includes(key));

  return { missingKeys, extraKeys };
}

/**
 * Exports translations to a CSV format for easy editing
 */
export function exportTranslationsToCSV(
  translations: Record<string, FlatTranslations>
): string {
  const languages = Object.keys(translations);
  const allKeys = new Set<string>();

  // Collect all keys from all languages
  for (const lang of languages) {
    Object.keys(translations[lang]).forEach(key => allKeys.add(key));
  }

  // Sort keys for better readability
  const sortedKeys = Array.from(allKeys).sort();

  // Create CSV header
  let csv = `Key,${languages.join(',')}\n`;

  // Add rows for each key
  for (const key of sortedKeys) {
    const values = languages.map(lang => {
      const value = translations[lang][key] || '';
      // Escape quotes and commas for CSV format
      return `"${value.replace(/"/g, '""')}"`;
    });
    csv += `"${key}",${values.join(',')}\n`;
  }

  return csv;
}

/**
 * Imports translations from a CSV format
 */
export function importTranslationsFromCSV(
  csv: string
): Record<string, FlatTranslations> {
  const lines = csv.split('\n');
  const header = lines[0].split(',');
  
  // First column is the key, the rest are languages
  const languages = header.slice(1);
  const result: Record<string, FlatTranslations> = {};
  
  // Initialize result object
  for (const lang of languages) {
    result[lang] = {};
  }
  
  // Parse each line
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // Split by comma, but respect quoted values
    const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    
    // First value is the key
    const key = values[0].replace(/^"|"$/g, '').replace(/""/g, '"');
    
    // The rest are translations for each language
    for (let j = 0; j < languages.length; j++) {
      const lang = languages[j];
      const value = values[j + 1]?.replace(/^"|"$/g, '').replace(/""/g, '"') || '';
      result[lang][key] = value;
    }
  }
  
  return result;
}
