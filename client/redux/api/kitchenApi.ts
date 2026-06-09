import { baseApi } from "./baseApi"
import type { Order, OrderStatus } from "@/types/order"

interface OrdersResponse {
  success: boolean
  data: Order[]
}

interface UpdateStatusResponse {
  success: boolean
  data: Order
}

interface UpdateStatusRequest {
  orderId: string
  status: OrderStatus
}

export const kitchenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getKitchenOrders: builder.query<OrdersResponse, void>({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<UpdateStatusResponse, UpdateStatusRequest>({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
})

export const { useGetKitchenOrdersQuery, useUpdateOrderStatusMutation } = kitchenApi