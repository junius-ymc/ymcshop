// rafce
import React from 'react'
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const NewProdCard = ({ item }) => {

  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (

    <div className="new-products-card relative">

      <Link to={'/shop/#' + item.id} >

        {(item?.quantity === 0)
          ?
          <div className="show-sold-out-box">
            <div className="show-sold-out-text">{chgLng.sSoldOut}</div>
          </div>
          : ""
        }

        {/* ส่วนรูปภาพ */}
        <div>
          {item.images && item.images.length > 0 ? (
            <img src={item.images[0].url} className="new-products-card-img" />
          ) : (
            <div className="new-products-card-img new-products-card-no-img">
              No Image
            </div>
          )}
        </div>

        {/* ส่วนข้อมูลสินค้า */}
        <div className="new-products-data">
          <p className="new-products-data-id">ID: {item.id}</p>
          <p className="new-products-data-text-cut new-products-data-title">{item.title}</p>
          <p className="new-products-data-text-cut new-products-data-description">{item.description}</p>
        </div>

      </Link>

      {/* ส่วนปุ่มและราคา */}
      <div className="new-products-data-end">
        <span className="new-products-data-price">{numberFormat(item.price)} {chgLng.moneyUnit}</span>

        <button
          // onClick={() => actionAddtoCart(item) + toast.success(`เพิ่ม ${item.title} ในตะกร้าแล้วจ้า 😊`, {
          onClick={() => actionAddtoCart(item) + toast.success(`${chgLng.npcAddedToCart1} ${item.title} ${chgLng.npcAddedToCart2}`, {
            bodyClassName: "toastify-toast-modify",
            // icon: <img src="/src/img/icon/ic-cart.png"/>,
            // icon: false,
          })}
          className="bnt-mod"
        >
          <div>
            <img className="img-icon-m" src="/src/img/icon/ic-cart.png" />
          </div>
        </button>

      </div>

    </div>

  );
};

export default NewProdCard;
