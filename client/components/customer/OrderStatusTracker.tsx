// import {
//   CheckCircle,
//   ChefHat,
//   CookingPot,
//   Utensils,
// } from "lucide-react";

// import {
//   OrderStatus,
// } from "@/types/order";

// interface Props {
//   status: OrderStatus;
// }

// const steps = [
//   "received",
//   "preparing",
//   "ready",
//   "served",
// ];

// export default function
// OrderStatusTracker({
//   status,
// }: Props) {
//   const currentIndex =
//     steps.indexOf(status);

//   return (
//     <div className="space-y-6">
//       {steps.map(
//         (
//           step,
//           index
//         ) => (
//           <div
//             key={step}
//             className="flex items-center gap-4"
//           >
//             <div
//               className={`h-10 w-10 rounded-full flex items-center justify-center ${
//                 index <=
//                 currentIndex
//                   ? "bg-green-500 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {index + 1}
//             </div>

//             <p className="capitalize font-medium">
//               {step}
//             </p>
//           </div>
//         )
//       )}
//     </div>
//   );
// }


// upar wala code sahi chal raha hai








import { Clock, ChefHat, CheckCircle, Utensils } from "lucide-react";
import type { OrderStatus } from "@/types/order";

interface Props {
  status: OrderStatus;
}

const STEPS: {
  value: OrderStatus;
  label: string;
  sub: string;
  icon: React.ElementType;
}[] = [
  { value: "received",  label: "Order received",  sub: "We got your order",         icon: Clock       },
  { value: "preparing", label: "Preparing",        sub: "Kitchen is cooking",        icon: ChefHat     },
  { value: "ready",     label: "Ready to serve",   sub: "Your food is ready",        icon: CheckCircle },
  { value: "served",    label: "Served",            sub: "Enjoy your meal!",          icon: Utensils    },
];

export default function OrderStatusTracker({ status }: Props) {
  const currentIndex = STEPS.findIndex((s) => s.value === status);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-5 bottom-5 w-px bg-gray-100" />

      <div className="space-y-0">
        {STEPS.map((step, index) => {
          const done    = index < currentIndex;
          const active  = index === currentIndex;
          const pending = index > currentIndex;

          const Icon = step.icon;

          return (
            <div key={step.value} className="relative flex items-start gap-4 pb-6 last:pb-0">
              {/* Icon circle */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                done    ? "bg-green-500"          :
                active  ? "bg-orange-500"         :
                          "bg-white border border-gray-200"
              }`}>
                <Icon size={14} className={
                  done || active ? "text-white" : "text-gray-300"
                } />

                {/* Pulse ring on active */}
                {active && (
                  <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20" />
                )}
              </div>

              {/* Text */}
              <div className="pt-0.5">
                <p className={`text-xs font-semibold leading-tight ${
                  done    ? "text-green-600"   :
                  active  ? "text-orange-500"  :
                            "text-gray-300"
                }`}>
                  {step.label}
                </p>
                <p className={`text-[10px] mt-0.5 ${
                  active ? "text-gray-500" : "text-gray-300"
                }`}>
                  {step.sub}
                </p>
              </div>

              {/* Done checkmark */}
              {done && (
                <div className="ml-auto shrink-0 pt-0.5">
                  <CheckCircle size={13} className="text-green-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


