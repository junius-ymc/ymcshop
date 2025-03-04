import React from "react";
import { Trash2 } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import { numberFormat } from '../../utils/number';

import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา

const CartCard = () => {
  // Javascript
  const carts = useEcomStore((state) => state.carts);
  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  return (

    <div className="modal-cartcard">

      <div className="div-head modal-cartcard-head setdiv-3">
        <span><img className="img-icon-m" src="/src/img/icon/ic-cart.png" alt={t("ccShoppingCart")} /></span>
        {t("ccShoppingCart")} {carts.length} {t("lcItem")}
      </div>
      {/* Border */}
      <div className="modal-cartcard-content">
        {/* Card */}
        {carts.slice().reverse().map((item, index) => (
          <div key={index} className="modal-cartcard-content-box">
            {/* Row 1 */}
            <div className="modal-cartcard-content-box-row-1">
              {/* Left */}
              <div className="modal-cartcard-content-box-row-1-title">{item.title}</div>
              <div className="modal-cartcard-content-box-row-1-data">

                <div className="modal-cartcard-content-box-row-1-data-left">
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                    />
                  ) : (
                    <div
                      className="modal-cartcard-content-box-row-1-data-left-no-img"
                    >
                      No Image
                    </div>
                  )}
                  <div className="modal-cartcard-content-box-row-1-data-description">{item.description}</div>
                </div>

                {/* Right */}
                <div
                  onClick={() => actionRemoveProduct(item.id)}
                  className="ic-trash"
                >
                  <Trash2 />
                </div>
              </div>
            </div>

            {/* Row 2  */}
            <div className="modal-cartcard-content-box-row-2">
              {/* Left */}
              <div className="modal-cartcard-content-box-row-2-quantity-box">
                {(!item.quantity || item.count <= 1) ? (
                  <div></div>
                ) : (
                  <button
                    onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                    className="modal-cartcard-content-box-row-2-quantity-minus-btn"
                  >
                    <img className="img-icon-s" src="/src/img/icon/ic-down.png" alt="Minus" />
                  </button>
                )}
                <div className="modal-cartcard-content-box-row-2-quantity">
                  {/* <div> */}
                  <span className="modal-cartcard-content-box-row-2-quantity-count">{item.count}</span>
                </div>
                {(!item.quantity || item.count >= item.quantity) ? (
                  <div></div>
                ) : (
                  <button
                    onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                    className="modal-cartcard-content-box-row-2-quantity-plus-btn"
                  >
                    <img className="img-icon-s" src="/src/img/icon/ic-up.png" alt="Plus" />
                  </button>
                )}
              </div>
              {/* Right */}
              <div className="modal-cartcard-content-box-row-2-quantity-count-price">
                {numberFormat(item.price * item.count)} {t("moneyUnit")}
              </div>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="modal-cartcard-total">
          <span className="modal-cartcard-total-count">{t("ccTotalPrice")}</span>
          <span className="modal-cartcard-total-count-price">{numberFormat(getTotalPrice())} {t("moneyUnit")}</span>
        </div>

        {/* Button */}
        <Link to="/cart/">
          <button
            className="modal-cartcard-total-count-price-btn"
          >
            {t("ccPayment")}
          </button>
        </Link>
      </div>

    </div>

  );
};

export default CartCard;