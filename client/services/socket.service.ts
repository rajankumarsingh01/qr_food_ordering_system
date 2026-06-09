import { socket } from "@/lib/socket";
import type { Order } from "@/types/order";

// ─── Room Joins ───────────────────────────────────────────────
export const joinTable = (tableId: string, tableNumber: number) => {
  socket.emit("join_table", { tableId, tableNumber });
};

export const joinAdmin = (restaurantId: string) => {
  socket.emit("join_admin", { restaurantId });
};

export const joinKitchen = (restaurantId: string) => {
  socket.emit("join_kitchen", { restaurantId });
};

// ─── Listeners ────────────────────────────────────────────────
export const listenNewOrder = (callback: (order: Order) => void) => {
  socket.off("new_order"); // prevent duplicate listeners
  socket.on("new_order", callback);
};

export const listenOrderStatus = (
  callback: (data: { status: string; orderId: string }) => void
) => {
  socket.off("order_status_update");
  socket.on("order_status_update", callback);
};

export const listenPaymentConfirmed = (
  callback: (data: { orderId: string }) => void
) => {
  socket.off("payment_confirmed");
  socket.on("payment_confirmed", callback);
};

export const listenKitchenAlert = (
  callback: (data: { message: string }) => void
) => {
  socket.off("kitchen_alert");
  socket.on("kitchen_alert", callback);
};

// ─── Cleanup (individual) ─────────────────────────────────────
export const offNewOrder = () => socket.off("new_order");
export const offOrderStatus = () => socket.off("order_status_update");
export const offPaymentConfirmed = () => socket.off("payment_confirmed");
export const offKitchenAlert = () => socket.off("kitchen_alert");

// ─── Remove all (use carefully — only when full cleanup needed) ─
export const removeAllListeners = () => {
  socket.off("new_order");
  socket.off("order_status_update");
  socket.off("payment_confirmed");
  socket.off("kitchen_alert");
};