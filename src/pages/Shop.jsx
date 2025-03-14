import React, { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";
import ProductCard from "../components/card/ProductCard";
import SearchCard from "../components/card/SearchCard";
import { useTranslation } from "react-i18next";
import { Loader, Search, X } from "lucide-react"; // ✅ ใช้ไอคอน Loading 🔍 ❌
import { useLocation, useNavigate } from "react-router-dom";

const Shop = () => {
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

  // ซ่อน/แสดง SearchCard
  const [isSearchOpen, setIsSearchOpen] = useState(false); // ✅ ควบคุม Modal
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen); // ✅ เปิด/ปิด Modal

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
  // console.log("currentPage", currentPage);

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
        <button key="first" onClick={() => goToPage(1)} className="bttn shop-pagination-bnt">
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
        <button key="last" onClick={() => goToPage(totalPagesToShow)} className="bttn shop-pagination-bnt">
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

        {/* เริ่ม ส่วนของการแสดงค้นหาสินค้า */}
        {/* ✅ Floating Button ค้นหา */}
        <button className="floating-search-btn" onClick={toggleSearch}>
          <Search size={24} />
        </button>

        {/* ✅ Modal ค้นหา */}
        {isSearchOpen && (
          <div className="modal-overlay" onClick={toggleSearch}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={toggleSearch}>
                <X size={24} />
              </button>
              <SearchCard />
            </div>
          </div>
        )}
        {/* จบ ส่วนของการแสดงค้นหาสินค้า */}

        {/* เริ่ม ส่วนของการแสดงรายการสินค้า */}
        <div className="scrollable-container">
          <p className="div-head">{t("sAllProd")}</p>
          <div className="div-content shop-product-cart">
            {/* ✅ แสดง Loader ตอนโหลดเพิ่ม */}
            {loading && (
              // เริ่ม ตัวโหลดดิ้ง
              <div className="loading-box">
                <br />
                <p className="loading-animate-pulse">{t("waitMassLoading")}</p>
                <br />
                <Loader className="loading-animate-icon loading-animate-spin" />
                <br />
              </div>
              // จบ ตัวโหลดดิ้ง
            )}
            {currentItems?.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>

          {/* ✅ แสดง Pagination */}
          <div className="shop-pagination">
            <div>
              <select
                value={itemsPerPage} // ✅ ค่าปัจจุบัน
                onChange={handleItemsPerPageChange} // ✅ ฟังก์ชันเปลี่ยนค่า
                title={t("sListProductPerPage")}
                className="form-input w-12 mb-0"
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
        {/* จบ ส่วนของการแสดงรายการสินค้า */}

      </div>
    </div>
  );
};

export default Shop;
