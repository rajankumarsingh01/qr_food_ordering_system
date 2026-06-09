// "use client"

// import { useState } from "react"
// import { useUpdateOrderStatusMutation } from "@/redux/api/kitchenApi"
// import type { Order, OrderStatus } from "@/types/order"
// import { Clock, ChefHat, CheckCircle, Utensils } from "lucide-react"
// import toast from "react-hot-toast"
// import { bg } from "zod/v4/locales"

// // ── Status Config ──────────────────────────────────────────────────
// type StatusConfigType = { label: string; color: string; bg: string; icon: React.ReactNode }

// const STATUS_CONFIG: Record<OrderStatus, StatusConfigType> = {
//   received: {
//     label: "Received",
//     color: "text-blue-600",
//     bg: "bg-blue-50 border-blue-200",
//     icon: <Clock size={14} />,
//   },
//   preparing: {
//     label: "Preparing",
//     color: "text-orange-600",
//     bg: "bg-orange-50 border-orange-200",
//     icon: <ChefHat size={14} />,
//   },
//   ready: {
//     label: "Ready",
//     color: "text-green-600",
//     bg: "bg-green-50 border-green-200",
//     icon: <CheckCircle size={14} />,
//   },
//   served: {
//     label: "Served",
//     color: "text-gray-500",
//     bg: "bg-gray-50 border-gray-200",
//     icon: <Utensils size={14} />,
//   },
// }

// // Next status map
// const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
//   received: "preparing",
//   preparing: "ready",
//   ready: "served",
// }

// const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
//   received: "Start Preparing",
//   preparing: "Mark Ready",
//   ready: "Mark Served",
// }

// // ── Time Elapsed ───────────────────────────────────────────────────
// function TimeElapsed({ createdAt }: { createdAt: string }) {
//   const diffMs = Date.now() - new Date(createdAt).getTime()
//   const diffMin = Math.floor(diffMs / 60000)

//   const label =
//     diffMin === 0
//       ? "Just now"
//       : diffMin < 60
//       ? `${diffMin}m ago`
//       : `${Math.floor(diffMin / 60)}h ${diffMin % 60}m ago`

//   const urgent = diffMin >= 15 && diffMin < 30
//   const critical = diffMin >= 30

//   return (
//     <span
//       className={`text-xs font-medium ${
//         critical
//           ? "text-red-600"
//           : urgent
//           ? "text-orange-500"
//           : "text-gray-400"
//       }`}
//     >
//       {label}
//       {critical && " ⚠️"}
//     </span>
//   )
// }

// // ── Main Card ──────────────────────────────────────────────────────
// interface KitchenOrderCardProps {
//   order: Order
// }

// export default function KitchenOrderCard({ order }: KitchenOrderCardProps) {
//   const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation()
//   const [optimisticStatus, setOptimisticStatus] = useState<OrderStatus>(
//     order.status
//   )

//   const config = STATUS_CONFIG[optimisticStatus]
//   const nextStatus = NEXT_STATUS[optimisticStatus]
//   const nextLabel = NEXT_LABEL[optimisticStatus]

//   const handleStatusUpdate = async () => {
//     if (!nextStatus) return

//     // Optimistic update
//     setOptimisticStatus(nextStatus)

//     try {
//       await updateStatus({
//         orderId: order._id,
//         status: nextStatus,
//       }).unwrap()

//       toast.success(`Order #${order._id.slice(-4)} → ${STATUS_CONFIG[nextStatus].label}`)
//     } catch {
//       // Rollback on failure
//       setOptimisticStatus(order.status)
//       toast.error("Status update failed. Try again.")
//     }
//   }

//   return (
//     <div
//       className={`rounded-xl border-2 p-4 flex flex-col gap-4 transition-all ${config.bg}`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <span className="text-lg font-bold text-gray-900">
//             Table {order.tableNumber}
//           </span>
//           <span
//             className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${config.color} ${config.bg}`}
//           >
//             {config.icon}
//             {config.label}
//           </span>
//         </div>
//         <TimeElapsed createdAt={order.createdAt} />
//       </div>

//       {/* Items */}
//       <ul className="flex flex-col gap-2">
//         {order.items.map((item, idx) => (
//           <li key={idx} className="flex justify-between items-start">
//             <div>
//               <span className="text-sm font-medium text-gray-800">
//                 {item.name}
//               </span>
//               {item.specialNote && (
//                 <p className="text-xs text-orange-600 mt-0.5">
//                   📝 {item.specialNote}
//                 </p>
//               )}
//             </div>
//             <span className="text-sm font-bold text-gray-700 ml-4">
//               ×{item.quantity}
//             </span>
//           </li>
//         ))}
//       </ul>

//       {/* Footer */}
//       <div className="flex items-center justify-between border-t border-current border-opacity-10 pt-3">
//         <span className="text-xs text-gray-500">
//           #{order._id.slice(-6).toUpperCase()}
//         </span>

