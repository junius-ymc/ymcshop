import React, { useEffect, useState } from "react";
import DashboardStatCards from "./DashboardStatCards";
import { getDashboardStats } from "../../api/admin"; // API ดึงสถิติหลังบ้าน
import useEcomStore from '../../store/ecom-store'

const DashboardShow = () => {
  const token = useEcomStore((state) => state.token);
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    products: 0,
    contacts: 0,
    reviews: 0,
  });

  useEffect(() => {
    getDashboardStats(token)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("❌ Error loading stats:", err);
      });
  }, []);

  return (
    <div className="div-main-admin-content">
      <h2 className="admin-title">📊 Dashboard</h2>
      <DashboardStatCards stats={stats} />
      {/* เพิ่มอย่างอื่นต่อได้ เช่น Chart, Table, Notification */}
    </div>
  );
};


export default DashboardShow;