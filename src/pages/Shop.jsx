import React, { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";
import ProductCard from "../components/card/ProductCard";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import SearchCardModal from "../components/SearchCardModal";
import LoaderDiv from "../components/LoaderDiv";
import IconSearch from "../components/icon/IconSearch";
import IconShopping from "../components/icon/IconShopping";
import { Helmet } from "react-helmet-async";
import logobig from '../assets/logobig.png';

const Shop = () => {
  const FRONTEND_URL = import.meta.env.VITE_BASE_URL;
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const loading = useEcomStore((state) => state.loading);
  const { t } = useTranslation();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId"); // ✅ ดึง productId จาก URL

  // State สำหรับ Pagination
  const totalPages = useEcomStore((state) => state.totalPages);
  const [itemsPerPage, setItemsPerPage] = useState(5); // ✅ ค่าเริ่มต้น
  const [currentPage, setCurrentPage] = useState(1); // ✅ ค่าหน้าปัจจุบัน
  const navigate = useNavigate(); // ✅ เรียกใช้ Hook นี้แทน useHistory

  // คำนวณสินค้าที่จะแสดงในหน้าปัจจุบัน
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // ซ่อน/แสดง modal SearchCard
  const [isModalOpenSearchCard, setIsModalOpenSearchCard] = useState(false);
  const handleSearchCardClick = () => {
    setIsModalOpenSearchCard(true);
  };

  // ✅ เพิ่มฟังก์ชันให้เปลี่ยนหน้าเป็นหน้าแรก
  const resetToFirstPage = () => {
    setCurrentPage(1);
  };

  // ฟังก์ชันสำหรับเปลี่ยนหน้า
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // ฟังก์ชันสำหรับเปลี่ยนจำนวนรายการสินค้าต่อหน้า
  const handleItemsPerPageChange = (e) => {
    const newValue = parseInt(e.target.value, 10) || 1; // ✅ รับค่าจาก <input>
    setItemsPerPage(newValue);
    setCurrentPage(1); // ✅ กลับไปหน้าแรก
    getProduct(newValue, 1);
  };

  // console.log("totalPages", totalPages);

  // ✅ ฟังก์ชันสร้างเลขหน้า
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3; // ✅ แสดงเลขหน้าตรงกลาง 3 ตัว
    const totalPagesToShow = Math.ceil(products.length / itemsPerPage); // คำนวณจำนวนหน้าทั้งหมด

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPagesToShow, startPage + maxPagesToShow - 1);

    // ถ้ามีหน้ามากกว่า maxPagesToShow → ปรับค่า startPage & endPage
    if (totalPages > maxPagesToShow && endPage === totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
    }

    // ✅ ปุ่ม "หน้าแรกสุด" (<<)
    if (currentPage > 2) {
      pages.push(
        <button key="first" onClick={() => goToPage(1)} className="bttn shop-pagination-bnt shop-pagination-bnt-first-end">
          {"<<"}
        </button>
      );
    }

    // ✅ ปุ่ม "ย้อนกลับ" (<)
    if (currentPage > 1) {
      pages.push(
        <button key="prev" onClick={() => goToPage(currentPage - 1)} className="bttn shop-pagination-bnt shop-pagination-bnt-previous">
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
          onClick={() => goToPage(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    // ✅ แสดง "..." ด้านหลัง ถ้า endPage < totalPages
    if (endPage < totalPagesToShow) {
      pages.push(<span key="dots-end">...</span>);
    }

    // ✅ ปุ่ม "ถัดไป" (>)
    if (currentPage < totalPagesToShow) {
      pages.push(
        <button key="next" onClick={() => goToPage(currentPage + 1)} className="bttn shop-pagination-bnt shop-pagination-bnt-next">
          {">"}
        </button>
      );
    }

    // ✅ ปุ่ม "หน้าสุดท้าย" (>>)
    if (currentPage < totalPagesToShow - 1) {
      pages.push(
        <button key="last" onClick={() => goToPage(totalPagesToShow)} className="bttn shop-pagination-bnt shop-pagination-bnt-first-end">
          {">>"}
        </button>
      );
    }

    return pages;
  };

  // ตรวจจับความเคลื่อนไหวของ itemsPerPage
  useEffect(() => {
    getProduct();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ สกอร์ขึ้นด้านบนถ้ามีการเปลี่ยนหน้า
    }, 100);
  }, [itemsPerPage]);

  useEffect(() => {
    if (productId && products.length > 0) {
      const productIndex = products.findIndex((p) => p.id === parseInt(productId));
      if (productIndex !== -1) {
        const newPage = Math.ceil((productIndex + 1) / itemsPerPage);
        if (currentPage !== newPage) {
          // ✅ เปลี่ยนไปหน้าที่สินค้านั้นอยู่
          setCurrentPage(newPage);
        }
      }
    }
  }, [productId, products]);

  useEffect(() => {
    if (productId) {
      const timer = setTimeout(() => {
        const productElement = document.getElementById(`product-${productId}`);
        if (productElement) {
          productElement.scrollIntoView({ behavior: "smooth", block: "center" });
          // ✅ ลบ productId จาก URL หลังเปลี่ยนหน้าเสร็จ
          const timer = setTimeout(() => {
            navigate("/shop", { replace: true });
          }, 510);
          return () => clearTimeout(timer);
        }
      }, 500); // ✅ รอให้เปลี่ยนหน้าเสร็จ แล้วค่อยเลื่อน
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ สกอร์ขึ้นด้านบนถ้ามีการเปลี่ยนหน้า
      }, 100);
    }
  }, [currentPage]);

  // console.log(products);

  return (
    <div className="div-wrap">
      <div className="wrap-shop">
        <Helmet>
          <title>{t("mShop")} | {t("shopName")}</title>
          <meta name="description" content={t("auTextHL2") + t("_blank") + t("auTextHL3") + t("_blank") + t("auTextHL4")} />
          <meta name="robots" content="follow, index" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={t("shopName")} />
          <meta property="og:title" content={t("mShop") + t("_blank") + "|" + t("_blank") + t("shopName")} />
          <meta property="og:description" content={t("auTextHL2") + t("_blank") + t("auTextHL3") + t("_blank") + t("auTextHL4")} />
          <meta property="og:image" content={FRONTEND_URL + logobig} />
          <meta property="thumbnail" content={FRONTEND_URL + logobig} />
          <meta property="og:url" content={`${FRONTEND_URL}/shop`} />
          <link rel="canonical" href={`${FRONTEND_URL}/shop`} />
        </Helmet>

        {/* เริ่ม ส่วนของการแสดงค้นหาสินค้า */}
        {/* ✅ Floating Button ค้นหา */}
        <button className="floating-search-btn" onClick={handleSearchCardClick}>
          <span>
            <IconSearch className="icon-search-btn" />
          </span>
          <div className="shop-search-text"><strong>{t("sbSearch")}</strong></div>
        </button>

        {/* ✅ Modal ค้นหา */}
        <SearchCardModal
          isOpen={isModalOpenSearchCard}
          onClose={() => setIsModalOpenSearchCard(false)}
          resetPage={resetToFirstPage} // ✅ ส่งฟังก์ชันนี้ไป
        />
        {/* จบ ส่วนของการแสดงค้นหาสินค้า */}

        {/* เริ่ม ส่วนของการแสดงรายการสินค้า */}
        <div className="scrollable-container">
          <div className="div-head">
            <span className="setdiv-3">
              <IconShopping className="icon-shopping" />
              {t("sShoppping")}
            </span>
          </div>
          <div className="div-content">
            <div className="shop-head-title-top-box">
              <div className="shop-head-title-top">
                {t("sAllProd")} {products.length} {t("sItem")}{", "}
                {t("sPage")} {currentPage}/{Math.ceil(products.length / itemsPerPage)}
              </div>
              <div className="shop-product-cart">
                {/* ✅ เริ่ม แสดง Loader */}
                {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
                {/* ✅ จบ แสดง Loader */}
                {currentItems?.map((item, index) => (
                  <ProductCard key={index} item={item} />
                ))}
              </div>
              <div className="shop-head-title-top shop-head-title-bottom">
                {t("sAllProd")} {products.length} {t("sItem")}{", "}
                {t("sPage")} {currentPage}/{Math.ceil(products.length / itemsPerPage)}
              </div>
            </div>
            {/* ✅ แสดง Pagination */}
            <div className="shop-pagination">
              <div>
                <select
                  value={itemsPerPage} // ✅ ค่าปัจจุบัน
                  onChange={handleItemsPerPageChange} // ✅ ฟังก์ชันเปลี่ยนค่า
                  title={t("sListProductPerPage")}
                  className="items-per-page"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              {/* **** Pagination อันใหม่ **** */}
              {renderPageNumbers()}
            </div>
          </div>
        </div>
        {/* จบ ส่วนของการแสดงรายการสินค้า */}

      </div>
    </div>
  );
};

export default Shop;
