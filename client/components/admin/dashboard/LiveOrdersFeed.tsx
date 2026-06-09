"use client";

import { useEffect, useState } from "react";
import { listenNewOrder } from "@/services/socket.service";
import type { Order } from "@/types/order";

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return "just now";
  return `${Math.floor(s / 60)}m ago`;
}

const statusStyle: Record<string, string> = {
  received:  "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  preparing: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  ready:     "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  served:    "bg-gray-50 text-gray-500",
  cancelled: "bg-red-50 text-red-600",
};

export default function LiveOrdersFeed() {
  const [orders, setOrders] = useState<(Order & { receivedAt: Date })[]>([]);

  useEffect(() => {
    listenNewOrder((data: unknown) => {
      const order = data as Order;
      setOrders((prev) => [{ ...order, receivedAt: new Date() }, ...prev.slice(0, 9)]);
    });
  }, []);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live orders</h3>
        </div>
        <span className="text-xs text-gray-400">Real-time</span>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-300">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2" viewBox="0 0 24 24">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <p className="text-xs">Waiting for new orders...</p>
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => (
            <div key={`${order._id}-${order.receivedAt.getTime()}`}
              className="flex items-center justify-between px-3 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-gray-900 dark:text-white">Table #{order.tableNumber}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{timeAgo(order.receivedAt)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-orange-500">₹{order.totalAmount}</p>
                <span className={`mt-0.5 inline-block px-2 py-0.5 rounded-full text-[10px] ${statusStyle[order.status] ?? "bg-gray-100 text-gray-500"}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}