import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchCard from "./card/SearchCard";

const SearchCardModal = ({ isOpen, onClose, resetPage }) => {

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
          className="modal-cart-div-open modal-search-card"
          initial={{ x: -500, opacity: 0 }} // เริ่มจากด้านล่างและจาง
          animate={{ x: 0, opacity: 1 }} // ค่อยๆ เลื่อนขึ้นมาและชัดขึ้น
          exit={{ x: 500, opacity: 0 }} // กลับลงไปและจางหาย
          transition={{ duration: 0.3 }} // ตั้งค่า transition ให้สมูท
          onClick={(e) => e.stopPropagation()} // ป้องกันปิด modal ถ้าคลิกข้างใน
        >

          <button className="modal-bnt-close" onClick={onClose}>
            ✖
            {/* <img className="img-icon-s" src="/public/img/icon/ic-x.png" /> */}
          </button>

          <div>
            {/* ✅ ส่งไป SearchCard */}
            <SearchCard resetPage={resetPage} />
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchCardModal;
