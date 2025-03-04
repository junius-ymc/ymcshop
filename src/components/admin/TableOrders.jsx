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
        return "bg-blue-400 text-white";
      case "Completed":
        return "bg-green-400 text-white";
      case "Cancelled":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="container mx-auto bg-white shadow-lg rounded-lg">
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">ลำดับ</th>
              <th className="p-3 border">ผู้ใช้งาน</th>
              <th className="p-3 border">วันที่</th>
              <th className="p-3 border">สินค้า</th>
              <th className="p-3 border">รวม</th>
              <th className="p-3 border">สถานะ</th>
              <th className="p-3 border">หมายเลขพัสดุ</th>
              <th className="p-3 border">จัดการ</th>
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
                <tr key={item.id} className="hover:bg-gray-50 border-b">
                  <td className="p-3 text-center">{item.id}-({index + 1})</td>
                  <td className="p-3">
                    <p className="font-semibold">{`${nameData.fullName || "N/A"}`}</p>
                    <p className="text-sm text-gray-600">
                      {`${addressData.houseNo || ""} ${addressData.district || ""} ${addressData.city || ""} ${addressData.province || ""} ${addressData.zipCode || ""}`.trim() || "N/A"}
                    </p>
                    <p className="font-semibold">{nameData.phone || "N/A"}</p>
                    <p className="text-xs text-gray-500">{item.orderedBy.email}</p>
                  </td>
                  <td className="p-3">{dateFormat(item.createdAt)}</td>
                  <td className="p-3">
                    <ul>
                      {item.products?.map((product, index) => (
                        <li key={index} className="text-sm">
                          {product.product.title} <span className="text-gray-600">{product.count} x {numberFormat(product.product.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 font-semibold">{numberFormat(item.cartTotal)}</td>
                  <td className="p-3">
                    <select
                      className="border rounded p-2 text-gray-700"
                      value={orderData[item.id]?.status || orderStatusData.status || item.orderStatus}
                      onChange={(e) => handleInputChange(item.id, "status", e.target.value)}
                    >
                      <option>Not Process</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                    <span className={`px-3 py-1 rounded-full text-nowrap ${getStatusColor(orderData[item.id]?.status || orderStatusData.status || item.orderStatus)}`}>
                    {orderData[item.id]?.status || orderStatusData.status || item.orderStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <input
                      name="parcelNumber"
                      placeholder="หมายเลขพัสดุ"
                      value={orderData[item.id]?.parcelNumber || orderStatusData.parcelNumber || ""}
                      onChange={(e) => handleInputChange(item.id, "parcelNumber", e.target.value)}
                      className="border p-2 rounded w-full"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleUpdateOrder(item.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
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