//         {nextStatus && nextLabel ? (
//           <button
//             onClick={handleStatusUpdate}
//             disabled={isLoading}
//             className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-white border-2 border-current text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-all"
//           >
//             {isLoading ? "Updating..." : nextLabel}
//           </button>
//         ) : (
//           <span className="text-xs text-gray-400 font-medium">
//             ✅ Complete
//           </span>
//         )}
//       </div>
//     </div>
//   )
// }









"use client"

import { useState } from "react"
import { useUpdateOrderStatusMutation } from "@/redux/api/kitchenApi"
import type { Order, OrderStatus } from "@/types/order"
import { Clock, ChefHat, CheckCircle, Utensils } from "lucide-react"
import toast from "react-hot-toast"
// ← removed the rogue: import { bg } from "zod/v4/locales"

type StatusConfigType = { label: string; color: string; bg: string; icon: React.ReactNode }

const STATUS_CONFIG: Record<OrderStatus, StatusConfigType> = {
  received: {
    label: "Received",
    color: "text-blue-400",
    bg: "bg-blue-950/30 border-blue-800",
    icon: <Clock size={14} />,
  },
  preparing: {
    label: "Preparing",
    color: "text-orange-400",
    bg: "bg-orange-950/30 border-orange-800",
    icon: <ChefHat size={14} />,
  },
  ready: {
    label: "Ready",
    color: "text-green-400",
    bg: "bg-green-950/30 border-green-800",
    icon: <CheckCircle size={14} />,
  },
  served: {
    label: "Served",
    color: "text-gray-500",
    bg: "bg-gray-800/40 border-gray-700",
    icon: <Utensils size={14} />,
  },
}

const FALLBACK_CONFIG: StatusConfigType = {
  label: "Unknown",
  color: "text-gray-500",
  bg: "bg-gray-800/40 border-gray-700",
  icon: <Clock size={14} />,
}

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  received: "preparing",
  preparing: "ready",
  ready:     "served",
}

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  received: "Start preparing",
  preparing: "Mark ready",
  ready:     "Mark served",
}

function TimeElapsed({ createdAt }: { createdAt: string }) {
  const diffMin = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000)

  const label =
    diffMin === 0 ? "Just now"
    : diffMin < 60 ? `${diffMin}m ago`
    : `${Math.floor(diffMin / 60)}h ${diffMin % 60}m ago`

  const urgent   = diffMin >= 15 && diffMin < 30
  const critical = diffMin >= 30

  return (
    <span className={`text-xs font-medium ${
      critical ? "text-red-400" : urgent ? "text-orange-400" : "text-gray-500"
    }`}>
      {label}{critical && " ⚠️"}
    </span>
  )
}

interface KitchenOrderCardProps {
  order: Order
}

export default function KitchenOrderCard({ order }: KitchenOrderCardProps) {
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation()
  const [optimisticStatus, setOptimisticStatus] = useState<OrderStatus>(order.status)

  // ← fallback guard — crashes if status is undefined/unknown
  const config     = STATUS_CONFIG[optimisticStatus] ?? FALLBACK_CONFIG
  const nextStatus = NEXT_STATUS[optimisticStatus]
  const nextLabel  = NEXT_LABEL[optimisticStatus]

  const handleStatusUpdate = async () => {
    if (!nextStatus) return
    setOptimisticStatus(nextStatus)
    try {
      await updateStatus({ orderId: order._id, status: nextStatus }).unwrap()
      toast.success(`Order #${order._id.slice(-4)} → ${STATUS_CONFIG[nextStatus].label}`)
    } catch {
      setOptimisticStatus(order.status)
      toast.error("Status update failed. Try again.")
    }
  }

  return (
    <div className={`rounded-xl border-2 p-4 flex flex-col gap-4 transition-all ${config.bg}`}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-white">
            Table {order.tableNumber}
          </span>
          <span className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-current ${config.color}`}>
            {config.icon}
            {config.label}
          </span>
        </div>
        <TimeElapsed createdAt={order.createdAt} />
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-2">
        {order.items.map((item, idx) => (
          <li key={idx} className="flex justify-between items-start">
            <div>
              <span className="text-sm font-medium text-gray-200">{item.name}</span>
              {item.specialNote && (
                <p className="text-xs text-orange-400 mt-0.5">📝 {item.specialNote}</p>
              )}
            </div>
            <span className="text-sm font-bold text-gray-400 ml-4">×{item.quantity}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[11px] text-gray-500 font-mono">
          #{order._id.slice(-6).toUpperCase()}
        </span>

        {nextStatus && nextLabel ? (
          <button
            onClick={handleStatusUpdate}
            disabled={isLoading}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white/10 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 transition-all active:scale-95"
          >
            {isLoading ? "Updating…" : nextLabel}
          </button>
        ) : (
          <span className="text-xs text-gray-500 font-medium">Complete</span>
        )}
      </div>

    </div>
  )
}