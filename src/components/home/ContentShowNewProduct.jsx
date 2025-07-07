import React, { useState, useEffect } from "react";
import { listProductBy } from "../../api/product";
// import moment from "moment/min/moment-with-locales"; // นำเข้า เปลี่ยนรูปแบบเวลา
import { dateFormat } from "../../utils/dateformat"; // นำเข้า เปลี่ยนรูปแบบเวลา
import ProductModal from "../ProductModal"; // ✅ นำเข้า ProductModal
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../LoaderDiv";

const ContentShowNewProduct = () => {
  const [data, setData] = useState([]);
  // ส่วนของ ProductModal
  const [isOpen, setIsOpen] = useState(false); // ✅ ควบคุมการเปิด/ปิด modal
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ เก็บสินค้าที่ถูกเลือก

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [loading, setLoading] = useState(true); // เพิ่มตัวแปร Loading
    let sbCategoryId = [];

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

      <div className="wrapper">
        {loading ? (
          // ✅ เริ่ม แสดง Loader
          <LoaderDiv />
          // ✅ จบ แสดง Loader
        ) : (
          <div className=" first-box relative">
            {data?.map((item, index) => (
              sbCategoryId = item.category.id === 1 ? t("sbCategoryId1")
                : item.category.id === 2 ? t("sbCategoryId2")
                  : item.category.id === 3 ? t("sbCategoryId3")
                    : item.category.id === 4 ? t("sbCategoryId4")
                      : item.category.id === 5 ? t("sbCategoryId5")
                        : item.category.id === 6 ? t("sbCategoryId6")
                          : item.category.id === 7 ? t("sbCategoryId7")
                            : item.category.id === 8 ? t("sbCategoryId8")
                              : item.category.name,
              <div className="first-box-content" key={index} onClick={() => openModal(item)}>
                <div>
                  {item.images && item.images.length > 0 ? (
                    <div className="first-box-content-img">
                      <img
                        src={item.images[0].url}
                        alt={item.title}
                        loading="lazy"
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
                  <div className="first-content-catagory">{sbCategoryId}</div>
                  <h4>{item.title}</h4>
                  <p>{dateFormat(item.updatedAt)}</p>
                  {/* <p>{item.updatedAt}</p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ แสดง Modal ถ้ามีการคลิกสินค้า */}
      <ProductModal isOpen={isOpen} onClose={closeModal} product={selectedProduct} />

    </div>
  );
};

export default ContentShowNewProduct;
