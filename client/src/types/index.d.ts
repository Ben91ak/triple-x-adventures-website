// Type definitions for the project

// Declare modules without type definitions
declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  export type Icon = FC<SVGProps<SVGSVGElement>>;
  // Add specific icon exports as needed
}

// Path alias modules
declare module '@/contexts/LanguageContext' {
  export interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
  }
  export function useLanguage(): LanguageContextType;
}

declare module '@/translations' {
  interface TranslationFunction {
    (key: string, params?: Record<string, string | number>): string;
  }
  export function useTranslation(language: string): TranslationFunction;
}

// Ensure JSX is properly typed

