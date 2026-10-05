'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../../public/locales/en/common.json';
import am from '../../public/locales/am/common.json';
import om from '../../public/locales/om/common.json';

const translations = {
  en,
  am,
  om,
} as const;

type Locale = keyof typeof translations;

interface I18nContextType {
  locale: Locale;
  t: (key: string, params?: Record<string, string>) => string;
  changeLocale: (locale: Locale) => void;
  locales: Locale[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
    }

    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`);
      return key;
    }

    if (params) {
      return Object.entries(params).reduce(
        (str, [param, replacement]) => str.replace(`{{${param}}}`, replacement),
        value,
      );
    }

    return value;
  };

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale, locales: Object.keys(translations) as Locale[] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
