import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { saveLanguage } from './index';

interface LanguageInfo {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

export const availableLanguages: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

// Custom hook for type-safe translations with MMKV persistence
export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(
    async (languageCode: string) => {
      try {
        // Change i18n language
        await i18n.changeLanguage(languageCode);

        // Save to MMKV storage for persistence
        saveLanguage(languageCode);
      } catch (error) {
        console.error('Failed to change language:', error);
      }
    },
    [i18n]
  );

  const getCurrentLanguageInfo = useCallback((): LanguageInfo => {
    const currentCode = i18n.language;
    return availableLanguages.find((lang) => lang.code === currentCode) || availableLanguages[0];
  }, [i18n.language]);

  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage,
    availableLanguages,
    getCurrentLanguageInfo,
  };
};
