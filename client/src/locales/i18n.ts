import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your JSON translations
import translationEn from './en/translation.json';
import translationZh_Hans from './zh-Hans/translation.json';
import translationZh_Hant from './zh-Hant/translation.json';

export const defaultNS = 'translation';

export const resources = {
  en: { translation: translationEn },
  'zh-Hans': { translation: translationZh_Hans },
  'zh-Hant': { translation: translationZh_Hant },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: {
      'zh-TW': ['zh-Hant', 'en'],
      'zh-HK': ['zh-Hant', 'en'],
      zh: ['zh-Hans', 'en'],
      default: ['en'],
    },
    supportedLngs: ['en', 'zh-Hans', 'zh-Hant'],
    fallbackNS: 'translation',
    ns: ['translation'],
    debug: false,
    defaultNS,
    resources,
    interpolation: { escapeValue: false },
  });

export default i18n;
