import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [orderData, setOrderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // เรียงลำดับผลลัพท์จากใหม่ไปเก่า
  const sortedProducts = [...orders].sort((a, b) => b.id - a.id);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateOrder = (orderId) => {
    const { status, parcelNumber } = orderData[orderId] || {};
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    let updatedOrderStatus;
    try {
      updatedOrderStatus = order.orderStatus ? JSON.parse(order.orderStatus) : {};
    } catch (error) {
      updatedOrderStatus = {};
    }

    updatedOrderStatus.status = status || order.orderStatus;
    updatedOrderStatus.parcelNumber = parcelNumber || "";

    changeOrderStatus(token, orderId, JSON.stringify(updatedOrderStatus))
      .then(() => {
        toast.success("Order Updated!");
        handleGetOrder(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (orderId, field, value) => {
    setOrderData((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], [field]: value },
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-300 text-gray-700";
      case "Processing":
        return "bg-yellow-400 text-white";
      case "Completed":
        return "bg-green-400 text-white";
      case "Cancelled":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-200";
    }
  };

  if (isLoading) return <p className="text-center"><br /><strong>... Loading ...</strong></p>;

  return (
    <div>
      <div className="div-main-admin-content">
        <table className="admin-table-orders">
          <thead className="admin-table-thead-orders">
            <tr>
              <th className="admin-table-th-orders">ลำดับ</th>
              <th className="admin-table-th-orders">ผู้ใช้งาน</th>
              <th className="admin-table-th-orders">วันที่</th>
              <th className="admin-table-th-orders">สินค้า</th>
              <th className="admin-table-th-orders">รวม</th>
              <th className="admin-table-th-orders">สถานะ</th>
              <th className="admin-table-th-orders">หมายเลขพัสดุ</th>
              <th className="admin-table-th-orders">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((item, index) => {
              let nameData, addressData, orderStatusData;
              try {
                nameData = JSON.parse(item.orderedBy.name || "{}");
                addressData = JSON.parse(item.orderedBy.address || "{}");
                orderStatusData = item.orderStatus ? JSON.parse(item.orderStatus) : {};
              } catch (error) {
                nameData = {};
                addressData = {};
                orderStatusData = {};
              }

              return (
                <tr key={item.id} className="admin-table-tr-orders">
                  <td className="admin-table-td-orders text-xs">{item.id}-({index + 1})</td>
                  <td className="admin-table-td-orders">
                    <p className="font-semibold">{`${nameData.fullName || "N/A"}`}</p>
                    <p className="text-sm text-gray-600">
                      {`${addressData.houseNo || ""} ${addressData.district || ""} ${addressData.city || ""} ${addressData.province || ""} ${addressData.zipCode || ""}`.trim() || "N/A"}
                    </p>
                    <p className="font-semibold">{nameData.phone || "N/A"}</p>
                    <p className="text-xs text-gray-500">{item.orderedBy.email}</p>
                  </td>
                  <td className="admin-table-td-orders text-xs">{dateFormat(item.createdAt)}</td>
                  <td className="admin-table-td-orders">
                    <ul>
                      {item.products?.map((product, index) => (
                        <li key={index} className="text-sm">
                          {product.product.title} <span className="text-gray-600 text-xs">{product.count} x {numberFormat(product.product.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="admin-table-td-orders text-xs font-semibold">{numberFormat(item.cartTotal)}</td>
                  <td className="admin-table-td-orders">
                    <select
                      className="form-input my-1 text-xs"
                      value={orderData[item.id]?.status || orderStatusData.status || item.orderStatus}
                      onChange={(e) => handleInputChange(item.id, "status", e.target.value)}
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                    <span className={`text-xs admin-table-td-orders py-1 rounded-full text-nowrap ${getStatusColor(orderData[item.id]?.status || orderStatusData.status || item.orderStatus)}`}>
                      {orderData[item.id]?.status || orderStatusData.status || item.orderStatus}
                    </span>
                  </td>
                  <td className="admin-table-td-orders">
                    <input
                      name="parcelNumber"
                      placeholder="หมายเลขพัสดุ"
                      value={orderData[item.id]?.parcelNumber || orderStatusData.parcelNumber || ""}
                      onChange={(e) => handleInputChange(item.id, "parcelNumber", e.target.value)}
                      className="form-input text-xs"
                    />
                  </td>
                  <td className="admin-table-td-orders">
                    <button
                      onClick={() => handleUpdateOrder(item.id)}
                      className="bttn btn-mod-1 btn-admin-style text-xs"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
