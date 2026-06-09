// import type { OrderStatus } from "@/types/order";

// const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
//   received: {
//     label: "Received",
//     className: "bg-blue-100 text-blue-700",
//   },
//   preparing: {
//     label: "Preparing",
//     className: "bg-yellow-100 text-yellow-700",
//   },
//   ready: {
//     label: "Ready",
//     className: "bg-green-100 text-green-700",
//   },
//   served: {
//     label: "Served",
//     className: "bg-gray-100 text-gray-600",
//   },
// };

// export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
//   const config = statusConfig[status] ?? {
//     label: status ?? "Unknown",
//     className: "bg-gray-100 text-gray-500",
//   };

//   return (
//     <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
//       {config.label}
//     </span>
//   );
// }





import type { OrderStatus } from "@/types/order";

const statusConfig: Record<string, { label: string; className: string }> = {
  received:  { label: "Received",  className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"      },
  preparing: { label: "Preparing", className: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" },
  ready:     { label: "Ready",     className: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"    },
  served:    { label: "Served",    className: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"       },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"           },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status] ?? { label: status, className: "bg-gray-100 text-gray-500" };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}