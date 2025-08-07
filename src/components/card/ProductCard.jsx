// rafce
// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import ProductModal from "../../components/ProductModal"; // นำเข้า ProductModal
import CartModal from "../../components/CartModal"; // นำเข้า CartModal
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import IconCart from "../icon/IconCart";
import CopyLinkButton from "./CopyLinkButton";

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
    <div id={`product-${item.id}`}>
      {/* <div id={item.id} className={item.id}></div> */}

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
                alt={item.title}
                className="shop-product-card-img"
                loading="lazy" // เพิ่มบรรทัดนี้ โหลดแบบ lazy
              />
            ) : (
              <div
                className="shop-product-card-img shop-product-card-no-img">
                No Image
              </div>
            )}

          </div>
          {/* ส่วนข้อมูลสินค้า */}
          <div className="shop-product-data">
            {/* <p className="shop-product-data-id">ID: {item.id}</p> */}
            <CopyLinkButton productId={item.id} />
            <p className="shop-product-data-text-cut shop-product-data-title">{item.title}</p>
            <div className="h-[44px] overflow-hidden">
              <p className="shop-product-data-description text-sm line-clamp-2">{item.description}</p>
            </div>
            <p className="text-xs text-center cursor-pointer hover:text-[--bluelite]" onClick={handleImageClick}>{t("sReadMore")}...</p>
          </div>

          {/* ส่วนปุ่มและราคา */}
          <div className="shop-product-data-end">
            <a href={`/shop?productId=${item.id}`} target="_blank">
              <span className="shop-product-data-price">{numberFormat(item.price)} {t("moneyUnit")}</span>
            </a>

            {(item?.quantity === 0)
              ?
              <div className="flex items-center h-[36px]">
                {/* <IconCart className="icon-shopping-cart" /> */}
              </div>
              :
              <button
                onClick={() => actionAddtoCart(item) + handleCartClick()}
              >
                <div className="flex items-center">
                  <IconCart className="icon-shopping-cart" />
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
