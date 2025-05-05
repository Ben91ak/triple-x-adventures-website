import React, { useState, useEffect } from 'react';
import { translations } from '@/translations';
import { Language } from '@/contexts/LanguageContext';
import { 
  flattenTranslations, 
  unflattenTranslations, 
  exportTranslationsToCSV, 
  importTranslationsFromCSV,
  validateTranslations
} from '@/translations/utils';
import { FlatTranslations } from '@/translations/types';

/**
 * Translation Manager Component
 * 
 * This component provides a UI for managing translations:
 * - View all translations in a table format
 * - Edit translations directly
 * - Export translations to CSV
 * - Import translations from CSV
 * - Validate translations across languages
 */
export function TranslationManager() {
  // State for flattened translations
  const [flatTranslations, setFlatTranslations] = useState<Record<Language, FlatTranslations>>({
    en: {},
    de: {},
    sv: {}
  });
  
  // State for filtered keys
  const [filteredKeys, setFilteredKeys] = useState<string[]>([]);
  
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for selected section
  const [selectedSection, setSelectedSection] = useState('');
  
  // State for validation results
  const [validationResults, setValidationResults] = useState<{
    missingKeys: Record<Language, string[]>;
    extraKeys: Record<Language, string[]>;
  }>({
    missingKeys: { en: [], de: [], sv: [] },
    extraKeys: { en: [], de: [], sv: [] }
  });
  
  // Initialize flattened translations
  useEffect(() => {
    const flat: Record<Language, FlatTranslations> = {
      en: flattenTranslations(translations.en),
      de: flattenTranslations(translations.de),
      sv: flattenTranslations(translations.sv)
    };
    
    setFlatTranslations(flat);
    
    // Get all unique keys
    const allKeys = new Set<string>();
    Object.values(flat).forEach(langTranslations => {
      Object.keys(langTranslations).forEach(key => allKeys.add(key));
    });
    
    setFilteredKeys(Array.from(allKeys).sort());
  }, []);
  
  // Filter keys when search term or selected section changes
  useEffect(() => {
    const allKeys = new Set<string>();
    
    Object.values(flatTranslations).forEach(langTranslations => {
      Object.keys(langTranslations).forEach(key => allKeys.add(key));
    });
    
    let filtered = Array.from(allKeys);
    
    // Filter by section
    if (selectedSection) {
      filtered = filtered.filter(key => key.startsWith(selectedSection));
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(key => {
        // Check if key contains search term
        if (key.toLowerCase().includes(lowerSearchTerm)) return true;
        
        // Check if any translation contains search term
        return Object.values(flatTranslations).some(langTranslations => {
          const translation = langTranslations[key];
          return translation && translation.toLowerCase().includes(lowerSearchTerm);
        });
      });
    }
    
    setFilteredKeys(filtered.sort());
  }, [searchTerm, selectedSection, flatTranslations]);
  
  // Get unique top-level sections
  const sections = Array.from(
    new Set(
      Object.keys(flatTranslations.en).map(key => key.split('.')[0])
    )
  ).sort();
  
  // Handle translation change
  const handleTranslationChange = (key: string, language: Language, value: string) => {
    setFlatTranslations(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        [key]: value
      }
    }));
  };
  
  // Save translations
  const saveTranslations = () => {
    // This is a placeholder - in a real app, you would save to a database or file
    const nestedTranslations = {
      en: unflattenTranslations(flatTranslations.en),
      de: unflattenTranslations(flatTranslations.de),
      sv: unflattenTranslations(flatTranslations.sv)
    };
    
    console.log('Saving translations:', nestedTranslations);
    alert('Translations saved! (This is a placeholder - in a real app, you would save to a database or file)');
    
    // In a real app, you would update your translations here
    // For example, by making an API call to save them
  };
  
  // Export translations to CSV
  const handleExport = () => {
    const csv = exportTranslationsToCSV(flatTranslations);
    
    // Create a download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'translations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Import translations from CSV
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      if (!csv) return;
      
      try {
        const imported = importTranslationsFromCSV(csv);
        setFlatTranslations(imported as Record<Language, FlatTranslations>);
        alert('Translations imported successfully!');
      } catch (error) {
        console.error('Error importing translations:', error);
        alert('Error importing translations. Please check the CSV format.');
      }
    };
    reader.readAsText(file);
  };
  
  // Validate translations
  const validateAllTranslations = () => {
    const results = {
      missingKeys: {
        en: [] as string[],
        de: [] as string[],
        sv: [] as string[]
      },
      extraKeys: {
        en: [] as string[],
        de: [] as string[],
        sv: [] as string[]
      }
    };
    
    // Use English as reference
    const englishKeys = Object.keys(flatTranslations.en);
    
    // Check German
    const germanValidation = validateTranslations(flatTranslations.en, flatTranslations.de);
    results.missingKeys.de = germanValidation.missingKeys;
    results.extraKeys.de = germanValidation.extraKeys;
    
    // Check Swedish
    const swedishValidation = validateTranslations(flatTranslations.en, flatTranslations.sv);
    results.missingKeys.sv = swedishValidation.missingKeys;
    results.extraKeys.sv = swedishValidation.extraKeys;
    
    setValidationResults(results);
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Translation Manager</h1>
      
      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search keys or translations..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="w-64">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Sections</option>
            {sections.map(section => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={saveTranslations}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Translations
        </button>
        
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Export to CSV
        </button>
        
        <div>
          <label
            htmlFor="import-csv"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 cursor-pointer"
          >
            Import from CSV
          </label>
          <input
            id="import-csv"
            type="file"
            accept=".csv"
            onChange={handleImport}
            className="hidden"
          />
        </div>
        
        <button
          onClick={validateAllTranslations}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
        >
          Validate Translations
        </button>
      </div>
      
      {/* Validation Results */}
      {(validationResults.missingKeys.de.length > 0 ||
        validationResults.missingKeys.sv.length > 0 ||
        validationResults.extraKeys.de.length > 0 ||
        validationResults.extraKeys.sv.length > 0) && (
        <div className="mb-6 p-4 border border-yellow-400 bg-yellow-50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Validation Results</h2>
          
          {validationResults.missingKeys.de.length > 0 && (
            <div className="mb-2">
              <h3 className="font-medium">Missing keys in German:</h3>
              <ul className="list-disc list-inside">
                {validationResults.missingKeys.de.slice(0, 5).map(key => (
                  <li key={key}>{key}</li>
                ))}
                {validationResults.missingKeys.de.length > 5 && (
                  <li>...and {validationResults.missingKeys.de.length - 5} more</li>
                )}
              </ul>
            </div>
          )}
          
          {validationResults.missingKeys.sv.length > 0 && (
            <div className="mb-2">
              <h3 className="font-medium">Missing keys in Swedish:</h3>
              <ul className="list-disc list-inside">
                {validationResults.missingKeys.sv.slice(0, 5).map(key => (
                  <li key={key}>{key}</li>
                ))}
                {validationResults.missingKeys.sv.length > 5 && (
                  <li>...and {validationResults.missingKeys.sv.length - 5} more</li>
                )}
              </ul>
            </div>
          )}
          
          {validationResults.extraKeys.de.length > 0 && (
            <div className="mb-2">
              <h3 className="font-medium">Extra keys in German:</h3>
              <ul className="list-disc list-inside">
                {validationResults.extraKeys.de.slice(0, 5).map(key => (
                  <li key={key}>{key}</li>
                ))}
                {validationResults.extraKeys.de.length > 5 && (
                  <li>...and {validationResults.extraKeys.de.length - 5} more</li>
                )}
              </ul>
            </div>
          )}
          
          {validationResults.extraKeys.sv.length > 0 && (
            <div>
              <h3 className="font-medium">Extra keys in Swedish:</h3>
              <ul className="list-disc list-inside">
                {validationResults.extraKeys.sv.slice(0, 5).map(key => (
                  <li key={key}>{key}</li>
                ))}
                {validationResults.extraKeys.sv.length > 5 && (
                  <li>...and {validationResults.extraKeys.sv.length - 5} more</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Translations Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border border-gray-300 w-1/4">Key</th>
              <th className="px-4 py-2 text-left border border-gray-300 w-1/4">English</th>
              <th className="px-4 py-2 text-left border border-gray-300 w-1/4">German</th>
              <th className="px-4 py-2 text-left border border-gray-300 w-1/4">Swedish</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeys.map(key => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 font-mono text-sm">
                  {key}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={flatTranslations.en[key] || ''}
                    onChange={(e) => handleTranslationChange(key, 'en', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                    rows={2}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={flatTranslations.de[key] || ''}
                    onChange={(e) => handleTranslationChange(key, 'de', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                    rows={2}
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <textarea
                    value={flatTranslations.sv[key] || ''}
                    onChange={(e) => handleTranslationChange(key, 'sv', e.target.value)}
                    className="w-full p-1 border border-gray-300 rounded"
                    rows={2}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination or "Load More" button could be added here */}
      
      <div className="mt-4 text-gray-600">
        Showing {filteredKeys.length} of {Object.keys(flatTranslations.en).length} keys
      </div>
    </div>
  );
}
