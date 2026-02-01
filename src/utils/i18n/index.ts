import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEnglish from "../../../locales/en/common.json";
import translationFrench from "../../../locales/en/common.json";
const resources = {
    en: {
        translation: translationEnglish,
    },
    fr: {
        translation: translationFrench,
    },
}


i18next
.use(initReactI18next)
.init({
  resources,
  lng:"fr",
});

export default i18next;