"use client";

import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import type { RevenueStat } from "@/types/analytics";

interface Props { data: RevenueStat[] }

export default function RevenueChart({ data }: Props) {
  const formatted = data.map((d) => ({
    date: d._id.slice(5),
    revenue: d.totalRevenue,
    orders: d.totalOrders,
  }));

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue trend</h3>
        <span className="text-xs text-gray-400">Last 7 days</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formatted} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f3f3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#bbb" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#bbb" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#fff", border: "0.5px solid #ebebeb", borderRadius: 8, fontSize: 12 }}
            formatter={(value, name) => {
              const num = typeof value === "number" ? value : Number(value) || 0;
              return [name === "revenue" ? `₹${num.toLocaleString("en-IN")}` : num, name === "revenue" ? "Revenue" : "Orders"];
            }}
          />
          <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} dot={false} strokeDasharray="4 4" />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-orange-500 inline-block rounded" /><span className="text-xs text-gray-400">Revenue</span></div>
        <div className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-indigo-500 inline-block rounded border-dashed" /><span className="text-xs text-gray-400">Orders</span></div>
      </div>
    </div>
  );
}