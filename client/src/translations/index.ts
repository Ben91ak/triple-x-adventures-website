import { en } from './en';
import { de } from './de';
import { sv } from './sv';
import { Language } from '../contexts/LanguageContext';

// Local interface for translation object to avoid module resolution issues
interface AppTranslations {
  // Using an index signature to allow any properties in the translation objects
  // This is more flexible and accommodates differences between language files
  [key: string]: any;
}

export const translations: Record<string, AppTranslations> = {
  en,
  de,
  sv
};

export function useTranslation(language: Language): AppTranslations {
  return translations[language];
}