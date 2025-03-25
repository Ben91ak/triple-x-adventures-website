import { en } from './en';
import { de } from './de';
import { sv } from './sv';
import { Language } from '../contexts/LanguageContext';

export const translations = {
  en,
  de,
  sv
};

export function useTranslation(language: Language) {
  return translations[language];
}