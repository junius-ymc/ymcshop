import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import NewProdCard from "../card/NewProdCard";
import SwiperShowBestSeller from "./SwiperShowBestSeller";
import { SwiperSlide } from "swiper/react";
import { Loader } from 'lucide-react';

const BestSeller = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่มตัวแปร Loading

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true); // เริ่มโหลด
    listProductBy("sold", "desc", 12) // จำนวนที่จะให้แสดงสินค้า
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // โหลดเสร็จ
      });
  };

  // console.log(data);

  return (
    // Code
    <div className="div-content">
      {loading ? (
        // เริ่ม ตัวโหลดดิ้ง
        <div className="loading-box">
          <br />
          <p className="loading-animate-pulse">⏳ ..กำลังโหลดอยู่จ้า.. ⌛</p>
          <br />
          <Loader className="loading-animate-icon loading-animate-spin" />
          <br />
        </div>
        // จบ ตัวโหลดดิ้ง
      ) : (
        <SwiperShowBestSeller>
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <NewProdCard item={item} />
            </SwiperSlide>
          ))}
        </SwiperShowBestSeller>
      )}
    </div>
  );
};

export default BestSeller;