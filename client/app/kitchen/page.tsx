// "use client"

// import { useEffect, useState, useMemo } from "react"
// import { useGetKitchenOrdersQuery } from "@/redux/api/kitchenApi"
// import { useKitchenSocket } from "@/hooks/useKitchenSocket"
// import KitchenOrderCard from "@/components/kitchen/KitchenOrderCard"
// import AudioAlert from "@/components/kitchen/AudioAlert"
// import Loader from "@/components/shared/Loader"
// import type { Order, OrderStatus } from "@/types/order"
// import { ChefHat } from "lucide-react"
// import toast from "react-hot-toast"

// const TABS: { label: string; value: OrderStatus | "all" }[] = [
//   { label: "All Active", value: "all" },
//   { label: "Received", value: "received" },
//   { label: "Preparing", value: "preparing" },
//   { label: "Ready", value: "ready" },
// ]

// function tabCount(orders: Order[], status: OrderStatus | "all") {
//   if (status === "all") return orders.filter((o) => o.status !== "served").length
//   return orders.filter((o) => o.status === status).length
// }

// export default function KitchenPage() {
//   const { data, isLoading, isError, refetch } = useGetKitchenOrdersQuery()
//   const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all")
//   const [audioTrigger, setAudioTrigger] = useState(false)
//   const [liveOrders, setLiveOrders] = useState<Order[]>([])

//   useEffect(() => {
//     if (data?.data) {
//       setLiveOrders(data.data)
//     }
//   }, [data])

//   const playAlert = () => {
//     setAudioTrigger((prev) => !prev)
//     const audio = new Audio("/alert.mp3")
//     audio.play().catch(() => {})
//   }

//   useKitchenSocket({
//     onNewOrder: (order) => {
//       setLiveOrders((prev) => {
//         const exists = prev.find((o) => o._id === order._id)
//         if (exists) return prev
//         return [order, ...prev]
//       })
//       playAlert()
//     },
//     onAlert: (data) => {
//       toast(data.message)
//     },
//   })

//   const filteredOrders = useMemo(() => {
//     const active = liveOrders.filter((o) => o.status !== "served")
//     if (activeTab === "all") return active
//     return active.filter((o) => o.status === activeTab)
//   }, [liveOrders, activeTab])

//   const sortedOrders = useMemo(() => {
//     const priority: Record<OrderStatus, number> = {
//       received: 0,
//       preparing: 1,
//       ready: 2,
//       served: 3,
//     }
//     return [...filteredOrders].sort((a, b) => {
//       const statusDiff = priority[a.status] - priority[b.status]
//       if (statusDiff !== 0) return statusDiff
//       return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//     })
//   }, [filteredOrders])

//   if (isLoading) return <Loader />

//   if (isError)
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-red-500">
//         <p>Failed to load orders.</p>
//         <button
//           onClick={refetch}
//           className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition"
//         >
//           Retry
//         </button>
//       </div>
//     )

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <AudioAlert trigger={audioTrigger} />

//       <div className="max-w-6xl mx-auto space-y-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
//               <ChefHat size={22} />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold">Kitchen Display</h1>
//               <p className="text-sm text-gray-400">
//                 {tabCount(liveOrders, "all")} active orders
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-full">
//             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//             <span className="text-xs text-gray-300 font-medium">Live</span>
//           </div>
//         </div>

//         <div className="flex gap-2 flex-wrap">
//           {TABS.map((tab) => {
//             const count = tabCount(liveOrders, tab.value)
//             return (
//               <button
//                 key={tab.value}
//                 onClick={() => setActiveTab(tab.value)}
//                 className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
//                   activeTab === tab.value
//                     ? "bg-orange-500 border-orange-500 text-white"
//                     : "bg-gray-800 border-gray-700 text-gray-300 hover:border-orange-400"
//                 }`}
//               >
//                 {tab.label}
//                 <span className="ml-2 text-xs opacity-80">({count})</span>
//               </button>
//             )
//           })}
//         </div>

//         {sortedOrders.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24 text-gray-600">
//             <ChefHat size={48} className="mb-4 opacity-30" />
//             <p className="text-lg font-medium">No active orders</p>
//             <p className="text-sm mt-1">New orders will appear here automatically</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {sortedOrders.map((order) => (
//               <KitchenOrderCard key={order._id} order={order} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

























