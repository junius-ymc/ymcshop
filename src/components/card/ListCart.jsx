// rafce
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
import ShippingCalculator from "./ShippingCalculator";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [loading, setLoading] = useState(false);  // ✅ เพิ่มตัวแปร loading
  const [shippingFee, setShippingFee] = useState(0);

  const handleSaveCart = async () => {
    setLoading(true); // เริ่มโหลด

    try {
      const cartData = cart.map((item) => ({
        id: item.id,
        count: item.count,
        price: item.price,
      }));

      const totalPrice = getTotalPrice();
      const grandTotal = totalPrice + shippingFee;
      // console.log("grandTotal:", grandTotal);

      await createUserCart(token, {
        cart: cartData,
        shippingFee: shippingFee,
        grandTotal,
      });

      toast.success(t("lcOrderSuccess"), {
        bodyClassName: "toastify-toast-modify",
      });
      navigate("/checkout");

    } catch (err) {
      console.log("err", err);
      toast.error(`${t("liServerError")}`, {
        bodyClassName: "toastify-toast-modify",
      });
    } finally {
      setLoading(false); // โหลดเสร็จ
    }
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
              {cart.length >= 1 && (
                <div className="flex justify-center items-center mt-2 mb-2">
                  <ShippingCalculator
                    itemCount={cart.length} // หรือจำนวนสินค้าทั้งหมด
                    onShippingChange={({ country, fee }) => {
                      setShippingFee(fee); // บันทึกค่าจัดส่งลง state
                    }}
                  />
                </div>
              )}
              <div className="cart-list-right-text-1 text-sm">
                <span>{t("htrTotal")}{t("htrPrice")}</span>
                <span className="cart-list-right-text-2 text-sm">
                  {numberFormat(getTotalPrice())} {t("moneyUnit")}
                </span>
              </div>
              <div className="cart-list-right-text-1 text-sm">
                <span>{t("scShippingCosts")}</span>
                <span className="cart-list-right-text-2 text-sm">
                  {numberFormat(shippingFee)} {t("moneyUnit")}
                </span>
              </div>
              <hr />
              <div className="cart-list-right-text-1">
                <span>{t("lcNetTotal")}</span>
                <span className="cart-list-right-text-2">
                  {numberFormat(getTotalPrice() + shippingFee)} {t("moneyUnit")}
                </span>
              </div>
              <hr />
              <div className="cart-list-right-end">
                {user ? (
                  <button
                    disabled={cart.length < 1}
                    onClick={handleSaveCart}
                    className="bttn btn-mod"
                  >
                    {t("lcOrderProducts")}
                  </button>
                ) : (
                  <Link to={"/login"} className="bttn btn-mod">
                    <button>
                      {t("mLogin")}
                    </button>
                  </Link>
                )}
                <Link to={"/shop"} className="bttn btn-mod-1">
                  <button>
                    {t("lcGotoShop")}
                  </button>
                </Link>
                {/* <Link to={"/howtopay"} className="bttn btn-mod-1">
                  <button>
                    {t("mHowToPay")}
                  </button>
                </Link> */}
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
