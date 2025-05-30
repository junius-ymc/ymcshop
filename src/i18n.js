import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import th from "./lang/th.json";
import en from "./lang/en.json";
import ja from "./lang/ja.json";

// โหลดค่าภาษาจาก Local Storage ถ้ามี
const savedLanguage = localStorage.getItem("language") || "th"; // ค่าเริ่มต้น (เปลี่ยนเป็น 'th' ได้)
document.documentElement.lang = savedLanguage; // ✅ เปลี่ยนค่าแท็ค <html lang="xx">

i18n
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: th },
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: savedLanguage, // ใช้ค่าภาษาจาก localStorage ถ้ามี
    fallbackLng: "th", // ถ้าหาภาษาไม่เจอให้ใช้ภาษาอังกฤษ
    interpolation: { escapeValue: false },
  });

export default i18n;
