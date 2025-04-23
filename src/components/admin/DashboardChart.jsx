import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getDailySalesChart } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { Loader } from 'lucide-react';

const DashboardChart = () => {
  const [data, setData] = useState([]);
  const token = useEcomStore((s) => s.token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDailySalesChart(token)
      .then(res => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching recent orders:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="div-main-admin-content">
      <h3 className="admin-title text-xl font-bold">📈 รายงานยอดขายรายวัน (เดือนนี้)</h3>
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <Loader className='w-24 h-24 animate-spin' />
        </div>
      ) : (
        // ปรับแต่งกราฟ
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            style={{
              backgroundColor: "#fff",
              borderRadius: "6px",
              padding: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                color: "#fff",
                borderRadius: "4px",
                // border: "none",
              }}
              labelStyle={{ color: "#333" }}
            />
            <Bar
              type="monotone"
              dataKey="total"
              stroke="#1e90ff"
              fill="#1e90ff"
              barSize={40}
              strokeWidth={3}
              dot={{ r: 5, fill: "#1e90ff", stroke: "#fff", strokeWidth: 2 }}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DashboardChart;
