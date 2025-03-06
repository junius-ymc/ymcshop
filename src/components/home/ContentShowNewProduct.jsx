import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/product";
// import moment from "moment/min/moment-with-locales"; // นำเข้า เปลี่ยนรูปแบบเวลา
import { dateFormat } from "../../utils/dateformat"; // นำเข้า เปลี่ยนรูปแบบเวลา
import ProductModal from "../ProductModal"; // ✅ นำเข้า ProductModal
import ShowSupporter from "./ShowSupporter";
import TextAnimation from "./TextAnimation";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา


const ContentShowNewProduct = () => {
  const [data, setData] = useState([]);
  // ส่วนของ ProductModal
  const [isOpen, setIsOpen] = useState(false); // ✅ ควบคุมการเปิด/ปิด modal
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ เก็บสินค้าที่ถูกเลือก

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [loading, setLoading] = useState(true); // เพิ่มตัวแปร Loading

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true); // เริ่มโหลด
    listProductBy("createdAt", "desc", 4)
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

  // ส่วนของ ProductModal
  const openModal = (product) => {
    setSelectedProduct(product); // ✅ กำหนดสินค้าที่เลือก
    setIsOpen(true); // ✅ เปิด modal
  };

  const closeModal = () => {
    setIsOpen(false); // ✅ ปิด modal
    setSelectedProduct(null); // ✅ เคลียร์ข้อมูลสินค้า
  };

  return (
    <div>

      {/* ---------------------------- Start ShowSupporter ---------------------------- */}
      <div className="wrapper">
        <div className="showsupporter">
          <ShowSupporter />
        </div>
      </div>
      {/* ---------------------------- End ShowSupporter ---------------------------- */}


      {/* ---------------------------- Start infomation ---------------------------- */}
      <div className="wrapper">
        <div className="link-box">

          <div className="mini-link-box-l">
            <span> {t("minfo")} <i className=""></i></span>
          </div>

          <div>
            <TextAnimation />
          </div>

        </div>
      </div>
      {/* ---------------------------- End infomation ---------------------------- */}

      {/* ---------------------------- Start Content ShowNewProduct ---------------------------- */}
      <div className="wrapper">
        <div>
          <p className="div-head"> {t("mShowNewProduct")} </p>
        </div>
        {loading ? (
          <p>🔄กำลังโหลดอยู่จ้า...🕒</p> // สามารถเปลี่ยนเป็น Spinner หรือ Skeleton ได้
        ) : (
          <div className="div-content first-box relative">
            {data?.map((item, index) => (
              <div className="first-box-content" key={index} onClick={() => openModal(item)}>
                <div>
                  {item.images && item.images.length > 0 ? (
                    <div className="first-box-content-img">
                      <img
                        src={item.images[0].url}
                        alt={item.title}
                      />
                    </div>
                  ) : (
                    <div className="first-content-noimage">
                      No Image
                    </div>
                  )}
                  {(item?.quantity === 0)
                    ?
                    <div className="show-sold-out-box">
                      <div className="show-sold-out-text">{t("sSoldOut")}</div>
                    </div>
                    : ""
                  }
                </div>

                <div className="first-content">
                  <div className="first-content-catagory">{item.category.name}</div>
                  <h4>{item.title}</h4>
                  <p>{dateFormat(item.updatedAt)}</p>
                  {/* <p>{item.updatedAt}</p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ---------------------------- End Content ShowNewProduct ---------------------------- */}

      {/* ✅ แสดง Modal ถ้ามีการคลิกสินค้า */}
      <ProductModal isOpen={isOpen} onClose={closeModal} product={selectedProduct} />

    </div>
  );
};

export default ContentShowNewProduct;
