import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
import API from "../services/api";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const SalesChart = () => {
  const [data, setData] = useState([]);

  const fetchSales = async () => {
    const res = await API.get("/dashboard/sales");

    const formatted = res.data.map((item) => ({
      month: monthNames[item._id - 1],
      sales: item.total,
    }));

    setData(formatted);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#1976d2" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalesChart;
