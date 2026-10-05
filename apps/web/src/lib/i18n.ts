import en from '../../public/locales/en/common.json';
import am from '../../public/locales/am/common.json';
import om from '../../public/locales/om/common.json';

const translations = {
  en,
  am,
  om,
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function useTranslation(locale: Locale = 'en') {
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      window.location.reload();
    }
  };

  const getLocale = (): Locale => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('locale') as Locale) || 'en';
    }
    return 'en';
  };

  return {
    t,
    locale: getLocale(),
    changeLocale,
    locales: Object.keys(translations) as Locale[],
  };
}
