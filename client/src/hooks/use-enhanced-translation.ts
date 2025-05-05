import { useContext, useCallback } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import { translations } from '@/translations';
import { 
  TranslationKey, 
  UseTranslationReturn 
} from '@/translations/types';
import { 
  getNestedValue, 
  interpolate 
} from '@/translations/utils';

/**
 * Enhanced translation hook with better error handling, interpolation, and type safety
 */
export function useEnhancedTranslation(): UseTranslationReturn {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error("useEnhancedTranslation must be used within a LanguageProvider");
  }
  
  const { language, setLanguage } = context;
  
  /**
   * Translation function with interpolation support
   * @param key - The translation key (supports dot notation)
   * @param params - Optional parameters for interpolation
   * @returns The translated string
   */
  const t = useCallback((key: TranslationKey, params?: Record<string, any>): string => {
    // Get the current language translations
    const currentTranslations = translations[language];
    
    // Try to get the translation from the current language
    let translation = getNestedValue(currentTranslations, key);
    
    // If not found in current language, try English as fallback
    if (translation === undefined && language !== 'en') {
      translation = getNestedValue(translations.en, key);
    }
    
    // If still not found, return the key itself
    if (translation === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    // Interpolate any parameters
    return interpolate(translation, params);
  }, [language]);
  
  /**
   * Change the current language
   */
  const changeLanguage = useCallback((newLanguage: typeof language) => {
    setLanguage(newLanguage);
  }, [setLanguage]);
  
  return { t, language, changeLanguage };
}
