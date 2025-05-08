// Define the Language type directly instead of importing from LanguageContext
// to avoid JSX-related TypeScript errors
export type Language = "en" | "de" | "sv";

/**
 * Type for translation keys
 * This helps with type safety when accessing translations
 */
export type TranslationKey = string;

/**
 * Type for translation values
 * Can be a string or a nested object of strings
 */
export type TranslationValue = string | { [key: string]: string | any };

/**
 * Type for a flat translation dictionary
 * Keys are dot-notation paths, values are strings
 */
export type FlatTranslations = Record<string, string>;

/**
 * Type for a nested translation dictionary
 * This is the format of your current translation files
 */
export type NestedTranslations = Record<string, TranslationValue>;

/**
 * Type for the translations object that contains all languages
 */
export type TranslationsObject = Record<Language, NestedTranslations>;

/**
 * Interface for translation function
 */
export interface TranslationFunction {
  (key: TranslationKey, params?: Record<string, any>): string;
}

/**
 * Interface for the useTranslation hook return value
 */
export interface UseTranslationReturn {
  t: TranslationFunction;
  language: Language;
  changeLanguage: (lang: Language) => void;
}

/**
 * Type for translation context value
 */
export interface TranslationContextValue {
  translations: TranslationsObject;
  language: Language;
  setLanguage: (lang: Language) => void;
}
