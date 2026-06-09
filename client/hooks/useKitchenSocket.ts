"use client";

import { useEffect } from "react";
import {
  joinKitchen,
  listenNewOrder,
  listenKitchenAlert,
  offNewOrder,
  offKitchenAlert,
} from "@/services/socket.service";
import type { Order } from "@/types/order";

const RESTAURANT_ID = process.env.NEXT_PUBLIC_RESTAURANT_ID ?? "default";

export function useKitchenSocket(callbacks: {
  onNewOrder?: (order: Order) => void;
  onAlert?: (data: { message: string }) => void;
}) {
  useEffect(() => {
    joinKitchen(RESTAURANT_ID);

    if (callbacks.onNewOrder) {
      listenNewOrder(callbacks.onNewOrder);
    }

    if (callbacks.onAlert) {
      listenKitchenAlert(callbacks.onAlert);
    }

    return () => {
      offNewOrder();
      offKitchenAlert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}