import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import "/src/style/loader.css";

const LoaderDiv = () => {
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  return (
    <>
      <section>
        <div className="loader">
          <div className="loader-text loader-text-pluse">{t("waitMassLoading")}</div>
          {[...Array(20)].map((_, index) => (
            <span key={index} style={{ "--i": index + 1 }}></span>
          ))}
        </div>
      </section>
    </>
  );
};

export default LoaderDiv;
