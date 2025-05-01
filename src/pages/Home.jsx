// rafce
import React, { useEffect } from "react";
import ContentShowNewProduct from "../components/home/ContentShowNewProduct";
import NewProduct from "../components/home/NewProduct";
import BestSeller from "../components/home/BestSeller";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import ShowSupporter from "../components/home/ShowSupporter";
import TextAnimation from "../components/home/TextAnimation";
import { Helmet } from "react-helmet-async";
import logobig from '../assets/logobig.png'; // โลโก้เว็บ (อัปโหลดไว้ในโฟลเดอร์ assets)

const Home = () => {

  const FRONTEND_URL = import.meta.env.VITE_BASE_URL;
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="div-wrap">
      <Helmet>
        {/* SEO */}
        <title>{t("mHome")} | {t("shopName")}</title>
        <meta name="description" content={t("auTextHL2") + t("_blank") + t("auTextHL3") + t("_blank") + t("auTextHL4")} />
        <meta name="robots" content="follow, index" />
        {/* Open Graph สำหรับแชร์ใน Social Media */}
        {/* <meta property="og:locale" content="en_US" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={t("shopName")} />
        <meta property="og:title" content={t("mHome") + t("_blank") + "|" + t("_blank") + t("shopName")} />
        <meta property="og:description" content={t("auTextHL2") + t("_blank") + t("auTextHL3") + t("_blank") + t("auTextHL4")} />
        <meta property="og:url" content={FRONTEND_URL} />
        <meta property="og:image" content={FRONTEND_URL + logobig} />
        <meta property="thumbnail" content={FRONTEND_URL + logobig} />
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
