import React from "react";
import { numberFormat } from "../utils/number";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Zoom } from "swiper/modules";

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

import "swiper/css";
import 'swiper/css/zoom';
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductModal = ({ isOpen, onClose, product }) => {

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

          <button className="modal-bnt-close" onClick={onClose} title={t("ttClose")}>
            ✖
            {/* <img className="img-icon-s" src="/img/icon/ic-x.png" /> */}
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
            zoom={{ maxRatio: 2.5 }} // อัตราการซูมกำหนดเองได้เลยเ เช่น 2.5 เท่า
            // zoom={true}
            grabCursor={true} // ไอคอนรูปมือจับ
            className="modal-swiper-size"
          >
            {product.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container modal-swiper-slide">
                  <img src={img.url} alt={product.title} title={t("ttTileClickToZoom")} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="modal-title">{product.title} : {numberFormat(product.price)} {t("moneyUnit")}</p>
          <p className="modal-description">{product.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
