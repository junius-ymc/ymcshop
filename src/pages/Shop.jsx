import React, { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";
import ProductCard from "../components/card/ProductCard";
import SearchCard from "../components/card/SearchCard";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const loading = useEcomStore((state) => state.loading);
  const hasMore = useEcomStore((state) => state.hasMore); // ✅ เช็กว่ายังมีสินค้าหรือไม่
  const { t } = useTranslation();

  const [page, setPage] = useState(1); // ✅ เก็บค่าหน้าปัจจุบัน

  useEffect(() => {
    getProduct(8, page); // ✅ โหลดสินค้ารอบแรก
  }, []);

  // ✅ ฟังก์ชันโหลดเพิ่มสินค้า
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
      getProduct(8, page + 1, true);
    }
  };

  // ✅ ตรวจจับการ Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div className="div-wrap">
      <div className="wrap-shop">
        <div className="search-card">
          <SearchCard />
        </div>

        <div className="scrollable-container">
          <p className="div-head">{t("sAllProd")}</p>

          <div className="div-content shop-product-cart">
            {products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>

          {/* ✅ แสดง Loader ตอนโหลดเพิ่ม */}
          {loading && <Loader className="w-16 h-16 animate-spin mx-auto my-4" />}
        </div>
      </div>
    </div>
  );
};

export default Shop;
