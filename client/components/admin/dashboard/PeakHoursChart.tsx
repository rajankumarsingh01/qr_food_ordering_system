"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import type { PeakHour } from "@/types/analytics";

interface Props { data: PeakHour[] }

function formatHour(hour: number): string {
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}${ampm}`;
}

export default function PeakHoursChart({ data }: Props) {
  const max = Math.max(...data.map(d => d.totalOrders));
  const formatted = data.map((d) => ({
    hour: formatHour(d._id),
    orders: d.totalOrders,
    isPeak: d.totalOrders === max,
  }));

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Peak hours</h3>
        <span className="text-xs text-gray-400">Today</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={formatted} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f3f3" vertical={false} />
          <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#bbb" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "#bbb" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: "#fff", border: "0.5px solid #ebebeb", borderRadius: 8, fontSize: 12 }}
            formatter={(value) => [value, "Orders"]}
          />
          <Bar dataKey="orders" radius={[4, 4, 0, 0]}
            fill="#e0e7ff"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}