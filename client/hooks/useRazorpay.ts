"use client";

import { loadRazorpayScript } from "@/services/razorpay";
import { useVerifyPaymentMutation } from "@/redux/api/paymentApi";
import type { RazorpayOrder } from "@/types/payment";

interface OpenCheckoutParams {
  order: RazorpayOrder;
  orderId: string;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export function useRazorpay() {
  const [verifyPayment] = useVerifyPaymentMutation();

  const openCheckout = async ({ order, orderId }: OpenCheckoutParams): Promise<void> => {
    const loaded = await loadRazorpayScript();

    if (!loaded) {
      throw new Error("Razorpay script failed to load.");
    }

    return new Promise((resolve, reject) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            await verifyPayment({
              orderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }).unwrap();
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled by user.")),
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  };

  return { openCheckout };
}