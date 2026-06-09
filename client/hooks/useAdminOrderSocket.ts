"use client";

import { useEffect } from "react";
import { joinAdmin, listenNewOrder, listenOrderStatus, offNewOrder, offOrderStatus } from "@/services/socket.service";
import type { Order } from "@/types/order";

const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID ?? "default";

/**
 * Use in admin orders page.
 * Joins admin socket room and fires callbacks on new order / status update.
 */
export function useAdminOrderSocket(callbacks: {
  onNewOrder?: (order: Order) => void;
  onStatusUpdate?: (data: { orderId: string; status: string }) => void;
}) {
  useEffect(() => {
    joinAdmin(RESTAURANT_ID);

    if (callbacks.onNewOrder) {
      listenNewOrder(callbacks.onNewOrder);
    }

    if (callbacks.onStatusUpdate) {
      listenOrderStatus(callbacks.onStatusUpdate);
    }

    return () => {
      offNewOrder();
      offOrderStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}