"use client";

import { useMemo, useState } from "react";
import { Star, CreditCard, Table2, TrendingUp } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import Loader from "@/components/shared/Loader";
import { useGetRevenueAnalyticsQuery } from "@/redux/api/analyticsApi";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { useGetReviewsQuery } from "@/redux/api/reviewApi";
import type { Order } from "@/types/order";
import type { Review } from "@/types/review";

// ── Helpers ────────────────────────────────────────────────────────

const RANGE_OPTIONS = [
  { label: "7 days",  value: 7  },
  { label: "30 days", value: 30 },
  { label: "90 days", value: 90 },
] as const;

const STATUS_COLORS: Record<string, string> = {
  received:  "#3b82f6",
  preparing: "#f59e0b",
  ready:     "#22c55e",
  served:    "#6b7280",
};

const PAYMENT_COLORS: Record<string, string> = {
  paid:    "#22c55e",
  pending: "#f59e0b",
  failed:  "#ef4444",
};

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-[#f0f0f0]">
        <p className="text-xs font-semibold text-gray-900">{title}</p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function KpiCard({
  label, value, sub, icon: Icon, iconBg,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconBg: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${iconBg}`}>
        <Icon size={15} className="text-white" />
      </div>
      <p className="text-[10px] text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
      {sub && <p className="text-[10px] text-green-500 mt-1">{sub}</p>}
    </div>
  );
}

// ── Custom tooltip ─────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, prefix = "" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs shadow-none">
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="font-semibold text-gray-900">
          {prefix}{typeof p.value === "number" ? p.value.toLocaleString("en-IN") : p.value}
        </p>
      ))}
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────
export default function AnalyticsClient() {
  const [range, setRange] = useState<7 | 30 | 90>(7);

  const { data: revenueData, isLoading: rLoading } = useGetRevenueAnalyticsQuery();
  const { data: ordersData,  isLoading: oLoading  } = useGetOrdersQuery();
  const { data: reviewsData, isLoading: rvLoading } = useGetReviewsQuery();

  const isLoading = rLoading || oLoading || rvLoading;
  if (isLoading) return <Loader />;

  const orders:  Order[]  = ordersData?.data  ?? [];
  const reviews: Review[] = reviewsData?.data ?? [];
  const revenue           = revenueData?.data  ?? [];

  // ── Revenue with date range filter ──
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - range);
  const filteredRevenue = revenue
    .filter((d) => new Date(d._id) >= cutoff)
    .map((d) => ({
      date:    d._id.slice(5),           // "MM-DD"
      revenue: d.totalRevenue,
      orders:  d.totalOrders,
    }));

  // ── Orders by status ──
  const statusCount = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {});
  const statusData = Object.entries(statusCount).map(([name, value]) => ({ name, value }));

  // ── Payment breakdown ──
  const paymentCount = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.paymentStatus] = (acc[o.paymentStatus] ?? 0) + 1;
    return acc;
  }, {});
  const paymentData = Object.entries(paymentCount).map(([name, value]) => ({ name, value }));

  // ── Table performance ──
  const tableMap = orders.reduce<Record<number, { orders: number; revenue: number }>>((acc, o) => {
    if (!acc[o.tableNumber]) acc[o.tableNumber] = { orders: 0, revenue: 0 };
    acc[o.tableNumber].orders  += 1;
    acc[o.tableNumber].revenue += o.totalAmount;
    return acc;
  }, {});
  const tableData = Object.entries(tableMap)
    .map(([table, stats]) => ({ table: `T${table}`, ...stats }))
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 8);

  // ── Rating distribution ──
  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star: `${star}★`,
    count: reviews.filter((r) => r.rating === star).length,
  }));
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";
  const completionRate = orders.length
    ? Math.round((orders.filter((o) => o.status === "served").length / orders.length) * 100)
    : 0;
  const failedPayments = orders.filter((o) => o.paymentStatus === "failed").length;

  const dateLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long",
  });

  return (
    <div className="min-h-screen bg-[#f5f5f0]">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">Analytics</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">{dateLabel}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-5">

        {/* ── KPI row ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          <KpiCard
            label="Avg rating"
            value={avgRating}
            sub={`${reviews.length} reviews`}
            icon={Star}
            iconBg="bg-orange-500"
          />
          <KpiCard
            label="Completion rate"
            value={`${completionRate}%`}
            sub={`${orders.filter((o) => o.status === "served").length} served`}
            icon={TrendingUp}
            iconBg="bg-green-500"
          />
          <KpiCard
            label="Failed payments"
            value={failedPayments}
            sub={failedPayments === 0 ? "All clear" : "Needs attention"}
            icon={CreditCard}
            iconBg={failedPayments > 0 ? "bg-red-500" : "bg-gray-400"}
          />
          <KpiCard
            label="Busiest table"
            value={tableData[0] ? `Table ${tableData[0].table.slice(1)}` : "—"}
            sub={tableData[0] ? `${tableData[0].orders} orders` : undefined}
            icon={Table2}
            iconBg="bg-blue-500"
          />
        </div>

        {/* ── Revenue trend ── */}
        <SectionCard title="Revenue trend">
          <div className="flex items-center gap-2 mb-4">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setRange(opt.value as 7 | 30 | 90)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  range === opt.value
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-orange-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={filteredRevenue} barSize={range > 7 ? 6 : 12}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#aaa" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#aaa" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<ChartTooltip prefix="₹" />} />
              <Bar dataKey="revenue" fill="#ea580c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        {/* ── Status + Payment ── */}
        <div className="grid gap-4 lg:grid-cols-2">

          <SectionCard title="Orders by status">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] ?? "#ccc"}
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: 11, color: "#6b7280", textTransform: "capitalize" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </SectionCard>

          <SectionCard title="Payment breakdown">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {paymentData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={PAYMENT_COLORS[entry.name] ?? "#ccc"}
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: 11, color: "#6b7280", textTransform: "capitalize" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* ── Rating distribution ── */}
        <div className="grid gap-4 lg:grid-cols-2">

          <SectionCard title="Rating distribution">
            <div className="flex items-center gap-3 mb-4">
              <p className="text-4xl font-bold text-gray-900">{avgRating}</p>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s <= Math.round(Number(avgRating))
                          ? "text-orange-400 fill-orange-400"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>
                <p className="text-[10px] text-gray-400">{reviews.length} total reviews</p>
              </div>
            </div>
            <div className="space-y-2">
              {ratingDist.map(({ star, count }) => {
                const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 w-5 shrink-0">{star}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 w-6 text-right shrink-0">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* ── Table performance ── */}
          <SectionCard title="Table performance">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={tableData} layout="vertical" barSize={10}>
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#aaa" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  dataKey="table"
                  type="category"
                  tick={{ fontSize: 10, fill: "#aaa" }}
                  axisLine={false}
                  tickLine={false}
                  width={28}
                />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="orders" fill="#ea580c" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </SectionCard>
        </div>

        {/* ── Recent reviews ── */}
        {reviews.length > 0 && (
          <SectionCard title="Recent reviews">
            <div className="divide-y divide-[#f0f0f0]">
              {reviews.slice(0, 5).map((review) => (
                <div key={review._id} className="py-3 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Star size={13} className="text-orange-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={11}
                            className={
                              s <= review.rating
                                ? "text-orange-400 fill-orange-400"
                                : "text-gray-200 fill-gray-200"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">
                        Table {review.tableNumber}
                      </span>
                      <span className="text-[10px] text-gray-300 ml-auto shrink-0">
                        {new Date(review.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short",
                        })}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-xs text-gray-500 leading-relaxed truncate">
                        {review.comment}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

      </div>
    </div>
  );
}