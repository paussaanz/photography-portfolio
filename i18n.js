import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend) // Load translations from /public/locales
  .use(LanguageDetector) // Detect user's language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Default language
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "cookie", "querystring", "navigator"], // Prioritize stored language
      caches: ["localStorage", "cookie"], // Save selected language in localStorage or cookies
    },
  });

export default i18n;
