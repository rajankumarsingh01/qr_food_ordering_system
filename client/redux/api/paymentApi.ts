import { baseApi } from "./baseApi";
import type { RazorpayOrder } from "@/types/payment";


interface CreateRazorpayOrderRequest {
  orderId: string    // ← yeh add karo

}

interface VerifyPaymentRequest {
  orderId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRazorpayOrder: builder.mutation<ApiResponse<RazorpayOrder>, CreateRazorpayOrderRequest>({
      query: (data) => ({
        url: "/payment/create-order",
        method: "POST",
        body: data,
      }),
    }),
    verifyPayment: builder.mutation<ApiResponse<{ success: boolean }>, VerifyPaymentRequest>({
      query: (data) => ({
        url: "/payment/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateRazorpayOrderMutation,
  useVerifyPaymentMutation,
} = paymentApi;