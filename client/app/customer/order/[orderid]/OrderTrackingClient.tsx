"use client";

import { useParams } from "next/navigation";
import Loader from "@/components/shared/Loader";
import OrderStatusTracker from "@/components/customer/OrderStatusTracker";
import { useGetOrderByIdQuery } from "@/redux/api/orderApi";
import { useOrderSocket } from "@/hooks/useOrderSocket";
import CancelOrderButton from "@/components/customer/CancelOrderButton";

export default function OrderTrackingClient() {
  const params = useParams();
  const orderId = params.orderid as string; // lowercase 'i'

  useOrderSocket();

  const { data, isLoading, isError } = useGetOrderByIdQuery(orderId);

  if (isLoading) return <Loader />;

  // ✅ FIX: error state added
  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load order. Please refresh.
      </div>
    );
  }

  // ✅ FIX: null check before accessing order
  const order = data?.data;

  if (!order) {
    return (
      <div className="p-8 text-center text-gray-500">
        Order not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Order Tracking</h1>

      <OrderStatusTracker status={order.status} />

      <div className="mt-8 rounded-xl border p-4">
        <h3 className="font-bold">Order ID</h3>
        <p className="text-gray-600">{order._id}</p>

        <h3 className="mt-4 font-bold">Table</h3>
        <p className="text-gray-600">#{order.tableNumber}</p>

        <h3 className="mt-4 font-bold">Total</h3>
        <p className="text-gray-600">₹{order.totalAmount}</p>

        <h3 className="mt-4 font-bold">Payment</h3>
        <p className="text-gray-600 capitalize">{order.paymentStatus}</p>




{/* ← Yeh add karo */}
<CancelOrderButton
  orderId={order._id}
  status={order.status}
  paymentStatus={order.paymentStatus}
  totalAmount={order.totalAmount}
/>
      </div>
    </div>
  );
}









// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { ArrowLeft, Hash, UtensilsCrossed, CreditCard, Clock } from "lucide-react";
// import Loader from "@/components/shared/Loader";
// import OrderStatusTracker from "@/components/customer/OrderStatusTracker";
// import CancelOrderButton from "@/components/customer/CancelOrderButton";
// import { useGetOrderByIdQuery } from "@/redux/api/orderApi";
// import { useOrderSocket } from "@/hooks/useOrderSocket";

// export default function OrderTrackingClient() {
//   const params = useParams();
//   const router = useRouter();
//   const orderId = params.orderid as string;

//   useOrderSocket();

//   const { data, isLoading, isError } = useGetOrderByIdQuery(orderId);

//   if (isLoading) return <Loader />;

//   if (isError) {
//     return (
//       <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center gap-3 px-8 text-center">
//         <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
//           <UtensilsCrossed size={22} className="text-red-300" />
//         </div>
//         <p className="text-sm font-semibold text-gray-900">Couldn't load order</p>
//         <p className="text-xs text-gray-400">Please refresh the page and try again.</p>
//         <button
//           onClick={() => router.refresh()}
//           className="mt-1 px-5 py-2.5 rounded-2xl bg-orange-500 text-white text-sm font-semibold active:scale-95 transition-transform"
//         >
//           Refresh
//         </button>
//       </div>
//     );
//   }

//   const order = data?.data;

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center gap-3 px-8 text-center">
//         <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
//           <UtensilsCrossed size={22} className="text-orange-300" />
//         </div>
//         <p className="text-sm font-semibold text-gray-900">Order not found</p>
//         <p className="text-xs text-gray-400">This order may have been removed or the link is invalid.</p>
//         <button
//           onClick={() => router.back()}
//           className="mt-1 px-5 py-2.5 rounded-2xl bg-orange-500 text-white text-sm font-semibold active:scale-95 transition-transform"
//         >
//           Go back
//         </button>
//       </div>
//     );
//   }

//   const shortId = order._id.slice(-6).toUpperCase();
//   const paymentPaid = order.paymentStatus === "paid";

//   return (
//     <div className="min-h-screen bg-[#f5f5f0] pb-6">

