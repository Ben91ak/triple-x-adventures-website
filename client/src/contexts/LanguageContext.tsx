import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

export type Language = "en" | "de" | "sv";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to get the language from localStorage, default to 'de' if not found
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "de";
  });

  // Save language choice to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Determine and set the initial language based on browser settings if no saved preference
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === "de" || browserLang === "sv" || browserLang === "en") {
        setLanguage(browserLang as Language);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}