"use client"

import { useEffect, useState, useMemo } from "react"
import { useGetKitchenOrdersQuery } from "@/redux/api/kitchenApi"
import { useKitchenSocket } from "@/hooks/useKitchenSocket"
import KitchenOrderCard from "@/components/kitchen/KitchenOrderCard"
import AudioAlert from "@/components/kitchen/AudioAlert"
import Loader from "@/components/shared/Loader"
import type { Order, OrderStatus } from "@/types/order"
import { ChefHat, RefreshCw } from "lucide-react"
import toast from "react-hot-toast"

const TABS: { label: string; value: OrderStatus | "all" }[] = [
  { label: "All active", value: "all" },
  { label: "Received",   value: "received" },
  { label: "Preparing",  value: "preparing" },
  { label: "Ready",      value: "ready" },
]

const STATUS_PRIORITY: Record<OrderStatus, number> = {
  received: 0,
  preparing: 1,
  ready:     2,
  served:    3,
}

function tabCount(orders: Order[], status: OrderStatus | "all") {
  if (status === "all") return orders.filter((o) => o.status !== "served").length
  return orders.filter((o) => o.status === status).length
}

export default function KitchenPage() {
  const { data, isLoading, isError, refetch } = useGetKitchenOrdersQuery()
  const [activeTab, setActiveTab]     = useState<OrderStatus | "all">("all")
  const [audioTrigger, setAudioTrigger] = useState(false)
  const [liveOrders, setLiveOrders]   = useState<Order[]>([])

  useEffect(() => {
    if (data?.data) setLiveOrders(data.data)
  }, [data])

  const playAlert = () => {
    setAudioTrigger((prev) => !prev)
    new Audio("/alert.mp3").play().catch(() => {})
  }

  useKitchenSocket({
    onNewOrder: (order) => {
      setLiveOrders((prev) => {
        const exists = prev.find((o) => o._id === order._id)
        if (exists) return prev
        return [order, ...prev]
      })
      playAlert()
    },
    onAlert: (data) => {
      toast(data.message)
    },
  })

  const filteredOrders = useMemo(() => {
    const active = liveOrders.filter((o) => o.status !== "served")
    if (activeTab === "all") return active
    return active.filter((o) => o.status === activeTab)
  }, [liveOrders, activeTab])

  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      const statusDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status]
      if (statusDiff !== 0) return statusDiff
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
  }, [filteredOrders])

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
          <ChefHat size={22} className="text-red-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white mb-1">Failed to load orders</p>
          <p className="text-xs text-gray-500">Check your connection and try again.</p>
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-sm font-medium text-gray-300 hover:border-orange-500 hover:text-white transition-all"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      </div>
    )
  }

  const activeCount = tabCount(liveOrders, "all")

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AudioAlert trigger={audioTrigger} />

      {/* ── Top bar ── */}
      <div className="sticky top-0 z-20 bg-gray-950/90 backdrop-blur-sm border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
              <ChefHat size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-white leading-tight">
                Kitchen display
              </h1>
              <p className="text-[11px] text-gray-500">
                {activeCount} active order{activeCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 bg-gray-800/80 border border-white/5 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[11px] text-gray-400 font-medium">Live</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-5 space-y-5">

        {/* ── Tabs ── */}
        <div className="flex gap-2 flex-wrap">
          {TABS.map((tab) => {
            const count = tabCount(liveOrders, tab.value)
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all active:scale-95 ${
                  isActive
                    ? "bg-orange-500 border-orange-500 text-white"
                    : "bg-gray-800/60 border-gray-700 text-gray-400 hover:border-orange-500/50 hover:text-gray-200"
                }`}
              >
                {tab.label}
                <span className={`min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold px-1 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Orders grid / empty state ── */}
        {sortedOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <ChefHat size={40} className="text-gray-700" />
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-500">No active orders</p>
              <p className="text-xs text-gray-600 mt-1">
                New orders will appear here automatically
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedOrders.map((order) => (
              <KitchenOrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}