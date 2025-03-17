import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product";
import NewProdCard from "../card/NewProdCard";
import SwiperShowNewProduct from "./SwiperShowNewProduct";
import { SwiperSlide } from "swiper/react";
import LoaderDiv from "../LoaderDiv";

const NewProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // เพิ่มตัวแปร Loading

  useEffect(() => {
    // code
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true); // เริ่มโหลด
    listProductBy("createdAt", "desc", 12) // จำนวนสินค้าที่จะให้แสดง
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
        // ✅ เริ่ม แสดง Loader
        <LoaderDiv />
        // ✅ จบ แสดง Loader
      ) : (
        <SwiperShowNewProduct>
          {data?.map((item, index) => (
            <SwiperSlide key={index}>
              <NewProdCard item={item} />
            </SwiperSlide>
          ))}
        </SwiperShowNewProduct>
      )}
    </div>
  );
};

export default NewProduct;