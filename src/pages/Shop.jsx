import React, { useEffect, useState } from 'react';
import useEcomStore from '../store/ecom-store';
import ProductCard from '../components/card/ProductCard';
import SearchCard from '../components/card/SearchCard';
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Loader } from 'lucide-react';

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const loading = useEcomStore((state) => state.loading); // ✅ ใช้ตัวแปร Loading

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>

      <div className="div-wrap">
        <div className="wrap-shop">
          <div className="search-card">
            <SearchCard />
          </div>

          <div className="scrollable-container">
            <p className="div-head">{t("sAllProd")}</p>

            <div className="div-content shop-product-cart">
              {loading
                ?
                `<p>🔄กำลังโหลดอยู่จ้า...🕒</p> ` +
                <Loader className='w-16 h-16 animate-spin' />
                :
                products.map((item, index) => (
                  <ProductCard key={index} item={item} />
                )
                )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Shop;