// rafce
import React from "react";
import ContentShowNewProduct from "../components/home/ContentShowNewProduct";
import NewProduct from "../components/home/NewProduct";
import BestSeller from "../components/home/BestSeller";

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

const Home = () => {
  //console.log(hotSellL)

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  return (
    <div className="div-wrap">

      <div>
        <ContentShowNewProduct />
      </div>

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
