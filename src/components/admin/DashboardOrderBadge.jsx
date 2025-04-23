// 📁 components/admin/DashboardOrderBadge.jsx
import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import axios from "axios";
import { Loader } from 'lucide-react';

const DashboardOrderBadge = () => {
  const token = useEcomStore((state) => state.token);
  const [pendingCount, setPendingCount] = useState(0);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const pendingOrders = res.data.filter(
          (order) => {
            const status = order.orderStatus;
            return status === "Not Process" ||
              (status && typeof status === "string" && status.includes("Not Process"));
          }
        );
        setPendingCount(pendingOrders.length);
      })
      .catch((err) => {
        console.error("❌ Failed to load orders:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="order-badge-box">
      <h4 className="order-badge-title">คำสั่งซื้อใหม่ 📦</h4>
      {loading ? (
        <div><Loader /></div>
      ) : (
        <div className="order-badge-content">
          {pendingCount > 0 ? (
            <span className="badge-active">{pendingCount} รายการที่ยังไม่จัดการ</span>
          ) : (
            <span className="badge-none">ไม่มีคำสั่งซื้อใหม่</span>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardOrderBadge;
