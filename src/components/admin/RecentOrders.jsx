import React, { useEffect, useState } from "react";
import { getRecentOrders } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { Loader } from 'lucide-react';

const RecentOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRecentOrders(token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching recent orders:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const parseOrderStatus = (orderStatus) => {
    try {
      const parsed = typeof orderStatus === "string" ? JSON.parse(orderStatus) : orderStatus;
      return parsed.status || orderStatus;
    } catch {
      return orderStatus; // fallback เป็น string เดิม
    }
  };

  const parseUserName = (name) => {
    try {
      const parsed = typeof name === "string" ? JSON.parse(name) : name;
      return parsed;
    } catch {
      return { fullName: "Unknown", phone: "-" };
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Not Process":
        return "status-not-process";
      case "Processing":
        return "status-processing";
      case "Completed":
        return "status-completed";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  // console.log(orders);

  return (
    <div className="div-main-admin-content">
      <h3 className="admin-title text-xl font-bold">🧾 รายการสั่งซื้อ 5 รายการล่าสุด</h3>
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <Loader className='w-24 h-24 animate-spin' />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="admin-table-orders">
            <thead className="admin-table-thead-orders">
              <tr>
                <th className="admin-table-th-orders">#</th>
                <th className="admin-table-th-orders">ชื่อผู้สั่ง</th>
                {/* <th className="admin-table-th-orders">Email</th> */}
                <th className="admin-table-th-orders">ยอดรวม</th>
                <th className="admin-table-th-orders">สถานะ</th>
                <th className="admin-table-th-orders">วันที่</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const status = parseOrderStatus(order.orderStatus);
                const { fullName, phone } = parseUserName(order.orderedBy?.name);

                return (
                  <tr key={order.id} className="admin-table-tr-orders">
                    <td className="admin-table-td-orders text-xs">{index + 1}</td>
                    <td className="admin-table-td-orders">{fullName}<br /><span className="text-xs text-gray-500">{phone}</span></td>
                    {/* <td className="admin-table-td-orders text-xs">{order.orderedBy?.email}</td> */}
                    <td className="admin-table-td-orders">{order.cartTotal} ฿.</td>
                    <td className="admin-table-td-orders">
                      <span className={`order-status-tag ${getStatusClass(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="admin-table-td-orders text-xs">{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;
