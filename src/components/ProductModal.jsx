import React, { useState } from "react";
import { numberFormat } from "../utils/number";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import IconClose from "./icon/IconClose";
import { Helmet } from "react-helmet-async";
import useEcomStore from "../store/ecom-store";
import { createNofity } from "../utils/createAlert";
import IconCart from "./icon/IconCart";
import ImageModal from "./ImageModal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductModal = ({ isOpen, onClose, product }) => {

  const FRONTEND_URL = import.meta.env.VITE_BASE_URL;
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const savedLanguageSeo = localStorage.getItem("languageSeo") || "th_TH"; // โหลดค่าภาษาจาก Local Storage ถ้ามี
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [arrimg, setArrimg] = useState(null);
  const handleImageZoom = (arrimg) => {
    setArrimg(arrimg)
    setSelectedProduct(product, arrimg);
    setShowModal(true);
  };

  if (!isOpen || !product) return null;

  // console.log(product);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-div-close"
        initial={{ opacity: 0 }} // เริ่มต้นจากจางหายไป
        animate={{ opacity: 1 }} // แสดงผลแบบค่อยๆ ปรากฏ
        exit={{ opacity: 0 }} // หายไปแบบค่อยๆ จางลง
        transition={{ duration: 0.3 }}
        onClick={onClose} // คลิกนอก modal เพื่อปิด
      >
        <motion.div
          className="modal-div-open"
          initial={{ y: -500, opacity: 0 }} // เริ่มจากด้านล่างและจาง
          animate={{ y: 0, opacity: 1 }} // ค่อยๆ เลื่อนขึ้นมาและชัดขึ้น
          exit={{ y: 500, opacity: 0 }} // กลับลงไปและจางหาย
          transition={{ duration: 0.3 }} // ตั้งค่า transition ให้สมูท
          onClick={(e) => e.stopPropagation()} // ป้องกันปิด modal ถ้าคลิกข้างใน
        >

          <button onClick={onClose} title={t("ttClose")} className="modal-bnt-close">
            <IconClose className="modal-bnt-close" />
          </button>

          {/* Swiper สำหรับเลื่อนดูรูปภาพ */}
          <div className="modal-wrap">
            <p className="modal-title">{product.title}: {numberFormat(product.price)} {t("moneyUnit")}</p>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
              className="modal-swiper-size"
            >
              {product.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <Zoom>
                    {/* <div className="swiper-zoom-container modal-swiper-slide"> */}
                    <div onClick={() => handleImageZoom(img.url)} className="swiper-zoom-container modal-swiper-slide">
                      <img
                        src={img.url}
                        alt={product.title}
                        title={t("ttTileClickToZoom")}
                        loading="lazy"
                      />
                    </div>
                  </Zoom>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="text-[--texclact] text-center text-xs">{t("ttTileClickToZoom")}</div>
            <div className="flex items-center justify-center"><p className="modal-description">{product.description}</p></div>
            <div className="flex items-center justify-center">
              {(product?.quantity === 0)
                ?
                <div className="flex items-center">
                  <span className="bttn btn-mod-1 mt-2" disabled>{t("sSoldOut")}</span>
                </div>
                :
                <span onClick={onClose}>
                  <button className="bttn btn-mod mt-2"
                    onClick={() =>
                      actionAddtoCart(product)
                      +
                      createNofity("success",
                        `${product.title}`,
                        `${t("npcAddedToCart")}`,
                        `${t("ttClose")}`)
                    }
                  >
                    {/* <span onClick={onClose}>{t("ccAddToCart")}</span> */}
                    {t("ccAddToCart")}
                    <span className="flex items-center">
                      <IconCart className="rounded-sm size-6 bg-[--red] fill-[--bgcontent]" />
                    </span>
                  </button>
                </span>
              }
            </div>
          </div>
          {showModal && (
            <ImageModal
              product={selectedProduct}
              arrimg={arrimg}
              onClose={() => setShowModal(false)}
            />
          )}
          <Helmet>
            <title>{product.title} | {t("shopName")}</title>
            <meta name="description" content={product.description?.replace(/\n/g, ' ').slice(0, 160) ?? ""} />
            <meta name="robots" content="follow, index" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content={savedLanguageSeo} />
            <meta property="og:site_name" content={t("shopName")} />
            <meta property="og:title" content={product.title} />
            <meta property="og:description" content={product.description?.replace(/\n/g, ' ').slice(0, 160) ?? ""} />
            <meta property="og:image" content={product.images[0]?.url} />
            <meta property="og:url" content={`${FRONTEND_URL}/shop?productId=${product.id}`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={product.title} />
            <meta name="twitter:description" content={product.description?.replace(/\n/g, ' ').slice(0, 160) ?? ""} />
            <meta name="twitter:image" content={product.images[0]?.url} />
            <link rel="canonical" href={`${FRONTEND_URL}/shop?productId=${product.id}`} />
          </Helmet>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
