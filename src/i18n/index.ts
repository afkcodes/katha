import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';
import { MMKV } from 'react-native-mmkv';

// Import translation resources

import en from './locales/en.json';
import hi from './locales/hi.json';

// Storage instance for language persistence
const storage = new MMKV({
  id: 'sudoku-i18n',
  encryptionKey: 'sudoku-i18n-key',
});

// Available languages
const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru'];

// Get best language match from device settings
const getDeviceLanguage = (): string => {
  const bestMatch = findBestLanguageTag(supportedLanguages);
  return bestMatch?.languageTag || 'en';
};

// Get saved language or detect device language
const getSavedLanguage = (): string => {
  const savedLanguage = storage.getString('language');

  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  // If no saved language, detect from device
  const deviceLanguage = getDeviceLanguage();

  // Save the detected language for next time
  storage.set('language', deviceLanguage);

  return deviceLanguage;
};

// Save language to storage
export const saveLanguage = (language: string): void => {
  if (supportedLanguages.includes(language)) {
    storage.set('language', language);
  }
};

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

const initialLanguage = getSavedLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: 'en',
  debug: __DEV__,

  interpolation: {
    escapeValue: false, // React already escapes values
  },

  // Options for react-i18next
  react: {
    useSuspense: false,
  },
});

export default i18n;
