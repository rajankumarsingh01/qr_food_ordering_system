// import { Clock, Table2, IndianRupee, ChevronRight } from "lucide-react";
// import type { Order, OrderStatus } from "@/types/order";
// import OrderStatusBadge from "./OrderStatusBadge";

// interface Props {
//   order: Order;
//   onStatusUpdate: (id: string, status: OrderStatus) => void;
//   isUpdating: boolean;
// }

// const STATUS_NEXT: Record<OrderStatus, OrderStatus | null> = {
//   received: "preparing",
//   preparing: "ready",
//   ready: "served",
//   served: null,
// };

// const STATUS_NEXT_LABEL: Record<OrderStatus, string> = {
//   received: "Start Preparing",
//   preparing: "Mark Ready",
//   ready: "Mark Served",
//   served: "",
// };

// export default function OrderCard({ order, onStatusUpdate, isUpdating }: Props) {
//   const nextStatus = STATUS_NEXT[order.status];

//   return (
//     <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-gray-900">

//       {/* Header */}
//       <div className="mb-3 flex items-start justify-between gap-2">
//         <div>
//           <p className="text-xs text-gray-400">
//             #{order._id.slice(-6).toUpperCase()}
//           </p>
//           <div className="mt-1 flex items-center gap-3">
//             <span className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300">
//               <Table2 size={14} />
//               Table {order.tableNumber}
//             </span>
//             <span className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
//               <IndianRupee size={14} />
//               {order.totalAmount}
//             </span>
//           </div>
//         </div>
//         <OrderStatusBadge status={order.status} />
//       </div>

//       {/* Items */}
//       <div className="mb-3 space-y-1 border-t pt-3 dark:border-gray-700">
//         {order.items.map((item, i) => (
//           <div key={i} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
//             <span>{item.name} × {item.quantity}</span>
//             <span>₹{item.price * item.quantity}</span>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between border-t pt-3 dark:border-gray-700">
//         <span className="flex items-center gap-1 text-xs text-gray-400">
//           <Clock size={12} />
//           {new Date(order.createdAt).toLocaleTimeString("en-IN", {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         </span>

//         {nextStatus && (
//           <button
//             onClick={() => onStatusUpdate(order._id, nextStatus)}
//             disabled={isUpdating}
//             className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
//           >
//             {STATUS_NEXT_LABEL[order.status]}
//             <ChevronRight size={12} />
//           </button>
//         )}

//         {order.status === "served" && (
//           <span className="text-xs text-green-600 dark:text-green-400">✓ Completed</span>
//         )}
//       </div>
//     </div>
//   );
// }








"use client";

import { Clock, Trash2, ChevronRight, CheckCircle } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";

interface Props {
  order: Order;
  onStatusUpdate: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const STATUS_NEXT: Partial<Record<OrderStatus, OrderStatus>> = {
  received:  "preparing",
  preparing: "ready",
  ready:     "served",
};

const STATUS_NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  received:  "Start preparing",
  preparing: "Mark ready",
  ready:     "Mark served",
};

const CARD_ACCENT: Record<OrderStatus, string> = {
  received:  "border-l-2 border-l-blue-400",
  preparing: "border-l-2 border-l-yellow-400",
  ready:     "border-l-2 border-l-green-400",
  served:    "",
};

const BADGE_STYLE: Record<OrderStatus, string> = {
  received:  "bg-blue-50 text-blue-700",
  preparing: "bg-yellow-50 text-yellow-700",
  ready:     "bg-green-50 text-green-700",
  served:    "bg-gray-100 text-gray-500",
};

const NEXT_BTN_STYLE: Partial<Record<OrderStatus, string>> = {
  received:  "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
  preparing: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  ready:     "bg-green-50 text-green-700 hover:bg-green-100",
};

function timeAgo(date: string) {
  const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

export default function OrderCard({ order, onStatusUpdate, onDelete, isUpdating, isDeleting }: Props) {
  const nextStatus = STATUS_NEXT[order.status];
  const isServed   = order.status === "served";

  return (
    <div className={`rounded-xl border border-gray-100 bg-white overflow-hidden transition ${CARD_ACCENT[order.status]} ${isServed ? "opacity-60" : ""}`}>

      {/* Header */}
      <div className="p-3 pb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] text-gray-400 font-mono mb-0.5">
            #{order._id.slice(-6).toUpperCase()}
          </p>
          <p className="text-sm font-semibold text-gray-900">
            Table {order.tableNumber}
          </p>
          <p className="text-sm font-semibold text-orange-500 mt-0.5">
            ₹{order.totalAmount.toLocaleString("en-IN")}
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${BADGE_STYLE[order.status]}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Items */}
      <div className="px-3 pb-2 border-t border-gray-50 pt-2 space-y-1">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-xs text-gray-600 truncate flex-1">
              {item.name}
              <span className="text-gray-400 ml-1">×{item.quantity}</span>
            </span>
            <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 py-2.5 border-t border-gray-50 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Clock size={11} />
          {timeAgo(order.createdAt)}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onDelete(order._id)}
            disabled={isDeleting}
            className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition disabled:opacity-50"
            title="Delete order"
          >
            <Trash2 size={11} />
          </button>

          {nextStatus ? (
            <button
              onClick={() => onStatusUpdate(order._id, nextStatus)}
              disabled={isUpdating}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-medium transition disabled:opacity-50 ${NEXT_BTN_STYLE[order.status] ?? ""}`}
            >
              {STATUS_NEXT_LABEL[order.status]}
              <ChevronRight size={10} />
            </button>
          ) : isServed ? (
            <div className="flex items-center gap-1 text-[10px] text-green-600">
              <CheckCircle size={12} />
              Done
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}