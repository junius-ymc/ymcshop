// rafce
import React from "react";
import ContentShowNewProduct from "../components/home/ContentShowNewProduct";
import NewProduct from "../components/home/NewProduct";
import BestSeller from "../components/home/BestSeller";

const Home = () => {
  //console.log(hotSellL)
  return (
    <div className="div-wrap">

      <div>
        <ContentShowNewProduct />
      </div>

      <div className="products-head">
        <p className="div-head"> {chgLng.newProd}</p>
        <NewProduct />
      </div>

      <div className="bestseller-head">
        <p className="div-head"> {chgLng.bestSell}</p>
        <BestSeller />
      </div>

    </div>
  );
};

export default Home;
