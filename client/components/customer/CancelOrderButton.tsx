"use client";

import { useState } from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCancelOrderMutation } from "@/redux/api/orderApi";
import type { OrderStatus } from "@/types/order";

interface CancelOrderButtonProps {
  orderId: string;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed";
  totalAmount: number;
}

export default function CancelOrderButton({
  orderId,
  status,
  paymentStatus,
  totalAmount,
}: CancelOrderButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  // Sirf "received" pe show karo
  if (status !== "received") return null;

  const handleCancel = async () => {
    try {
      const result = await cancelOrder(orderId).unwrap();
      setShowModal(false);

      if (result.data.refund) {
        toast.success(
          `Order cancelled! ₹${totalAmount} refund initiated — credited in 5-7 working days.`,
          { duration: 6000 }
        );
      } else {
        toast.success("Order cancelled successfully.");
      }
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error.data?.message ?? "Failed to cancel order.");
    }
  };

  return (
    <>
      {/* Cancel Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30"
      >
        Cancel Order
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                  <AlertTriangle size={20} className="text-red-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cancel Order?
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to cancel this order?
            </p>

            {paymentStatus === "paid" ? (
              <div className="mb-4 rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  💰 Refund of ₹{totalAmount} will be initiated
                </p>
                <p className="mt-0.5 text-xs text-green-600 dark:text-green-500">
                  Amount credited to your account in 5-7 working days
                </p>
              </div>
            ) : (
              <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No payment was made — order will be cancelled directly.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Keep Order
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}