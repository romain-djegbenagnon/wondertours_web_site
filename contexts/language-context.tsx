"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Locale, getTranslation, translations } from "@/lib/translations";
import { translateWithFallback } from "@/lib/google-translate";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ReturnType<typeof getTranslation>;
  translate: (text: string, manualTranslation?: string) => Promise<string>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");

  const translate = async (text: string, manualTranslation?: string): Promise<string> => {
    const targetLang = locale === "fr" ? "en" : "fr";
    return translateWithFallback(text, targetLang, manualTranslation, locale);
  };

  const value = {
    locale,
    setLocale,
    t: getTranslation(locale),
    translate,
  };

  return (
    <LanguageContext.Provider value={value}>
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
