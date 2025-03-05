import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useEcomStore from '../store/ecom-store';
import ProductCard from '../components/card/ProductCard';
import SearchCard from '../components/card/SearchCard';
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const location = useLocation();

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  const [currentPage, setCurrentPage] = useState(1);
  // จำนวนที่จะให้แสดงต่อ 1 หน้า
  const [itemsPerPage] = useState(8);

  // เรียงลำดับผลลัพท์จากใหม่ไปเก่า
  const sortedProducts = [...products].sort((a, b) => b.id - a.id);

  useEffect(() => {
    getProduct();
  }, []);

  // จัดการ scroll เมื่อหน้าเปลี่ยน
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const container = document.querySelector(".scrollable-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]); // ทำงานเมื่อ currentPage เปลี่ยน

  // จัดการการ scroll เมื่อมี hash ID
  useEffect(() => {
    if (location.hash && sortedProducts.length > 0) {
      const id = location.hash.replace("#", "");
      const productIndex = sortedProducts.findIndex(
        (product) => product.id.toString() === id
      );

      if (productIndex !== -1) {
        const pageNumber = Math.floor(productIndex / itemsPerPage) + 1;
        setCurrentPage(pageNumber);

        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 500);
      }
    }
  }, [location.hash, products, itemsPerPage]);

  // คำนวณสินค้าที่จะแสดง
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

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
              {currentItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination */}
            <div className="shop-pagination">
              <button
                className="shop-pagination-bnt shop-pagination-bnt-previous"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage <= 1}
              >
                {t("sPreviousbtn")}
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`shop-pagination-bnt ${
                    currentPage === page
                      ? "shop-pagination-bnt-number-act"
                      : "shop-pagination-bnt-number"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                className="shop-pagination-bnt shop-pagination-bnt-next"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage >= totalPages}
              >
                {t("sNextbtn")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;