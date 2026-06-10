// "use client"

// import { ArrowRight } from "lucide-react"
// import { useRouter } from "next/navigation"

// interface CartBarProps {
//   count: number
//   total: number
// }

// export default function CartBar({ count, total }: CartBarProps) {
//   const router = useRouter()

//   return (
//     <div className="fixed bottom-5 left-4 right-4 z-30">
//       <button
//         onClick={() => router.push("/cart")}
//         className="w-full bg-orange-500 rounded-2xl px-5 py-3.5 flex items-center justify-between active:scale-[0.98] transition-transform"
//       >
//         <div className="flex items-center gap-3">
//           <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-orange-500 text-[11px] font-bold">
//             {count}
//           </span>
//           <div className="text-left">
//             <p className="text-sm font-semibold text-white leading-tight">
//               View cart
//             </p>
//             <p className="text-[10px] text-orange-200 leading-tight">
//               {count} item{count !== 1 ? "s" : ""} added
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-base font-bold text-white">₹{total}</span>
//           <ArrowRight size={16} className="text-orange-200" />
//         </div>
//       </button>
//     </div>
//   )
// }


// uper code work properly







"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface CartBarProps {
  count: number
  total: number
}

export default function CartBar({ count, total }: CartBarProps) {
  const router = useRouter()

  return (
    <div className="fixed bottom-5 left-4 right-4 z-30">
      <button
        onClick={() => router.push("/customer/cart")}
        className="w-full bg-orange-500 rounded-2xl px-5 py-3.5 flex items-center justify-between active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-orange-500 text-[11px] font-bold">
            {count}
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-white leading-tight">
              View cart
            </p>
            <p className="text-[10px] text-orange-200 leading-tight">
              {count} item{count !== 1 ? "s" : ""} added
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-white">₹{total}</span>
          <ArrowRight size={16} className="text-orange-200" />
        </div>
      </button>
    </div>
  )
}

