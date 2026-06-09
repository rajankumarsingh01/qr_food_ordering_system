"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateOrderStatus } from "@/redux/features/order/orderSlice";
import {
  joinTable,
  listenOrderStatus,
  listenPaymentConfirmed,
  offOrderStatus,
  offPaymentConfirmed,
} from "@/services/socket.service";
import type { OrderStatus } from "@/types/order";

interface UseOrderSocketOptions {
  tableId?: string;
  tableNumber?: number;
  orderId?: string;
}

export function useOrderSocket(options: UseOrderSocketOptions = {}) {
  const dispatch = useAppDispatch();
  const { tableId, tableNumber, orderId } = options;

  useEffect(() => {
    // Join table room so backend can emit to this customer
    if (tableId && tableNumber !== undefined) {
      joinTable(tableId, tableNumber);
    }

    // Listen for status updates — filter by orderId if provided
    listenOrderStatus((data) => {
      const payload = data as { status: OrderStatus; orderId?: string };
      // If orderId provided, only update if it matches
      if (orderId && payload.orderId && payload.orderId !== orderId) return;
      dispatch(updateOrderStatus(payload.status));
    });

    // Listen for payment confirmation
    listenPaymentConfirmed((data) => {
      const payload = data as { orderId: string };
      console.log("Payment confirmed:", payload.orderId);
    });

    return () => {
      offOrderStatus();
      offPaymentConfirmed();
    };
  }, [dispatch, tableId, tableNumber, orderId]);
}