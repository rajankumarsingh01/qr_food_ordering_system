// "use client";

// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { listenNewOrder } from "@/services/socket.service";
// import type { Order } from "@/types/order";

// export default function NewOrderToast() {
//   useEffect(() => {
//     listenNewOrder((data: unknown) => {
//       const { order } = data as { order: Order };
//       toast.custom(
//         () => (
//           <div className="flex items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-white shadow-lg">
//             <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
//             <div>
//               <p className="text-sm font-semibold">New Order — Table {order.tableNumber}</p>
//               <p className="text-xs opacity-80">₹{order.totalAmount}</p>
//             </div>
//           </div>
//         ),
//         { duration: 5000 }
//       );
//     });

//     return () => {
//       // cleanup handled by socket.service removeListeners
//     };
//   }, []);

//   return null;
// }











"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { listenNewOrder } from "@/services/socket.service";
import type { Order } from "@/types/order";

export default function NewOrderToast() {
  useEffect(() => {
    listenNewOrder((data: unknown) => {
      const { order } = data as { order: Order };
      toast.custom(
        () => (
          <div className="flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-white">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold">New order — Table {order.tableNumber}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {order.items.length} item{order.items.length > 1 ? "s" : ""} · ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ),
        { duration: 5000, position: "top-right" }
      );
    });
  }, []);

  return null;
}