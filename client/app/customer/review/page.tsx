import { Suspense } from "react";
import ReviewClient from "./ReviewClient";
import Loader from "@/components/shared/Loader";

export default function ReviewPage() {
  return (
    <Suspense fallback={<Loader />}>
      <ReviewClient />
    </Suspense>
  );
}