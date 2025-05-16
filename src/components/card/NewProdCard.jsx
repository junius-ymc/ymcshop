// rafce
import React from 'react'
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import IconCart from '../icon/IconCart';
import { createNofity } from '../../utils/createAlert';

const NewProdCard = ({ item }) => {

  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop?productId=${item.id}`); // ✅ ส่ง id ไปที่หน้า Shop
  };

  return (
    <div className="new-products-card relative">

      <div className="div-cursor-pointer" onClick={handleClick}>
        {(item?.quantity === 0)
          ?
          <div className="show-sold-out-box">
            <div className="show-sold-out-text">{t("sSoldOut")}</div>
          </div>
          : ""
        }

        {/* ส่วนรูปภาพ */}
        <div>
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              alt={item.title}
              className="new-products-card-img"
              loading="lazy"
            />
          ) : (
            <div className="new-products-card-img new-products-card-no-img">
              No Image
            </div>
          )}
        </div>
      </div>

      {/* ส่วนข้อมูลสินค้า */}
      <div className="new-products-data">
        {/* <p className="new-products-data-id">ID: {item.id}</p> */}
        <p className="new-products-data-text-cut new-products-data-title">{item.title}</p>
        <p className="new-products-data-text-cut new-products-data-description">{item.description}</p>
      </div>

      {/* ส่วนปุ่มและราคา */}
      <div className="new-products-data-end">
        <span className="new-products-data-price">{numberFormat(item.price)} {t("moneyUnit")}</span>
        <button
          onClick={() =>
            actionAddtoCart(item)
            +
            createNofity("success",
              `<p>${item.title}</p>`,
              `${t("npcAddedToCart")}`,
              `${t("ttClose")}`,
              '5000')
          }
        >
          <IconCart className="icon-shopping-cart" />
        </button>
      </div>

    </div>
  );
};

export default NewProdCard;
