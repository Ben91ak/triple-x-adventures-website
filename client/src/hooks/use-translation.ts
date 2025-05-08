npm error code ERR_INVALID_ARG_TYPE
npm error The "from" argument must be of type string. Received undefined
npm error A complete log of this run can be found in: /Users/triplex/.npm/_logs/2025-05-08T09_10_18_453Z-debug-0.log
triplex@Benjamins-MacBook-Pro-2 Triple-X-Adventures-Website-1 % npm audit fix
npm error code ENOTEMPTY
npm error syscall rename
npm error path /Users/triplex/Downloads/Triple-X-Adventures-Website-1/node_modules/vercel
npm error dest /Users/triplex/Downloads/Triple-X-Adventures-Website-1/node_modules/.vercel-NG6ErkUp
npm error errno -66
npm error ENOTEMPTY: directory not empty, rename '/Users/triplex/Downloads/Triple-X-Adventures-Website-1/node_modules/vercel' -> '/Users/triplex/Downloads/Triple-X-Adventures-Website-1/node_modules/.vercel-NG6ErkUp'
npm error A complete log of this run can be found in: /Users/triplex/.npm/_logs/2025-05-08T09_10_27_237Z-debug-0.log
triplex@Benjamins-MacBook-Pro-2 Triple-X-Adventures-Website-1 % import { useContext } from 'react';
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
        // Use type assertion to tell TypeScript this is a valid access
        result = (result as Record<string, any>)[k];
      } else {
        // If key not found in current language, try English
        if (language !== 'en') {
          let fallback = translations['en'];
          for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
              // Use type assertion for fallback as well
              fallback = (fallback as Record<string, any>)[fk];
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