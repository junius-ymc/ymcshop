import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import NewProdCard from "../card/NewProdCard";
import SwiperShowBestSeller from "./SwiperShowBestSeller";
import { SwiperSlide } from "swiper/react";

const BestSeller = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("sold", "desc", 12) // จำนวนที่จะให้แสดงสินค้า
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(data);

  return (
    // Code
    <div className="div-content">

      <SwiperShowBestSeller>
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <NewProdCard item={item} />
          </SwiperSlide>
        ))}
      </SwiperShowBestSeller>

    </div>
  );
};

export default BestSeller;