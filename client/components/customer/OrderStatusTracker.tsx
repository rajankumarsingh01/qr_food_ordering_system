import {
  CheckCircle,
  ChefHat,
  CookingPot,
  Utensils,
} from "lucide-react";

import {
  OrderStatus,
} from "@/types/order";

interface Props {
  status: OrderStatus;
}

const steps = [
  "received",
  "preparing",
  "ready",
  "served",
];

export default function
OrderStatusTracker({
  status,
}: Props) {
  const currentIndex =
    steps.indexOf(status);

  return (
    <div className="space-y-6">
      {steps.map(
        (
          step,
          index
        ) => (
          <div
            key={step}
            className="flex items-center gap-4"
          >
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                index <=
                currentIndex
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </div>

            <p className="capitalize font-medium">
              {step}
            </p>
          </div>
        )
      )}
    </div>
  );
}