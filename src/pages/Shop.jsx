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
  const totalPages = useEcomStore((state) => state.totalPages);
  const currentPage = useEcomStore((state) => state.currentPage); // ✅ เพิ่มบรรทัดนี้
  const setPage = useEcomStore((state) => state.setPage); // ✅ เก็บค่าหน้าปัจจุบัน
  const { t } = useTranslation();

  useEffect(() => {
    getProduct(4, currentPage); // ✅ โหลดสินค้าตามหน้า
  }, [currentPage]);

  // ✅ ฟังก์ชันเปลี่ยนหน้า
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
      getProduct(4, page);
    }
  };

  // ✅ ฟังก์ชันสร้างเลขหน้า
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3; // ✅ แสดงเลขหน้าตรงกลาง 3 ตัว

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // ถ้ามีหน้ามากกว่า maxPagesToShow → ปรับค่า startPage & endPage
    if (totalPages > maxPagesToShow && endPage === totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
    }

    // ✅ ปุ่ม "หน้าแรกสุด" (<<)
    if (currentPage > 2) {
      pages.push(
        <button key="first" onClick={() => handlePageChange(1)} className="bttn shop-pagination-bnt">
          {"<<"}
        </button>
      );
    }

    // ✅ ปุ่ม "ย้อนกลับ" (<)
    if (currentPage > 1) {
      pages.push(
        <button key="prev" onClick={() => handlePageChange(currentPage - 1)} className="bttn shop-pagination-bnt shop-pagination-bnt-previous">
          {"<"}
        </button>
      );
    }

    // ✅ แสดง "..." ด้านหน้า ถ้า currentPage > 2
    if (startPage > 1) {
      pages.push(<span key="dots-start">...</span>);
    }

    // ✅ แสดงเลขหน้าตรงกลาง
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`bttn shop-pagination-bnt shop-pagination-bnt-number ${currentPage === i ? "active" : "shop-pagination-bnt-number-act"}`}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    // ✅ แสดง "..." ด้านหลัง ถ้า endPage < totalPages
    if (endPage < totalPages) {
      pages.push(<span key="dots-end">...</span>);
    }

    // ✅ ปุ่ม "ถัดไป" (>)
    if (currentPage < totalPages) {
      pages.push(
        <button key="next" onClick={() => handlePageChange(currentPage + 1)} className="bttn shop-pagination-bnt shop-pagination-bnt-next">
          {">"}
        </button>
      );
    }

    // ✅ ปุ่ม "หน้าสุดท้าย" (>>)
    if (currentPage < totalPages - 1) {
      pages.push(
        <button key="last" onClick={() => handlePageChange(totalPages)} className="bttn shop-pagination-bnt">
          {">>"}
        </button>
      );
    }

    return pages;
  };

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

          {/* ✅ แสดง Pagination */}
          <div className="shop-pagination">{renderPageNumbers()}</div>

          {/* ✅ แสดง Loader ตอนโหลดเพิ่ม */}
          {loading && (
            // เริ่ม ตัวโหลดดิ้ง
            <div className="loading-box">
              <br />
              <p className="loading-animate-pulse">⏳ ..กำลังโหลดอยู่จ้า.. ⌛</p>
              <br />
              <Loader className="loading-animate-icon loading-animate-spin" />
              <br />
            </div>
            // จบ ตัวโหลดดิ้ง
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
