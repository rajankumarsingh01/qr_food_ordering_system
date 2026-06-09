import { Suspense } from "react";
import OrderTrackingClient from "./OrderTrackingClient";
import Loader from "@/components/shared/Loader";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <OrderTrackingClient />
    </Suspense>
  );
}