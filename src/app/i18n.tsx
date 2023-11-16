import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { lang } from '../lang/lang'; // Import your lang file

const resources = {
  en: {
    translation: lang.en,
  },
  uz: {
    translation: lang.uz,
  },
  ru: {
    translation: lang.ru,
  },
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem('lang') || 'en',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;