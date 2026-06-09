// "use client";

// import { useState } from "react";
// import { Search, RefreshCw } from "lucide-react";
// import toast from "react-hot-toast";

// import OrderCard from "@/components/admin/orders/OrderCard";
// import NewOrderToast from "@/components/admin/orders/NewOrderToast";
// import {
//   useGetOrdersQuery,
//   useUpdateOrderStatusMutation,
// } from "@/redux/api/orderApi";
// import { useAdminOrderSocket } from "@/hooks/useAdminOrderSocket";
// import type { OrderStatus } from "@/types/order";

// const STATUS_TABS = [
//   { value: "all", label: "All" },
//   { value: "received", label: "Received" },
//   { value: "preparing", label: "Preparing" },
//   { value: "ready", label: "Ready" },
//   { value: "served", label: "Served" },
// ] as const;

// type TabValue = (typeof STATUS_TABS)[number]["value"];

// export default function AdminOrdersPage() {
//   const [activeTab, setActiveTab] = useState<TabValue>("all");
//   const [search, setSearch] = useState("");

//   const { data, isLoading, isError, refetch } = useGetOrdersQuery();
//   const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

//   useAdminOrderSocket({
//     onNewOrder: () => refetch(),
//     onStatusUpdate: () => refetch(),
//   });

