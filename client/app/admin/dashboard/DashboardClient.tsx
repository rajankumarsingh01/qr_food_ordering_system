"use client";

import { IndianRupee, ShoppingBag, Clock, Table2 } from "lucide-react";
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

  // Today's stats from revenue data
  const today = new Date().toISOString().slice(0, 10);
  const todayStats = revenueData?.data.find((d) => d._id === today);
  const totalRevenue = revenueData?.data.reduce((sum, d) => sum + d.totalRevenue, 0) ?? 0;
  const totalOrders = revenueData?.data.reduce((sum, d) => sum + d.totalOrders, 0) ?? 0;

  const isLoading = revenueLoading || itemsLoading || peakLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin</p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          icon={IndianRupee}
          color="green"
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="blue"
        />
        <StatsCard
          title="Today's Revenue"
          value={`₹${(todayStats?.totalRevenue ?? 0).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          color="orange"
        />
        <StatsCard
          title="Today's Orders"
          value={todayStats?.totalOrders ?? 0}
          icon={Clock}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {revenueData?.data && <RevenueChart data={revenueData.data} />}
        {peakData?.data && <PeakHoursChart data={peakData.data} />}
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {topItemsData?.data && <TopSellingItems data={topItemsData.data} />}
        <LiveOrdersFeed />
      </div>
    </div>
  );
}