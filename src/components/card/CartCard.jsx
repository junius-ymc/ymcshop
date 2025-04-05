import React from "react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from '../../utils/number';
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import IconTrash from "../icon/IconTrash";
import IconCartList from "../icon/IconCartList";
// import { Link } from "react-router-dom";

const CartCard = () => {
  // Javascript
  const carts = useEcomStore((state) => state.carts);
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา

  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);

  return (
    <div className="modal-cartcard">

      <div className="div-head modal-cartcard-head setdiv-3">
        <span>
          <IconCartList className="icon-cart-list-modal" />
        </span>
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
                <div onClick={() => actionRemoveProduct(item.id)}>
                  <IconTrash className="icon-trash" />
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
                    alt="Minus"
                    title="Minus"
                    className="icon-arrow icon-arrow-down"
                  > - </button>
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
                    alt="Plus"
                    title="Plus"
                    className="icon-arrow icon-arrow-up"
                  > + </button>
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
        {/* <Link to="/cart/">
          <button
            className="modal-cartcard-total-count-price-btn"
          >
            {t("ccPayment")}
          </button>
        </Link> */}
      </div>

    </div>
  );
};

export default CartCard;