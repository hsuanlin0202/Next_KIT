import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { ch, en, jp } from "./public/locales/index";
i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  lng: "en" | "fi" | "jp",
  // defaultNS:'fi',
  resources: {
    en: {
      translation: en,
    },
    jp: {
      translation: jp,
    },
    ch: {
      translation: ch,
    },
  },
});

export default i18n;
