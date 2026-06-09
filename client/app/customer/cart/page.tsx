"use client";

import { toast } from "react-hot-toast";
import { ArrowLeft, ShoppingBag, Tag } from "lucide-react";
import CartItem from "@/components/customer/CartItem";
import { useCart } from "@/hooks/useCart";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { useCreateRazorpayOrderMutation } from "@/redux/api/paymentApi";
import { useRazorpay } from "@/hooks/useRazorpay";
import { useRouter } from "next/navigation";
import { setCurrentOrder } from "@/redux/features/order/orderSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, totalAmount, clearCart } = useCart();
  const router = useRouter();

  const [createOrder, { isLoading: isOrderLoading, isError }] = useCreateOrderMutation();
  const [createPaymentOrder, { isLoading: isPaymentLoading }] = useCreateRazorpayOrderMutation();
  const { openCheckout } = useRazorpay();

  const isLoading = isOrderLoading || isPaymentLoading;

  const handleCheckout = async () => {
    if (cart.tableNumber === null) {
      toast.error("Please scan your table QR code first.");
      return;
    }

    try {
      const orderPayload = {
        tableNumber: cart.tableNumber,
        items: cart.items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          specialNote: item.specialNote,
        })),
      };

      const orderResponse = await createOrder(orderPayload).unwrap();
      const orderId = orderResponse.data._id;

      dispatch(setCurrentOrder(orderResponse.data));

      const paymentResponse = await createPaymentOrder({ orderId }).unwrap();

      await openCheckout({ order: paymentResponse.data, orderId });

      clearCart();
      toast.success("Payment successful!");
      router.push(`/customer/order/${orderId}`);
    } catch (error) {
      const err = error as { message?: string };
      if (err.message === "Payment cancelled by user.") {
        toast.error("Payment cancelled.");
      } else {
        toast.error("Failed to place order. Please try again.");
      }
      console.error(error);
    }
  };

  // ── Empty state ──
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
          <ShoppingBag size={28} className="text-orange-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Your cart is empty</p>
          <p className="text-xs text-gray-400">Add items from the menu to get started</p>
        </div>
        <button
          onClick={() => router.back()}
          className="mt-2 px-5 py-2.5 rounded-2xl bg-orange-500 text-white text-sm font-semibold active:scale-95 transition-transform"
        >
          Browse menu
        </button>
      </div>
    );
  }

  const itemCount = cart.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f0] pb-6">

      {/* ── Header ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">Your cart</h1>
            {cart.tableNumber && (
              <p className="text-[10px] text-gray-400">
                Table {cart.tableNumber} · {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-2.5">

        {/* ── Error banner ── */}
        {isError && (
          <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-xs text-red-600 font-medium">
            Something went wrong. Please try again.
          </div>
        )}

        {/* ── Cart items ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-[#f0f0f0]">
          {cart.items.map((item) => (
            <CartItem key={item.menuItemId} item={item} />
          ))}
        </div>

        {/* ── Bill summary ── */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={13} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-900">Bill summary</span>
          </div>

          <div className="space-y-2 mb-3">
            {cart.items.map((item) => (
              <div key={item.menuItemId} className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500 flex-1 mr-2 truncate">
                  {item.name}
                  <span className="text-gray-300 ml-1">× {item.quantity}</span>
                </span>
                <span className="text-xs text-gray-700 font-medium shrink-0">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-100 pt-3 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-base font-bold text-gray-900">₹{totalAmount}</span>
          </div>
        </div>

        {/* ── Place order ── */}
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-orange-500 rounded-2xl px-5 py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-white active:scale-[0.98] transition-transform disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <ShoppingBag size={15} />
              Place order · ₹{totalAmount}
            </>
          )}
        </button>

      </div>
    </div>
  );
}