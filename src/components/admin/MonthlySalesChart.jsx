import React, { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getMonthlySales } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import LoaderDiv from "../LoaderDiv";

const MonthlySalesChart = () => {
  const token = useEcomStore((state) => state.token);
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    if (!token) return;
    getMonthlySales(token)
      .then((res) => {
        const formatted = res.data.map((item) => ({
          // month: item.month,  // เอาชื่อตรงๆจาก backend
          month: new Date(2025, item.month, 1).toLocaleString("th-TH", { month: "short" }),
          total: item.total,
        }));
        setMonthlySales(formatted);
      })
      .catch((err) => console.error("❌ Error loading monthly sales:", err))
      .finally(() => setLoading(false));
  }, [token]);

  // console.log(monthlySales)

  const renderChart = () => {
    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlySales}
            style={{
              backgroundColor: "#fff",
              borderRadius: "6px",
              padding: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#1e90ff" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={monthlySales}
            style={{
              backgroundColor: "#fff",
              borderRadius: "6px",
              padding: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#1e90ff" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="div-main-admin-content">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">ยอดขายรายเดือน (Monthly Sales)</h3>
        <button
          className="bttn btn-mod-1 btn-admin-style"
          onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}
        >
          เปลี่ยนเป็น {chartType === "bar" ? "กราฟเส้น" : "กราฟแท่ง"}
        </button>
      </div>
      {loading ? <LoaderDiv /> : renderChart()}
    </div>
  );
};

export default MonthlySalesChart;
