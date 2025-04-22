import React, { useEffect, useState } from "react";
import DashboardStatCards from "./DashboardStatCards";
import { getDashboardStats } from "../../api/admin"; // API ดึงสถิติหลังบ้าน
import useEcomStore from '../../store/ecom-store';
import LoaderDiv from "../LoaderDiv";
import RecentOrders from "./RecentOrders";

const DashboardShow = () => {
  const token = useEcomStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    products: 0,
    contacts: 0,
    reviews: 0,
  });

  useEffect(() => {
    setLoading(true);
    getDashboardStats(token)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("❌ Error loading stats:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="div-main-admin-content">
      <h2 className="admin-title">📊 Dashboard</h2>
      {loading ? (
        <div><LoaderDiv /></div>
      ) : (
        <>
          <DashboardStatCards stats={stats} />
        </>
      )}
      <RecentOrders />
    </div>
  );
};


export default DashboardShow;