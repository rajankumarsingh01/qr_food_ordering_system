"use client";

import { IndianRupee, ShoppingBag, TrendingUp, Clock } from "lucide-react";
import StatsCard from "@/components/admin/dashboard/StatsCard";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import PeakHoursChart from "@/components/admin/dashboard/PeakHoursChart";
import TopSellingItems from "@/components/admin/dashboard/TopSellingItems";
import LiveOrdersFeed from "@/components/admin/dashboard/LiveOrdersFeed";
import {
  useGetRevenueAnalyticsQuery,
  useGetTopItemsQuery,
  useGetPeakHoursQuery,
} from "@/redux/api/analyticsApi";

export default function DashboardClient() {
  const { data: revenueData, isLoading: revenueLoading } = useGetRevenueAnalyticsQuery();
  const { data: topItemsData, isLoading: itemsLoading } = useGetTopItemsQuery();
  const { data: peakData, isLoading: peakLoading } = useGetPeakHoursQuery();

  const today = new Date().toISOString().slice(0, 10);
  const todayStats = revenueData?.data.find((d) => d._id === today);
  const totalRevenue = revenueData?.data.reduce((sum, d) => sum + d.totalRevenue, 0) ?? 0;
  const totalOrders = revenueData?.data.reduce((sum, d) => sum + d.totalOrders, 0) ?? 0;
  const avgOrder = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  if (revenueLoading || itemsLoading || peakLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
          <p className="text-sm text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f7] dark:bg-gray-950 p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-xs text-gray-400 mt-0.5">{dateStr} · {greeting}, Admin</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative w-8 h-8 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 transition">
            <span className="sr-only">Notifications</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs font-semibold">SA</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          icon={IndianRupee}
          color="green"
          sub="All time"
        />
        <StatsCard
          title="Total orders"
          value={totalOrders.toLocaleString("en-IN")}
          icon={ShoppingBag}
          color="blue"
          sub="All time"
        />
        <StatsCard
          title="Today's revenue"
          value={`₹${(todayStats?.totalRevenue ?? 0).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          color="orange"
          sub={`${todayStats?.totalOrders ?? 0} orders today`}
        />
        <StatsCard
          title="Avg order value"
          value={`₹${avgOrder.toLocaleString("en-IN")}`}
          icon={TrendingUp}
          color="red"
          sub="Per order"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {revenueData?.data && <RevenueChart data={revenueData.data} />}
        {peakData?.data && <PeakHoursChart data={peakData.data} />}
      </div>

      {/* Bottom */}
      <div className="grid gap-4 lg:grid-cols-2">
        {topItemsData?.data && <TopSellingItems data={topItemsData.data} />}
        <LiveOrdersFeed />
      </div>
    </div>
  );
}