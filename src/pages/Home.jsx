// rafce
import React, { useEffect } from "react";
import ContentShowNewProduct from "../components/home/ContentShowNewProduct";
import NewProduct from "../components/home/NewProduct";
import BestSeller from "../components/home/BestSeller";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import ShowSupporter from "../components/home/ShowSupporter";
import TextAnimation from "../components/home/TextAnimation";
import { Helmet } from "react-helmet-async";
import logobig from '../assets/Logo-big.png'; // โลโก้เว็บ (อัปโหลดไว้ในโฟลเดอร์ assets)

const Home = () => {

  const FRONTEND_URL = import.meta.env.VITE_BASE_URL;
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const savedLanguageSeo = localStorage.getItem("languageSeo") || "th_TH"; // โหลดค่าภาษาจาก Local Storage ถ้ามี
  const metaTitle = t("mHome") + " | " + t("shopName");
  const metaDescription = (t("auTextHL2") + " " + t("auTextHL3") + " " + t("auTextHL4"))?.replace(/\n/g, ' ').slice(0, 160) ?? "";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="div-wrap">
      <Helmet>
        {/* SEO */}
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="follow, index" />
        {/* Open Graph สำหรับแชร์ใน Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={savedLanguageSeo} />
        <meta property="og:site_name" content={t("shopName")} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={FRONTEND_URL + logobig} />
        <meta property="og:url" content={FRONTEND_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={FRONTEND_URL + logobig} />
        {/* Link SEO */}
        <link rel="canonical" href={FRONTEND_URL} />
      </Helmet>

      {/* ---------------------------- Start ShowSupporter ---------------------------- */}
      <div className="wrapper">
        <div className="showsupporter">
          <ShowSupporter />
        </div>
      </div>
      {/* ---------------------------- End ShowSupporter ---------------------------- */}

      {/* ---------------------------- Start infomation ---------------------------- */}
      <div className="wrapper">
        <div className="link-box">
          <div className="mini-link-box">
            <span> {t("minfo")} </span>
          </div>
          <TextAnimation />
        </div>
      </div>
      {/* ---------------------------- End infomation ---------------------------- */}

      {/* ---------------------------- Start Content ShowNewProduct ---------------------------- */}
      <div>
        <p className="div-head">{t("mShowNewProduct")}</p>
        <div className=" div-content">
          <ContentShowNewProduct />
        </div>
      </div>
      {/* ---------------------------- End Content ShowNewProduct ---------------------------- */}

      <div className="products-head">
        <p className="div-head"> {t("newProd")}</p>
        <NewProduct />
      </div>

      <div className="bestseller-head">
        <p className="div-head"> {t("bestSell")}</p>
        <BestSeller />
      </div>

    </div>
  );
};

export default Home;
