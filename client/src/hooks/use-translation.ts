import { useContext } from 'react';
import { LanguageContext, Language } from '@/contexts/LanguageContext';
import { translations } from '@/translations';

/**
 * Hook to access translations based on the current language
 * Also handles nested keys and fallbacks to English if a key doesn't exist
 */
export function useTranslation() {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  
  const { language } = context;
  
  /**
   * Access translation by key
   * Supports dot notation for nested objects
   */
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language as keyof typeof translations];
    
    // Traverse the nested objects
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // If key not found in current language, try English
        if (language !== 'en') {
          let fallback = translations['en'];
          for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
              fallback = fallback[fk];
            } else {
              return key; // Key not found even in English
            }
          }
          return typeof fallback === 'string' ? fallback : key;
        }
        return key; // Key not found
      }
    }
    
    return typeof result === 'string' ? result : key;
  };
  
  return { t, language };
}