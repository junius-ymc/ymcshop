// rafce
// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import ProductModal from "../../components/ProductModal"; // นำเข้า ProductModal
import CartModal from "../../components/CartModal"; // นำเข้า CartModal
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา


const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  // console.log(item)

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  // ProductModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleImageClick = () => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  // CartModal
  const [isModalOpenCart, setIsModalOpenCart] = useState(false);
  const handleCartClick = () => {
    setIsModalOpenCart(true);
  };


  return (

    <div>
      <div id={item.id} className={item.id}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >

        <div className="shop-product-card">
          {/* ส่วนรูปภาพ */}

          {/* เพิ่มปุ่มคลิ้ก Modal */}
          <div onClick={handleImageClick} className="shop-product-card-box">

            {(item?.quantity === 0)
              ?
              <div className="show-sold-out-box">
                <div className="show-sold-out-text">{t("sSoldOut")}</div>
              </div>
              : ""
            }

            {item.images && item.images.length > 0 ? (
              <img
                src={item.images[0].url}
                className="shop-product-card-img" 
                loading="lazy" // เพิ่มบรรทัดนี้
                />
            ) : (
              <div
                className="shop-product-card-img shop-product-card-no-img">
                No Image
              </div>
            )}

          </div>
          {/* ส่วนข้อมูลสินค้า */}
          <div className="shop-product-data" onClick={handleImageClick}>
            <p className="shop-product-data-id">ID: {item.id}</p>
            <p className="shop-product-data-text-cut shop-product-data-title">{item.title}</p>
            <p className="shop-product-data-text-cut shop-product-data-description">{item.description}</p>
          </div>

          {/* ส่วนปุ่มและราคา */}
          <div className="shop-product-data-end">
            <span className="shop-product-data-price">{numberFormat(item.price)} {t("moneyUnit")}</span>

            {(item?.quantity === 0)
              ?
              <div className="bnt-mod">
              <div className="flex items-center">
                <img className="img-icon-m" src="/img/icon/ic-cart.png" />
              </div>
            </div>
              : 
              <button
              onClick={() => actionAddtoCart(item) + handleCartClick()}
              className="bnt-mod"
            >
              <div className="flex items-center">
                <img className="img-icon-m" src="/img/icon/ic-cart.png" />
              </div>
            </button>
            }
            
            
          </div>
        </div>

        {/* Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />

        <CartModal
          isOpen={isModalOpenCart}
          onClose={() => setIsModalOpenCart(false)}
        />

      </motion.div >

    </div >

  );
};

export default ProductCard;
