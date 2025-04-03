// rafce
// import React from "react";
import React, { useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import ProductModal from "../../components/ProductModal"; // นำเข้า ProductModal
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../LoaderDiv";
import IconTrash from "../icon/IconTrash";
import IconCart from "../icon/IconCart";
import { Helmet } from "react-helmet-async";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [loading, setLoading] = useState(false);  // ✅ เพิ่มตัวแปร loading

  const handleSaveCart = async () => {
    setLoading(true); // เริ่มโหลด
    await createUserCart(token, { cart })
      .then((res) => {
        // console.log(res);
        toast.success(t("lcOrderSuccess"), {
          bodyClassName: "toastify-toast-modify",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log("err", err);
        // toast.warning(err.response.data.message);
        toast.error(`${t("liServerError")}`, {
          bodyClassName: "toastify-toast-modify",
        });
      })
      .finally(() => {
        setLoading(false); // โหลดเสร็จ
      });
  };

  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );

  // ส่วนของ ProductModal
  const [isOpen, setIsOpen] = useState(false); // ✅ ควบคุมการเปิด/ปิด modal
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ เก็บสินค้าที่ถูกเลือก

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
    <div className="div-wrap">
      <Helmet>
        <title>{t("mCart")} | {t("shopName")}</title>
      </Helmet>

      {/* Header */}
      <div className="cart-header">
        <div className="cart-header-title div-head">
          <span>
            <IconCart className="icon-cart" />
          </span>
          {t("lcListCart")} {cart.length} {t("lcItem")}
        </div>
      </div>

      <div className="div-content">

        {/* List */}
        <div className="cart-list">
          {/* Left */}
          <div className="cart-list-left">
            {/* Card */}
            {cart.map((item, index) => (
              <div key={index} className="cart-list-left-box">
                <div className="cart-list-left-data">
                  {/* Row 1 */}
                  {/* Left */}
                  <div className="cart-list-left-data-1">

                    {/* <div className="relative"> */}
                    {item.images && item.images.length > 0 ? (
                      <img src={item.images[0].url} onClick={() => openModal(item)} />
                    ) : (
                      <div className="cart-list-left-data-1-no-img" onClick={() => openModal(item)}>
                        No Image
                      </div>
                    )}

                    <div>
                      <span className="cart-list-left-data-1-text-1">{item.title} </span>
                      <span className="cart-list-left-data-1-text-2"> {numberFormat(item.price)}x{item.count}</span>
                      <div className="cart-list-left-data-1-text-3">{item.description}</div>
                    </div>
                  </div>
                  {/* Right */}
                  <div className="cart-list-left-data-2-right">
                    <div className="cart-list-left-data-2">
                      {numberFormat(item.price * item.count)} {t("moneyUnit")}
                    </div>
                    <div onClick={() => actionRemoveProduct(item.id)}>
                      <IconTrash className="icon-trash" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="cart-list-right-box-wrap">
            <div className="cart-list-right-box">
              <div className="cart-list-right-title">{t("lcTotal")}</div>
              <hr />
              <div className="cart-list-right-text-1">
                <span>{t("lcNetTotal")}</span>
                <span className="cart-list-right-text-2">
                  {numberFormat(getTotalPrice())} {t("moneyUnit")}
                </span>
              </div>
              <hr />
              <div className="cart-list-right-end">
                {user ? (
                  <Link>
                    <button
                      disabled={cart.length < 1}
                      onClick={handleSaveCart}
                      className="btn-mod cart-list-right-end-btn-1"
                    >
                      {t("lcOrderProducts")}
                    </button>
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <button className="btn-mod cart-list-right-end-btn-1">
                      {t("mLogin")}
                    </button>
                  </Link>
                )}

                <Link to={"/shop"}>
                  <button className="btn-mod cart-list-right-end-btn-2">
                    {t("lcGotoShop")}
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ✅ แสดง Modal ถ้ามีการคลิกสินค้า */}
        <ProductModal isOpen={isOpen} onClose={closeModal} product={selectedProduct} />

        {/* ✅ เริ่ม แสดง Loader */}
        {loading && (<div className="loader-on-top"><LoaderDiv /></div>)}
        {/* ✅ จบ แสดง Loader */}

      </div>

    </div>
  );
};

export default ListCart;
