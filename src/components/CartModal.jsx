import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartCard from "./card/CartCard";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

const CartModal = ({ isOpen, onClose }) => {

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
          initial={{ y: -500, opacity: 0 }} // เริ่มจากด้านล่างและจาง
          animate={{ y: 0, opacity: 1 }} // ค่อยๆ เลื่อนขึ้นมาและชัดขึ้น
          exit={{ y: 500, opacity: 0 }} // กลับลงไปและจางหาย
          transition={{ duration: 0.3 }} // ตั้งค่า transition ให้สมูท
          onClick={(e) => e.stopPropagation()} // ป้องกันปิด modal ถ้าคลิกข้างใน
        >

          <button className="modal-bnt-close" onClick={onClose}>
            ✖
            {/* <img className="img-icon-s" src="/src/img/icon/ic-x.png" /> */}
          </button>

          <div>
            <CartCard />
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartModal;
