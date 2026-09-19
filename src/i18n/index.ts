import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LOCALES, type Locale } from '../types';
import { en, type Translation } from './locales/en';
import { ms } from './locales/ms';
import { ta } from './locales/ta';
import { zh } from './locales/zh';

/** What each language calls itself — never translated into the others. */
export const LANGUAGE_NAMES: Readonly<Record<Locale, string>> = {
  en: 'English',
  zh: '中文',
  ms: 'Bahasa Melayu',
  ta: 'தமிழ்',
};

/*
  Every language ships in the bundle rather than being fetched per locale.
  Four small dictionaries are far cheaper than the round trip, and a language
  the service worker never fetched would be unavailable offline — which is the
  situation this card is built for.
*/
const resources = {
  en: { translation: en },
  zh: { translation: zh },
  ms: { translation: ms },
  ta: { translation: ta },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: LOCALES,
    fallbackLng: 'en',
    // Treat en-GB as en and zh-CN as zh rather than falling all the way back.
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    interpolation: {
      // React escapes for us; doing it twice mangles anything with an ampersand.
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'lang',
    },
  });

/*
  Keeps <html lang> in step with the choice. It is what tells a screen reader
  which voice to use and the browser which hyphenation and font fallbacks
  apply, and it is wrong from the moment the detector picks anything but the
  language hard-coded in index.html.
*/
function applyDocumentLanguage(language: string) {
  document.documentElement.lang = toLocale(language);
}

applyDocumentLanguage(i18n.language);
i18n.on('languageChanged', applyDocumentLanguage);

/** Narrows i18next's free-form language string to one we actually ship. */
export function toLocale(language: string): Locale {
  const base = language.split('-').at(0);
  return LOCALES.find((locale) => locale === base) ?? 'en';
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: { translation: Translation };
  }
}

export default i18n;
