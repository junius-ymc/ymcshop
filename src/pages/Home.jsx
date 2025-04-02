// rafce
import React from "react";
import ContentShowNewProduct from "../components/home/ContentShowNewProduct";
import NewProduct from "../components/home/NewProduct";
import BestSeller from "../components/home/BestSeller";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import ShowSupporter from "../components/home/ShowSupporter";
import TextAnimation from "../components/home/TextAnimation";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  return (
    <div className="div-wrap">
      <Helmet>
        <title>{t("mHome")} | {t("shopName")}</title>
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
