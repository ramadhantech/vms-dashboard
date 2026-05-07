"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type ChartItem = {
  name: string;
  visitors: number;
};

type Props = {
  data: ChartItem[];
};

export default function DashboardChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl shadow mt-6">
        <p className="text-gray-400 text-sm">No chart data</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6">
      <h2 className="font-bold mb-4">Visitors Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="visitors" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}