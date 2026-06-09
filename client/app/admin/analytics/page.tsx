import { Suspense } from "react";
import AnalyticsClient from "./AnalyticsClient";
import Loader from "@/components/shared/Loader";

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <AnalyticsClient />
    </Suspense>
  );
}