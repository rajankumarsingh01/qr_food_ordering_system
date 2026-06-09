"use client";

import {
  useEffect,
} from "react";

import { toast } from "sonner";

import {
  useSocket,
} from "@/hooks/useSocket";

import {
  listenNewOrder,
} from "@/services/socket.service";

export default function SocketTestPage() {
  useSocket();

  useEffect(() => {
    listenNewOrder(
      (data) => {
        console.log(
          data
        );

        toast.success(
          "New Order Received"
        );
      }
    );
  }, []);

  return (
    <div className="p-10">
      Socket Test Page
    </div>
  );
}