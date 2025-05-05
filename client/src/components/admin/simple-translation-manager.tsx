import React, { useState, useEffect } from 'react';
import { translations } from '@/translations';
import { Language } from '@/contexts/LanguageContext';

// A simplified translation manager that will be more compatible with the current setup
export function SimpleTranslationManager() {
  const [activeLanguage, setActiveLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [translationData, setTranslationData] = useState<any>(null);

  useEffect(() => {
    // Use the translations directly
    setTranslationData(translations);
  }, []);

  if (!translationData) {
    return <div className="text-white">Loading translations...</div>;
  }

  // Get all top-level sections
  const sections = Object.keys(translationData.en || {});

  // Filter sections based on search term
  const filteredSections = sections.filter(section => 
    section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current section data
  const currentSectionData = activeSection 
    ? translationData[activeLanguage][activeSection] 
    : null;

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Translation Manager</h2>
      
      {/* Language selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Language</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveLanguage('en')}
            className={`px-4 py-2 rounded ${activeLanguage === 'en' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLanguage('de')}
            className={`px-4 py-2 rounded ${activeLanguage === 'de' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            German
          </button>
          <button
            onClick={() => setActiveLanguage('sv')}
            className={`px-4 py-2 rounded ${activeLanguage === 'sv' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            Swedish
          </button>
        </div>
      </div>
      
      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Search Sections</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 rounded"
          placeholder="Search for sections..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sections list */}
        <div className="col-span-1 bg-gray-700 p-4 rounded">
          <h3 className="font-medium mb-4">Sections</h3>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredSections.map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`block w-full text-left px-3 py-2 rounded ${activeSection === section ? 'bg-blue-600' : 'hover:bg-gray-600'}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
        
        {/* Section content */}
        <div className="col-span-3 bg-gray-700 p-4 rounded">
          {activeSection ? (
            <>
              <h3 className="font-medium mb-4">
                Section: {activeSection} ({activeLanguage})
              </h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {currentSectionData && typeof currentSectionData === 'object' ? (
                  Object.entries(currentSectionData).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-600 pb-4">
                      <div className="font-medium text-blue-300 mb-1">{key}</div>
                      <div className="text-sm">
                        {typeof value === 'string' ? (
                          <div className="bg-gray-800 p-2 rounded">{value}</div>
                        ) : (
                          <div className="text-yellow-400">
                            Nested object (contains sub-sections)
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm">
                    {typeof currentSectionData === 'string' ? (
                      <div className="bg-gray-800 p-2 rounded">{currentSectionData}</div>
                    ) : (
                      <div className="text-yellow-400">
                        No content or invalid section
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-12">
              Select a section to view its translations
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-400">
        <p>Note: This is a read-only view of translations. For editing, please modify the translation files directly.</p>
      </div>
    </div>
  );
}
