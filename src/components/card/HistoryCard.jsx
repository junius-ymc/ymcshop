import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";
import { useTranslation } from "react-i18next"; // ✅ เพิ่มตัวช่วยแปลภาษา
import LoaderDiv from "../LoaderDiv";
import IconHistory from "../icon/IconHistory";
import { Helmet } from "react-helmet-async";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const { t } = useTranslation(); // ✅ ใช้ตัวช่วยแปลภาษา
  const [loading, setLoading] = useState(true); // เพิ่มตัวแปร Loading
  const sortedProducts = [...orders].sort((a, b) => b.id - a.id);   // เรียงลำดับผลลัพท์จากใหม่ไปเก่า

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    setLoading(true); // เริ่มโหลด
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // โหลดเสร็จ
      });
  };

  let statusMsg = "";
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        statusMsg = t("htrNotProcess");
        return "historycard-order-status-not";
      case "Processing":
        statusMsg = t("htrProcessing");
        return "historycard-order-status-processing";
      case "Completed":
        statusMsg = t("htrCompleted");
        return "historycard-order-status-Completed";
      case "Cancelled":
        statusMsg = t("htrCancelled");
        return "historycard-order-status-Cancelled";
    }
  };

  return (
    <div className="div-wrap">
      <Helmet>
        <title>{t("htrHistory")} | {t("shopName")}</title>
      </Helmet>
      <div className="div-head">
        <span className="setdiv-3">
          <IconHistory className="icon-register" />
          {t("htrHistory")}
        </span>
      </div>
      <div className="div-content">
          {loading ? (
            // ✅ เริ่ม แสดง Loader
            <LoaderDiv />
            // ✅ จบ แสดง Loader
          ) : (
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
                    <div className="historycard-table">
                      <div className="historycard-table-header">
                        <div>
                          <div>{t("htrOrderDate")}</div>
                          <div className="historycard-font-date">{dateFormat(item.createdAt)}</div>
                        </div>
                        <div>
                          {/* <span className="">หมายเลขพัสดุ: {orderStatusData.parcelNumber || "ยังไม่มีหมายเลขพัสดุ"} </span>  */}
                          <span className={`${getStatusColor(orderStatusData.status || item.orderStatus)} historycard-order-status`}>
                            {statusMsg || "ไม่ระบุ"}
                          </span>
                          {orderStatusData?.status === "Completed" ? <div className="historycard-order-parcel-number">{t("htrParcelNumber")} {orderStatusData.parcelNumber || "???"} </div> : ""}
                        </div>
                      </div>
                      <div className="historycard-product-table-wrap">
                        <table className="historycard-product-table">
                          <thead>
                            <tr className="historycard-product-table-header">
                              <th className="historycard-product-table-th">{t("htrProducts")}</th>
                              <th className="historycard-product-table-th">{t("htrPrice")}</th>
                              <th className="historycard-product-table-th">{t("htrQuantity")}</th>
                              <th className="historycard-product-table-th">{t("htrTotal")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.products?.map((product, index) => (
                              <tr className="historycard-product-table-tr" key={index}>
                                <td className="historycard-product-table-td">{product.product.title}</td>
                                <td className="historycard-product-table-td">{numberFormat(product.product.price)} {t("moneyUnit")}</td>
                                <td className="historycard-product-table-td">{product.count}</td>
                                <td className="historycard-product-table-td">{numberFormat(product.count * product.product.price)} {t("moneyUnit")}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <div className="historycard-product-table-total">
                          <span>{t("htrNetTotal")}</span>
                          <span>{numberFormat(item.cartTotal)} {t("moneyUnit")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="historycard-product-table-space"></div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
  );
};

export default HistoryCard;
