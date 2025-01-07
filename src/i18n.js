import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import nextI18NextConfig from '../next-i18next.config';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ...nextI18NextConfig,
    lng: 'uk', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: true, // Enable debug mode to see more logs
  });

// Add event listeners for logging
i18n.on('languageChanged', (lng) => {
  console.log(`Language changed to: ${lng}`);
});

i18n.on('loaded', (loaded) => {
  console.log('Loaded translations:', loaded);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`Failed loading ${ns} namespace for ${lng}: ${msg}`);
});

i18n.on('missingKey', (lng, ns, key, res) => {
  console.warn(`Missing key "${key}" in namespace "${ns}" for language "${lng}"`);
});

export default i18n;