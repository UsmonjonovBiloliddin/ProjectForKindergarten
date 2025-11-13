  import i18n from "i18next";
  import { initReactI18next } from "react-i18next";
  import LanguageDetector from "i18next-browser-languagedetector";
  import uzTranslation from "./locales/uz/translation.json";
  import ruTranslation from "./locales/rus/translation.json";
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "uz",
      resources: {
        uz: { translation: uzTranslation },
        ru: { translation: ruTranslation },
      },
      interpolation: {
        escapeValue: false, // React o‘zi xavfsizlikni ta’minlaydi
      },
    });

  export default i18n;