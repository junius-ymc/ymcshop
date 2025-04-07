import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartCard from "./card/CartCard";
import IconClose from "./icon/IconClose";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import { Link } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  if (!isOpen) return null;

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
          className="modal-cart-div-open"
          initial={{ x: 500, opacity: 0 }} // เริ่มจากด้านล่างและจาง
          animate={{ x: 0, opacity: 1 }} // ค่อยๆ เลื่อนขึ้นมาและชัดขึ้น
          exit={{ x: -500, opacity: 0 }} // กลับลงไปและจางหาย
          transition={{ duration: 0.3 }} // ตั้งค่า transition ให้สมูท
          onClick={(e) => e.stopPropagation()} // ป้องกันปิด modal ถ้าคลิกข้างใน
        >

          <button onClick={onClose} className="modal-bnt-close">
            <IconClose className="modal-bnt-close" />
          </button>

          <div>
            <CartCard />
              <Link to="/shop" onClick={onClose} className="bttn btn-mod btn-mod-1 modal-cartcard-total-count-price-btn">
                <button>
                  {t("ccContinueShopping")}
                </button>
              </Link>
              <Link to="/cart" onClick={onClose} className="bttn btn-mod modal-cartcard-total-count-price-btn">
                <button>
                  {t("ccPayment")}
                </button>
              </Link>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;
