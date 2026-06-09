import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "@/types/order";

const ORDER_KEY = "qr_current_order";

interface OrderState {
  currentOrder: Order | null;
  currentStatus: OrderStatus | null;
}

const getInitialState = (): OrderState => {
  if (typeof window === "undefined") {
    return { currentOrder: null, currentStatus: null };
  }
  try {
    const saved = localStorage.getItem(ORDER_KEY);
    if (saved) {
      const order = JSON.parse(saved) as Order;
      return { currentOrder: order, currentStatus: order.status };
    }
  } catch {}
  return { currentOrder: null, currentStatus: null };
};

const orderSlice = createSlice({
  name: "order",
  initialState: getInitialState,
  reducers: {
    setCurrentOrder: (state, action: PayloadAction<Order>) => {
      state.currentOrder = action.payload;
      state.currentStatus = action.payload.status;
      if (typeof window !== "undefined") {
        localStorage.setItem(ORDER_KEY, JSON.stringify(action.payload));
      }
    },
    updateOrderStatus: (state, action: PayloadAction<OrderStatus>) => {
      state.currentStatus = action.payload;
      if (state.currentOrder) {
        state.currentOrder.status = action.payload;
        if (typeof window !== "undefined") {
          localStorage.setItem(ORDER_KEY, JSON.stringify(state.currentOrder));
        }
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.currentStatus = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(ORDER_KEY);
      }
    },
  },
});

export const { setCurrentOrder, updateOrderStatus, clearCurrentOrder } =
  orderSlice.actions;
export default orderSlice.reducer;