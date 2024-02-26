import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';
import en from './locales/en.json';
import sl from './locales/sl.json';
import it from './locales/it.json';
import hr from './locales/hr.json';
import de from './locales/de.json';

export const languages = [
  { name: 'English', code: 'en' },
  { name: 'Slovenščina', code: 'sl' },
  { name: 'Italiano', code: 'it' },
  { name: 'Hrvatski', code: 'hr' },
  { name: 'Deutsch', code: 'de' },
];

i18next
  // .use(Backend) // load translations using http (default public/assets/locals/en/translations)
  .use(LanguageDetector)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      sl: { translation: sl },
      en: { translation: en },
      it: { translation: it },
      hr: { translation: hr },
      de: { translation: de },
    },
    lng: process.env.REACT_APP_DEFAULT_LANGUAGE, // if you're using a language detector, do not define the lng option
    fallbackLng: languages.map(value => value.code),
    detection: {
      order: ['path', 'cookie', 'navigator', 'localStorage', 'subdomain', 'queryString', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      checkWhitelist: true, // options for language detection
    },
    whitelist: languages.map(value => value.code),
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18next;
