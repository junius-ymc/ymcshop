import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import NewProdCard from "../card/NewProdCard";
import SwiperShowNewProduct from "./SwiperShowNewProduct";
import { SwiperSlide } from "swiper/react";

const NewProduct = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = () => {
    listProductBy("createdAt", "desc", 12) // จำนวนสินค้าที่จะให้แสดง
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

      <SwiperShowNewProduct>
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <NewProdCard item={item} />
          </SwiperSlide>
        ))}
      </SwiperShowNewProduct>

    </div>
  );
};

export default NewProduct;