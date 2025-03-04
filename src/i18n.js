import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import th from "./lang/th.json";
import en from "./lang/en.json";
import jp from "./lang/jp.json";

// โหลดค่าภาษาจาก Local Storage ถ้ามี
const savedLanguage = localStorage.getItem("language") || "th"; // ค่าเริ่มต้น (เปลี่ยนเป็น 'th' ได้)

i18n
  .use(initReactI18next)
  .init({
    resources: {
      th: { translation: th },
      en: { translation: en },
      jp: { translation: jp },
    },
    lng: savedLanguage, // ใช้ค่าภาษาจาก localStorage ถ้ามี
    fallbackLng: "en", // ถ้าหาภาษาไม่เจอให้ใช้ภาษาอังกฤษ
    interpolation: { escapeValue: false },
  });

export default i18n;
