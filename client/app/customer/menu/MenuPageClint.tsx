// "use client";

// import { useMemo } from "react";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react";

// import Loader from "@/components/shared/Loader";
// import MenuItemCard from "@/components/customer/MenuItemCard";
// import CategoryFilter from "@/components/customer/CategoryFilter";

// import { useGetMenuItemsQuery, useGetCategoriesQuery } from "@/redux/api/menuApi";
// import { useTableFromUrl } from "@/hooks/useTableFromUrl";
// import { useAppSelector } from "@/redux/hooks";

// import type { MenuItem } from "@/types/menu";

// export default function MenuPageClient() {
//   useTableFromUrl(); // URL se tableNumber read karke Redux + localStorage mein set karta hai

//   const searchParams = useSearchParams();
//   const tableNumber = searchParams.get("table");

//   const cartTableNumber = useAppSelector((state) => state.cart.tableNumber);

//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   const { data: menuResponse, isLoading: menuLoading } = useGetMenuItemsQuery();
//   const { data: categoryResponse, isLoading: categoryLoading } = useGetCategoriesQuery();

//   const menuItems: MenuItem[] = menuResponse?.data ?? [];
//   const categories = categoryResponse?.data ?? [];

//   const filteredItems = useMemo(() => {
//     if (selectedCategory === null) return menuItems;
//     return menuItems.filter((item) => item.category?._id === selectedCategory);
//   }, [menuItems, selectedCategory]);

//   if (menuLoading || categoryLoading) return <Loader />;

//   return (
//     <div className="container mx-auto space-y-6 p-6">
//       <div>
//         <h1 className="text-3xl font-bold">Restaurant Menu</h1>
//         {cartTableNumber && (
//           <p className="text-sm text-gray-500">Table: {cartTableNumber}</p>
//         )}
//       </div>

//       <CategoryFilter
//         categories={categories}
//         selected={selectedCategory}
//         onChange={setSelectedCategory}
//       />

//       <div className="grid grid-cols-2 gap-3">
//         {filteredItems.map((item) => (
//           <MenuItemCard key={item._id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

import Loader from "@/components/shared/Loader";
import MenuItemCard from "@/components/customer/MenuItemCard";
import CategoryFilter from "@/components/customer/CategoryFilter";
import CartBar from "@/components/customer/CartBar";

import { useGetMenuItemsQuery, useGetCategoriesQuery } from "@/redux/api/menuApi";
import { useTableFromUrl } from "@/hooks/useTableFromUrl";
import { useAppSelector } from "@/redux/hooks";

import type { MenuItem } from "@/types/menu";

export default function MenuPageClient() {
  useTableFromUrl();

  const searchParams = useSearchParams();
  const cartTableNumber = useAppSelector((state) => state.cart.tableNumber);
  const cartItems = useAppSelector((state) => state.cart.items);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [search, setSearch] = useState("");

  const { data: menuResponse, isLoading: menuLoading } = useGetMenuItemsQuery();
  const { data: categoryResponse, isLoading: categoryLoading } = useGetCategoriesQuery();

  const menuItems: MenuItem[] = menuResponse?.data ?? [];
  const categories = categoryResponse?.data ?? [];

  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (selectedCategory !== null)
      items = items.filter((i) => i.category?._id === selectedCategory);
    if (vegOnly)
      items = items.filter((i) => i.isVeg);
    if (search.trim())
      items = items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    return items;
  }, [menuItems, selectedCategory, vegOnly, search]);

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  if (menuLoading || categoryLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#f5f5f0] pb-24">

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 pt-4 pb-0">

        {/* Top row */}
        <div className="flex items-start justify-between mb-2.5">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">
              Menu
            </h1>
            {cartTableNumber && (
              <p className="text-[10px] text-gray-400 mt-0.5">
                Table {cartTableNumber}
              </p>
            )}
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400">
            <SlidersHorizontal size={15} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-2.5">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-8 pr-3 py-2 text-xs text-gray-900 placeholder-gray-300 outline-none focus:border-orange-300 focus:bg-white transition-all"
          />
        </div>

        {/* Veg toggle + legend row */}
        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <button
            onClick={() => setVegOnly((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
              vegOnly
                ? "bg-green-500 text-white border-green-500"
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            {/* FSSAI-style veg box */}
            <span
              className={`w-3 h-3 rounded-[3px] border-[1.5px] flex items-center justify-center ${
                vegOnly ? "border-white" : "border-green-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  vegOnly ? "bg-white" : "bg-green-600"
                }`}
              />
            </span>
            Veg only
          </button>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <span className="w-3.5 h-3.5 rounded-[3px] border-[1.5px] border-green-600 bg-white flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-green-600" />
              </span>
              Veg
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <span className="w-3.5 h-3.5 rounded-[3px] border-[1.5px] border-red-600 bg-white flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-red-600" />
              </span>
              Non-veg
            </span>
          </div>
        </div>

        {/* Category pills */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* ── Content ── */}
      <div className="px-4 pt-4">

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <span className="text-4xl opacity-20">🍽</span>
            <p className="text-sm text-gray-400">No items found</p>
          </div>
        ) : (
          <>
            <p className="text-[10px] text-gray-400 mb-3">
              {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {filteredItems.map((item) => (
                <MenuItemCard key={item._id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Cart Bar ── */}
      {cartCount > 0 && (
        <CartBar count={cartCount} total={cartTotal} />
      )}
    </div>
  );
}