//   const handleStatusUpdate = async (id: string, status: OrderStatus) => {
//     try {
//       await updateStatus({ id, status }).unwrap();
//       toast.success("Status updated");
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   const filtered = (data?.data ?? []).filter((order) => {
//     const matchTab = activeTab === "all" || order.status === activeTab;
//     const matchSearch =
//       search === "" ||
//       String(order.tableNumber).includes(search) ||
//       order._id.toLowerCase().includes(search.toLowerCase());
//     return matchTab && matchSearch;
//   });

//   const countByStatus = (status: TabValue) => {
//     if (status === "all") return data?.data.length ?? 0;
//     return data?.data.filter((o) => o.status === status).length ?? 0;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p className="text-red-500">Failed to load orders. Please refresh.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <NewOrderToast />

//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Orders</h1>
//           <p className="text-sm text-gray-500">{data?.data.length ?? 0} total orders</p>
//         </div>
//         <button
//           onClick={() => refetch()}
//           className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
//         >
//           <RefreshCw size={14} />
//           Refresh
//         </button>
//       </div>

//       <div className="relative mb-4">
//         <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by table number or order ID..."
//           className="w-full rounded-lg border py-2 pl-9 pr-4 text-sm outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//         />
//       </div>

//       <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
//         {STATUS_TABS.map((tab) => (
//           <button
//             key={tab.value}
//             onClick={() => setActiveTab(tab.value)}
//             className={`flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
//               activeTab === tab.value
//                 ? "bg-indigo-600 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
//             }`}
//           >
//             {tab.label}
//             <span
//               className={`rounded-full px-1.5 py-0.5 text-xs ${
//                 activeTab === tab.value
//                   ? "bg-white/20 text-white"
//                   : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
//               }`}
//             >
//               {countByStatus(tab.value)}
//             </span>
//           </button>
//         ))}
//       </div>

//       {filtered.length === 0 ? (
//         <div className="flex min-h-64 flex-col items-center justify-center gap-2 rounded-xl border border-dashed dark:border-gray-700">
//           <p className="text-gray-500">No orders found</p>
//           <p className="text-sm text-gray-400">New orders will appear here in realtime</p>
//         </div>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {filtered.map((order) => (
//             <OrderCard
//               key={order._id}
//               order={order}
//               onStatusUpdate={handleStatusUpdate}
//               isUpdating={isUpdating}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }













"use client";

import { useState, useMemo } from "react";
import { Search, RefreshCw, ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";

import OrderCard from "@/components/admin/orders/OrderCard";
import NewOrderToast from "@/components/admin/orders/NewOrderToast";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from "@/redux/api/orderApi";
import { useAdminOrderSocket } from "@/hooks/useAdminOrderSocket";
import type { Order, OrderStatus } from "@/types/order";

const STATUS_TABS = [
  { value: "all",       label: "All"       },
  { value: "received",  label: "Received"  },
  { value: "preparing", label: "Preparing" },
  { value: "ready",     label: "Ready"     },
  { value: "served",    label: "Served"    },
  { value: "cancelled", label: "Cancelled" },
] as const;

type TabValue = (typeof STATUS_TABS)[number]["value"];

// urgency order: received > preparing > ready > served > cancelled
const STATUS_PRIORITY: Record<string, number> = {
  received: 0, preparing: 1, ready: 2, served: 3, cancelled: 4,
};

type SortMode = "urgency" | "newest" | "oldest" | "amount_high" | "amount_low";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "urgency",     label: "Urgency"       },
  { value: "newest",      label: "Newest first"  },
  { value: "oldest",      label: "Oldest first"  },
  { value: "amount_high", label: "Amount: High"  },
  { value: "amount_low",  label: "Amount: Low"   },
];

const TAB_STYLE: Record<TabValue, string> = {
  all:       "bg-gray-900 text-white dark:bg-gray-600",
  received:  "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300",
  preparing: "bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300",
  ready:     "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-300",
  served:    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  cancelled: "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950 dark:text-red-400",
};

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab]   = useState<TabValue>("all");
  const [search, setSearch]         = useState("");
  const [sortMode, setSortMode]     = useState<SortMode>("urgency");
  const [showSort, setShowSort]     = useState(false);

  const { data, isLoading, isError, refetch } = useGetOrdersQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  const [deleteOrder,  { isLoading: isDeleting }] = useDeleteOrderMutation();

  useAdminOrderSocket({
    onNewOrder:    () => refetch(),
    onStatusUpdate:() => refetch(),
  });

  const handleStatusUpdate = async (id: string, status: OrderStatus) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this order permanently?")) return;
    try {
      await deleteOrder(id).unwrap();
      toast.success("Order deleted");
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const countByStatus = (status: TabValue) => {
    if (status === "all") return data?.data.length ?? 0;
    return data?.data.filter((o) => o.status === status).length ?? 0;
  };

  const filtered = useMemo(() => {
    const orders = data?.data ?? [];

    const afterFilter = orders.filter((order) => {
      const matchTab    = activeTab === "all" || order.status === activeTab;
      const matchSearch = search === "" ||
        String(order.tableNumber).includes(search) ||
        order._id.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });

    return [...afterFilter].sort((a, b) => {
      switch (sortMode) {
        case "urgency":
          return (STATUS_PRIORITY[a.status] ?? 9) - (STATUS_PRIORITY[b.status] ?? 9);
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "amount_high":
          return b.totalAmount - a.totalAmount;
        case "amount_low":
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });
  }, [data, activeTab, search, sortMode]);

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f7] dark:bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
        <p className="text-xs text-gray-400">Loading orders...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-red-400">Failed to load orders. Please refresh.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f8f7] p-5 dark:bg-gray-950">
      <NewOrderToast />

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live orders
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {data?.data.length ?? 0} orders · sorted by {SORT_OPTIONS.find(s => s.value === sortMode)?.label.toLowerCase()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSort((p) => !p)}
              className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-white px-3 py-2 text-xs text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <ArrowUpDown size={12} />
              Sort
            </button>
            {showSort && (
              <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-gray-100 bg-white py-1 dark:border-gray-700 dark:bg-gray-800">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortMode(opt.value); setShowSort(false); }}
                    className={`w-full px-3 py-2 text-left text-xs transition hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      sortMode === opt.value ? "text-orange-500 font-medium" : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-white px-3 py-2 text-xs text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            <RefreshCw size={12} />
            Refresh
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by table number or order ID..."
          className="w-full rounded-lg border border-gray-100 bg-white py-2.5 pl-9 pr-4 text-xs outline-none placeholder:text-gray-300 focus:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Status tabs */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {STATUS_TABS.map((tab) => {
          const count = countByStatus(tab.value);
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                isActive ? TAB_STYLE[tab.value] : "bg-white text-gray-500 border border-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
              }`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                isActive ? "bg-white/25 text-inherit" : "bg-gray-100 text-gray-400 dark:bg-gray-700"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders grid */}
      {filtered.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <p className="text-sm text-gray-400">No orders found</p>
          <p className="text-xs text-gray-300">New orders appear here in real-time</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
              isUpdating={isUpdating}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
    </div>
  );
}