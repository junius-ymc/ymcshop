import React, { useEffect, useState } from "react";
import DashboardStatCards from "./DashboardStatCards";
import { getDashboardStats } from "../../api/admin"; // API ดึงสถิติหลังบ้าน
import useEcomStore from '../../store/ecom-store';
import { Loader } from 'lucide-react';
import RecentOrders from "./RecentOrders";
import DashboardChart from "./DashboardChart";
import SalesChartToggle from "./SalesChartToggle";
import MonthlySalesChart from "./MonthlySalesChart";
import DashboardOrderBadge from "./DashboardOrderBadge";

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
      <h2 className="admin-title text-xl font-bold">📊 Dashboard</h2>
      {loading ? (
        <div><Loader /></div>
      ) : (
        <DashboardStatCards stats={stats} />
      )}
      <div className="mb-8"><DashboardOrderBadge /></div>
      <div className="mb-8"><RecentOrders /></div>
      <div className="mb-8"><DashboardChart /></div>
      <div className="mb-8"><SalesChartToggle /></div>
      <div className="mb-8"><MonthlySalesChart /></div>
    </div>
  );
};


export default DashboardShow;