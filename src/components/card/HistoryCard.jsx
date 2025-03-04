import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  // เรียงลำดับผลลัพท์จากใหม่ไปเก่า
  const sortedProducts = [...orders].sort((a, b) => b.id - a.id);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let statusMsg = "";
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        statusMsg = chgLng.htrNotProcess;
        return "historycard-order-status-not";
      case "Processing":
        statusMsg = chgLng.htrProcessing;
        return "historycard-order-status-processing";
      case "Completed":
        statusMsg = chgLng.htrCompleted;
        return "historycard-order-status-Completed";
      case "Cancelled":
        statusMsg = chgLng.htrCancelled;
        return "historycard-order-status-Cancelled";
    }
  };

  return (
    <div className="div-wrap">
      <div className="div-head">{chgLng.htrHistory}</div>
      <div className="div-content">
        <div className="div-content-box">
          <div className="historycard">
            {sortedProducts?.map((item, index) => {
              let orderStatusData = {};
              try {
                orderStatusData = item.orderStatus ? JSON.parse(item.orderStatus) : {};
              } catch (error) {
                orderStatusData = {};
              }

              return (
                <div key={index + 1}>
                  <div className="historycard-product-table-space"></div>
                  <div className="historycard-table">
                    <div className="historycard-table-header">
                      <div>
                        <div>{chgLng.htrOrderDate}</div>
                        <div className="historycard-font-date">{dateFormat(item.createdAt)}</div>
                      </div>
                      <div>
                        {/* <span className="">หมายเลขพัสดุ: {orderStatusData.parcelNumber || "ยังไม่มีหมายเลขพัสดุ"} </span>  */}
                        <span className={`${getStatusColor(orderStatusData.status || item.orderStatus)} historycard-order-status`}>
                          {statusMsg || "ไม่ระบุ"}
                        </span>
                        {orderStatusData?.status === "Completed" ? <div className="historycard-order-parcel-number">หมายเลขพัสดุ: {orderStatusData.parcelNumber || "ยังไม่มีหมายเลขพัสดุ"} </div> : ""}
                      </div>
                    </div>
                    <div className="historycard-product-table-wrap">
                      <table className="historycard-product-table">
                        <thead>
                          <tr className="historycard-product-table-header">
                            <th className="historycard-product-table-th">{chgLng.htrProducts}</th>
                            <th className="historycard-product-table-th">{chgLng.htrPrice}</th>
                            <th className="historycard-product-table-th">{chgLng.htrQuantity}</th>
                            <th className="historycard-product-table-th">{chgLng.htrTotal}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.products?.map((product, index) => (
                            <tr className="historycard-product-table-tr" key={index}>
                              <td className="historycard-product-table-td">{product.product.title}</td>
                              <td className="historycard-product-table-td">{numberFormat(product.product.price)} {chgLng.moneyUnit}</td>
                              <td className="historycard-product-table-td">{product.count}</td>
                              <td className="historycard-product-table-td">{numberFormat(product.count * product.product.price)} {chgLng.moneyUnit}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <div className="historycard-product-table-total">
                        <span>{chgLng.htrNetTotal}</span>
                        <span>{numberFormat(item.cartTotal)} {chgLng.moneyUnit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="historycard-product-table-space"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
