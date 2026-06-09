"use client";

import { CheckCircle, UtensilsCrossed, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const order = useAppSelector((state) => state.order.currentOrder);

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-2.5">

        {/* ── Success card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 px-5 py-8 flex flex-col items-center text-center">

          {/* Animated check */}
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
            <CheckCircle size={32} className="text-green-500" strokeWidth={1.5} />
          </div>

          <h1 className="text-lg font-semibold text-gray-900 mb-1">
            Payment successful
          </h1>
          <p className="text-xs text-gray-400 leading-relaxed">
            Your order has been placed and the kitchen has been notified.
          </p>

          {/* Order summary pill */}
          {order && (
            <div className="mt-5 w-full bg-[#f5f5f0] rounded-xl px-4 py-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400">Order ID</span>
                <span className="text-[10px] font-medium text-gray-700 font-mono">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400">Table</span>
                <span className="text-[10px] font-medium text-gray-700">
                  Table {order.tableNumber}
                </span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-900">Total paid</span>
                <span className="text-xs font-bold text-gray-900">₹{order.totalAmount}</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Track order CTA ── */}
        {order && (
          <button
            onClick={() => router.push(`/customer/order/${order._id}`)}
            className="w-full bg-orange-500 rounded-2xl px-5 py-3.5 flex items-center justify-between active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <UtensilsCrossed size={16} className="text-orange-200" />
              <span className="text-sm font-semibold text-white">Track your order</span>
            </div>
            <ArrowRight size={16} className="text-orange-200" />
          </button>
        )}

        {/* ── Back to menu ── */}
        <button
          onClick={() => router.push("/customer/menu")}
          className="w-full bg-white rounded-2xl border border-gray-100 px-5 py-3 text-sm font-medium text-gray-500 active:scale-[0.98] transition-transform"
        >
          Back to menu
        </button>

      </div>
    </div>
  );
}