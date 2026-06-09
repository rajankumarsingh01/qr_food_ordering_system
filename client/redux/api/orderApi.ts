





import { baseApi } from "./baseApi";
import type { Order, OrderStatus } from "@/types/order";

interface CreateOrderRequest {
  tableNumber: number;
  items: {
    menuItemId: string;
    quantity: number;
    specialNote?: string;
  }[];
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface CancelOrderResponse {
  success: boolean;
  data: {
    order: Order;
    refund: {
      refundId: string;
      amount: number;
      status: string;
    } | null;
  };
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      ApiResponse<Order>,
      CreateOrderRequest
    >({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    getOrderById: builder.query<
      ApiResponse<Order>,
      string
    >({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [
        { type: "Order", id },
      ],
    }),

    getOrders: builder.query<
      ApiResponse<Order[]>,
      void
    >({
      query: () => "/orders",
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation<
      ApiResponse<Order>,
      { id: string; status: OrderStatus }
    >({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrder: builder.mutation<ApiResponse<object>, string>({
  query: (id) => ({
    url: `/orders/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Order"],
}),

    cancelOrder: builder.mutation<
      CancelOrderResponse,
      string
    >({
      query: (orderId) => ({
        url: `/orders/${orderId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
} = orderApi;