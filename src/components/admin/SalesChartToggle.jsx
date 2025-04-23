import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDailySales } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { Loader } from 'lucide-react';

const SalesChartToggle = () => {
  const [chartType, setChartType] = useState("line");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useEcomStore((state) => state.token);

  const handleToggle = () => {
    setChartType((prev) => (prev === "line" ? "bar" : "line"));
  };

  useEffect(() => {
    getDailySales(token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching sales data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log(data)

  return (
    <div className="div-main-admin-content">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">📈 Daily Sales (This Month)</h3>
        <button onClick={handleToggle} className="bttn btn-mod-1 btn-admin-style">
          เปลี่ยนเป็น {chartType === "line" ? "กราฟแท่ง" : "กราฟเส้น"}
        </button>
      </div>

      <div className="div-content-box">
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <Loader className='w-24 h-24 animate-spin' />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            {chartType === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="totalSales"
                  stroke="#1e90ff"
                  strokeWidth={2}
                />
              </LineChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalSales" fill="#1e90ff" barSize={40} />
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SalesChartToggle;
