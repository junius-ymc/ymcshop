// rafce
// import React from "react";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import ProductModal from "../../components/ProductModal"; // นำเข้า ProductModal

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        // console.log(res);
        // toast.success("บันทึกใส่ตะกร้าเรียบร้อยแล้วจ้า", {
        // position: "top-center",
        toast.success(chgLng.lcOrderSuccess, {
          bodyClassName: "toastify-toast-modify",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log("err", err);
        toast.warning(err.response.data.message);
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

    // <div className="div-wrap">

    <div className="div-wrap">

      {/* Header */}
      <div className="cart-header">
        <div className="cart-header-title div-head">
          {/* <ListCheck size={36} /> */}
          <img className="img-icon-m" src="../../../src/img/icon/ic-list.png" alt={chgLng.lcListCart} />
          {chgLng.lcListCart} {cart.length} {chgLng.lcItem}
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

                    {/* {(item?.quantity === 0)
                      ?
                      <div className="show-sold-out-box">
                        <div className="show-sold-out-text">Sold Out</div>
                      </div>
                      : ""
                    }
                    </div> */}

                    <div>
                      <span className="cart-list-left-data-1-text-1">{item.title} </span>
                      <span className="cart-list-left-data-1-text-2"> {numberFormat(item.price)}x{item.count}</span>
                      <div className="cart-list-left-data-1-text-3">{item.description}</div>
                    </div>
                  </div>
                  {/* Right */}
                  <div className="cart-list-left-data-2-right">
                    <div className="cart-list-left-data-2">
                      {numberFormat(item.price * item.count)} {chgLng.moneyUnit}
                    </div>
                    <div onClick={() => actionRemoveProduct(item.id)} className="ic-trash">
                      {/* <img className="img-icon-m" src="../../../src/img/icon/ic-x.png" alt="Trash" /> */}
                      <Trash2 />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="cart-list-right-box-wrap">
            <div className="cart-list-right-box">
              <div className="cart-list-right-title">{chgLng.lcTotal}</div>

              <hr />

              <div className="cart-list-right-text-1">

                <span>{chgLng.lcNetTotal}</span>
                <span className="cart-list-right-text-2">
                  {numberFormat(getTotalPrice())} {chgLng.moneyUnit}
                </span>

              </div>

              <hr />

              <div className="cart-list-right-end">
                {user ? (
                  <Link>
                    <button
                      disabled={cart.length < 1}
                      onClick={handleSaveCart}
                      className="bnt-mod cart-list-right-end-btn-1"
                    >
                      {chgLng.lcOrderProducts}
                    </button>
                  </Link>
                ) : (
                  <Link to={"/login/"}>
                    <button className="bnt-mod cart-list-right-end-btn-1">
                      {chgLng.mLogin}
                    </button>
                  </Link>
                )}

                <Link to={"/shop/"}>
                  <button className="bnt-mod cart-list-right-end-btn-2">
                    {chgLng.lcGotoShop}
                  </button>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ✅ แสดง Modal ถ้ามีการคลิกสินค้า */}
        <ProductModal isOpen={isOpen} onClose={closeModal} product={selectedProduct} />

      </div>

      {/* </div> */}

    </div>
  );
};

export default ListCart;
