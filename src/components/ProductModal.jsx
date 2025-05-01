import React from "react";
import { numberFormat } from "../utils/number";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Zoom } from "swiper/modules";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import IconClose from "./icon/IconClose";
import { Helmet } from "react-helmet-async";

import "swiper/css";
import 'swiper/css/zoom';
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductModal = ({ isOpen, onClose, product }) => {

  const FRONTEND_URL = import.meta.env.VITE_BASE_URL;
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  if (!isOpen || !product) return null;

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
            <Swiper
              modules={[Navigation, Pagination, Autoplay, Zoom]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
              zoom={{ maxRatio: 2.8 }} // อัตราการซูมกำหนดเองได้เลยเ เช่น 2.5 เท่า
              // zoom={true}
              grabCursor={true} // ไอคอนรูปมือจับ
              className="modal-swiper-size"
            >
              {product.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container modal-swiper-slide">
                    <img
                      src={img.url}
                      alt={product.title}
                      title={t("ttTileClickToZoom")}
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <p className="modal-title">{product.title}: {numberFormat(product.price)} {t("moneyUnit")}</p>
            <p className="modal-description">{product.description}</p>
          </div>
          <Helmet>
            <title>{product.title} | {t("shopName")}</title>
            <meta name="description" content={product.description} />
            <meta name="robots" content="follow, index" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={t("shopName")} />
            <meta property="og:title" content={product.title} />
            <meta property="og:description" content={product.description} />
            <meta property="og:image" content={product.images[0]?.url} />
            <meta property="thumbnail" content={product.images[0]?.url} />
            <meta property="og:url" content={`${FRONTEND_URL}/shop?productId=${product.id}`} />
            <link rel="canonical" href={`${FRONTEND_URL}/shop?productId=${product.id}`} />
          </Helmet>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
