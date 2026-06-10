

// "use client"

// import { useState, useMemo, useEffect } from "react"
// import { useSearchParams } from "next/navigation"
// import { Suspense } from "react"
// import { useGetMenuItemsQuery, useGetCategoriesQuery } from "@/redux/api/menuApi"
// import { useCart } from "@/hooks/useCart"
// import { useAppDispatch } from "@/redux/hooks"
// import { setTableNumber } from "@/redux/slices/cartSlice"
// import MenuItemCard from "@/components/customer/MenuItemCard"
// import CategoryFilter from "@/components/customer/CategoryFilter"
// import MenuSearchBar from "@/components/customer/MenuSearchBar"
// import Loader from "@/components/shared/Loader"
// import { Leaf } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { ROUTES } from "@/constants/routes"


// // ── Inner component — useSearchParams yahan ────────────────────────
// function MenuContent() {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const searchParams = useSearchParams()

//   const { data: menuData, isLoading: menuLoading, isError: menuError } = useGetMenuItemsQuery()
//   const { data: catData, isLoading: catLoading } = useGetCategoriesQuery()
//   const { totalItems, totalAmount } = useCart()

//   const [search, setSearch] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
//   const [vegOnly, setVegOnly] = useState(false)

//   const tableNum = searchParams.get("table")

//   // ── table number Redux mein set karo ──
//   useEffect(() => {
//     if (tableNum) {
//       dispatch(setTableNumber(Number(tableNum)))
//     }
//   }, [tableNum, dispatch])

//   const items = menuData?.data ?? []
//   const categories = catData?.data ?? []

//   const filtered = useMemo(() => {
//     return items.filter((item) => {
//       const matchSearch =
//         search.trim() === "" ||
//         item.name.toLowerCase().includes(search.toLowerCase()) ||
//         item.description?.toLowerCase().includes(search.toLowerCase())
//       const matchCategory =
//         selectedCategory === null || item.category._id === selectedCategory
//       const matchVeg = !vegOnly || item.isVeg
//       return matchSearch && matchCategory && matchVeg
//     })
//   }, [items, search, selectedCategory, vegOnly])

//   const grouped = useMemo(() => {
//     if (selectedCategory !== null || search.trim() !== "") return null
//     const map = new Map<string, { catName: string; items: typeof filtered }>()
//     filtered.forEach((item) => {
//       const catId = item.category._id
//       if (!map.has(catId)) {
//         map.set(catId, { catName: item.category.name, items: [] })
//       }
//       map.get(catId)!.items.push(item)
//     })
//     return Array.from(map.values())
//   }, [filtered, selectedCategory, search])

//   if (menuLoading || catLoading) return <Loader />

//   if (menuError)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500 text-sm">
//         Failed to load menu. Please refresh.
//       </div>
//     )

//   return (
//     <div className="min-h-screen bg-gray-50 pb-32">
//       {/* Header */}
//       {/* Header — yeh part update karo */}
//       <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 pt-4 pb-0 space-y-2.5">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-lg font-semibold text-gray-900">Our Menu</h1>
//             <p className="text-[11px] text-gray-400 mt-0.5">
//               {items.length} items available
//               {tableNum && (
//                 <span className="ml-1.5 text-orange-500 font-medium">• Table {tableNum}</span>
//               )}
//             </p>
//           </div>
//           <button
//             onClick={() => setVegOnly((v) => !v)}
//             className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${vegOnly
//               ? "bg-green-500 text-white border-green-500"
//               : "bg-white text-gray-400 border-gray-200 hover:border-green-300"
//               }`}
//           >
//             <Leaf size={12} />
//             Veg only
//           </button>
//         </div>
//         <MenuSearchBar value={search} onChange={setSearch} />
//         <CategoryFilter categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />
//       </div>

//       {/* Menu Content */}
//       <div className="px-4 pt-4">
//         {filtered.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24 text-gray-400">
//             <span className="text-5xl mb-4">🍽️</span>
//             <p className="text-sm font-medium">No items found</p>
//             <p className="text-xs mt-1">Try a different search or filter</p>
//           </div>
//         ) : grouped ? (
//           <div className="space-y-8">
//             {grouped.map((group) => (
//               <div key={group.catName}>
//                 <h2 className="text-base font-bold text-gray-800 mb-3">
//                   {group.catName}
//                   <span className="ml-2 text-xs font-normal text-gray-400">
//                     ({group.items.length})
//                   </span>
//                 </h2>
//                 <div className="grid grid-cols-2 gap-3">
//                   {group.items.map((item) => (
//                     <MenuItemCard key={item._id} item={item} />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-3">
//             {filtered.map((item) => (
//               <MenuItemCard key={item._id} item={item} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Cart Button — yeh update karo */}
//       {totalItems > 0 && (
//         <div className="fixed bottom-5 left-4 right-4 z-30">
//           <button
//             onClick={() => router.push(ROUTES.CART)}
//             className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-5 py-3.5 flex items-center justify-between transition-all active:scale-[0.98]"
//           >
//             <div className="flex items-center gap-2.5">
//               <span className="bg-white text-orange-500 text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center">
//                 {totalItems}
//               </span>
//               <span className="text-sm font-medium">View Cart</span>
//             </div>
//             <span className="text-sm font-semibold">₹{totalAmount}</span>
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// // ── Main export — Suspense wrap ────────────────────────────────────
// export default function MenuPage() {
//   return (
//     <Suspense fallback={<Loader />}>
//       <MenuContent />
//     </Suspense>
//   )
// }


// above code work properly







"use client"

import { Suspense } from "react"
import Loader from "@/components/shared/Loader"
import MenuPageClient from "./MenuPageClint"

export default function MenuPage() {
  return (
    <Suspense fallback={<Loader />}>
      <MenuPageClient />
    </Suspense>
  )
}