//       {/* ── Header ── */}
//       <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 pt-4 pb-3">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => router.back()}
//             className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-100 text-gray-400"
//           >
//             <ArrowLeft size={16} />
//           </button>
//           <div>
//             <h1 className="text-lg font-semibold text-gray-900 leading-tight">
//               Order tracking
//             </h1>
//             <p className="text-[10px] text-gray-400">#{shortId} · Table {order.tableNumber}</p>
//           </div>
//         </div>
//       </div>

//       <div className="px-4 pt-4 space-y-2.5">

//         {/* ── Status tracker ── */}
//         <div className="bg-white rounded-2xl border border-gray-100 px-4 py-4">
//           <p className="text-xs font-semibold text-gray-900 mb-4">Order status</p>
//           <OrderStatusTracker status={order.status} />
//         </div>

//         {/* ── Order details ── */}
//         <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//           <div className="px-4 py-3 border-b border-[#f0f0f0]">
//             <p className="text-xs font-semibold text-gray-900">Order details</p>
//           </div>

//           <div className="divide-y divide-[#f0f0f0]">
//             {/* Order ID */}
//             <div className="flex items-center gap-3 px-4 py-3">
//               <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
//                 <Hash size={13} className="text-gray-400" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-[10px] text-gray-400">Order ID</p>
//                 <p className="text-xs font-medium text-gray-900 truncate">{order._id}</p>
//               </div>
//             </div>

//             {/* Table */}
//             <div className="flex items-center gap-3 px-4 py-3">
//               <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
//                 <UtensilsCrossed size={13} className="text-orange-400" />
//               </div>
//               <div>
//                 <p className="text-[10px] text-gray-400">Table number</p>
//                 <p className="text-xs font-medium text-gray-900">Table {order.tableNumber}</p>
//               </div>
//             </div>

//             {/* Total + payment badge */}
//             <div className="flex items-center gap-3 px-4 py-3">
//               <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
//                 <CreditCard size={13} className="text-orange-400" />
//               </div>
//               <div className="flex-1">
//                 <p className="text-[10px] text-gray-400">Total amount</p>
//                 <p className="text-xs font-medium text-gray-900">₹{order.totalAmount}</p>
//               </div>
//               <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
//                 paymentPaid
//                   ? "bg-green-50 text-green-600"
//                   : "bg-orange-50 text-orange-500"
//               }`}>
//                 {paymentPaid ? "Paid" : "Pending"}
//               </span>
//             </div>

//             {/* Estimated time — shown only while order is active */}
//             {(order.status === "received" || order.status === "preparing") && (
//               <div className="flex items-center gap-3 px-4 py-3">
//                 <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
//                   <Clock size={13} className="text-gray-400" />
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-gray-400">Estimated time</p>
//                   <p className="text-xs font-medium text-gray-900">20–30 mins</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Items breakdown ── */}
//         {order.items?.length > 0 && (
//           <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
//             <div className="px-4 py-3 border-b border-[#f0f0f0]">
//               <p className="text-xs font-semibold text-gray-900">
//                 Items ordered
//                 <span className="ml-1.5 text-gray-400 font-normal">
//                   ({order.items.length})
//                 </span>
//               </p>
//             </div>
//             <div className="divide-y divide-[#f0f0f0]">
//               {order.items.map((item) => (
//                 <div key={item.menuItem} className="flex items-center justify-between px-4 py-2.5">
//                   <span className="text-xs text-gray-700 flex-1 mr-2 truncate">{item.name}</span>
//                   <span className="text-[10px] text-gray-400 shrink-0 mr-3">× {item.quantity}</span>
//                   <span className="text-xs font-medium text-gray-900 shrink-0">
//                     ₹{item.price * item.quantity}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ── Cancel button ── */}
//         <CancelOrderButton
//           orderId={order._id}
//           status={order.status}
//           paymentStatus={order.paymentStatus}
//           totalAmount={order.totalAmount}
//         />

//       </div>
//     </div>
//   );
// }