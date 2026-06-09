// "use client";

// import { useState } from "react";
// import { Plus, Search } from "lucide-react";
// import toast from "react-hot-toast";

// import MenuItemCard from "@/components/admin/menu/MenuItemCard";
// import CreateMenuModal from "@/components/admin/menu/CreateMenuModel";
// import {
//   useGetMenuItemsQuery,
//   useGetCategoriesQuery,
//   useToggleAvailabilityMutation,
//   useDeleteMenuItemMutation,
// } from "@/redux/api/menuApi";

// export default function AdminMenuPage() {
//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");

//   const { data: menuData, isLoading, isError } = useGetMenuItemsQuery();
//   const { data: categoriesData } = useGetCategoriesQuery();
//   const [toggleAvailability, { isLoading: isToggling }] = useToggleAvailabilityMutation();
//   const [deleteMenuItem, { isLoading: isDeleting }] = useDeleteMenuItemMutation();

//   const handleToggle = async (id: string) => {
//     try {
//       await toggleAvailability(id).unwrap();
//       toast.success("Availability updated");
//     } catch {
//       toast.error("Failed to update");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this item?")) return;
//     try {
//       await deleteMenuItem(id).unwrap();
//       toast.success("Item deleted");
//     } catch {
//       toast.error("Failed to delete");
//     }
//   };

//   // Filters
//   const filtered = (menuData?.data ?? []).filter((item) => {
//     const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
//     const matchCategory = selectedCategory === "all" || item.category._id === selectedCategory;
//     const matchVeg =
//       vegFilter === "all" ||
//       (vegFilter === "veg" && item.isVeg) ||
//       (vegFilter === "nonveg" && !item.isVeg);
//     return matchSearch && matchCategory && matchVeg;
//   });

//   // Loading
//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
//       </div>
//     );
//   }

//   // Error
//   if (isError) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <p className="text-red-500">Failed to load menu. Please refresh.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">

//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Menu Manager</h1>
//           <p className="text-sm text-gray-500">{menuData?.data.length ?? 0} items total</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
//         >
//           <Plus size={16} />
//           Add Item
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="mb-6 flex flex-wrap gap-3">
//         {/* Search */}
//         <div className="relative flex-1 min-w-48">
//           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search items..."
//             className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         {/* Category filter */}
//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//         >
//           <option value="all">All Categories</option>
//           {categoriesData?.data.map((cat) => (
//             <option key={cat._id} value={cat._id}>{cat.name}</option>
//           ))}
//         </select>

//         {/* Veg filter */}
//         <div className="flex rounded-lg border dark:border-gray-700 overflow-hidden">
//           {(["all", "veg", "nonveg"] as const).map((v) => (
//             <button
//               key={v}
//               onClick={() => setVegFilter(v)}
//               className={`px-3 py-2 text-sm transition ${
//                 vegFilter === v
//                   ? "bg-indigo-600 text-white"
//                   : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//               }`}
//             >
//               {v === "all" ? "All" : v === "veg" ? "🟢 Veg" : "🔴 Non-Veg"}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Empty State */}
//       {filtered.length === 0 ? (
//         <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed dark:border-gray-700">
//           <p className="text-gray-500">No items found</p>
//           <button
//             onClick={() => setShowModal(true)}
//             className="text-sm text-indigo-600 hover:underline"
//           >
//             Add your first item
//           </button>
//         </div>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {filtered.map((item) => (
//             <MenuItemCard
//               key={item._id}
//               item={item}
//               onToggle={handleToggle}
//               onDelete={handleDelete}
//               isToggling={isToggling}
//               isDeleting={isDeleting}
//             />
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && <CreateMenuModal onClose={() => setShowModal(false)} />}
//     </div>
//   );
// }


















"use client";

import { useState } from "react";
import { Plus, Search, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

import MenuItemCard from "@/components/admin/menu/MenuItemCard";
import CreateMenuModal from "@/components/admin/menu/CreateMenuModel";
import {
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
  useToggleAvailabilityMutation,
  useDeleteMenuItemMutation,
} from "@/redux/api/menuApi";

export default function AdminMenuPage() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");

  const { data: menuData, isLoading, isError } = useGetMenuItemsQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const [toggleAvailability, { isLoading: isToggling }] = useToggleAvailabilityMutation();
  const [deleteMenuItem, { isLoading: isDeleting }] = useDeleteMenuItemMutation();

  const handleToggle = async (id: string) => {
    try {
      await toggleAvailability(id).unwrap();
      toast.success("Availability updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteMenuItem(id).unwrap();
      toast.success("Item deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = (menuData?.data ?? []).filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === "all" || item.category._id === selectedCategory;
    const matchVeg =
      vegFilter === "all" ||
      (vegFilter === "veg" && item.isVeg) ||
      (vegFilter === "nonveg" && !item.isVeg);
    return matchSearch && matchCategory && matchVeg;
  });

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f7] dark:bg-gray-950">
      <div className="flex flex-col items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
        <p className="text-xs text-gray-400">Loading menu...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-red-400">Failed to load menu. Please refresh.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f8f7] p-5 dark:bg-gray-950">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Menu manager</h1>
          <p className="text-xs text-gray-400 mt-0.5">{menuData?.data.length ?? 0} items total</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-gray-800 active:scale-[0.98] dark:bg-gray-700"
        >
          <Plus size={13} />
          Add item
        </button>
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[160px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full rounded-lg border border-gray-100 bg-white py-2 pl-8 pr-3 text-xs outline-none placeholder:text-gray-300 focus:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Category dropdown */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none rounded-lg border border-gray-100 bg-white py-2 pl-3 pr-7 text-xs text-gray-600 outline-none focus:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All categories</option>
            {categoriesData?.data.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Veg filter */}
        <div className="flex overflow-hidden rounded-lg border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
          {(["all", "veg", "nonveg"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setVegFilter(v)}
              className={`px-3 py-2 text-xs font-medium transition ${
                vegFilter === v
                  ? v === "veg"
                    ? "bg-green-600 text-white"
                    : v === "nonveg"
                    ? "bg-red-500 text-white"
                    : "bg-gray-900 text-white dark:bg-gray-600"
                  : "text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              {v === "all" ? "All" : v === "veg" ? "Veg" : "Non-veg"}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4"/>
            </svg>
          </div>
          <p className="text-sm text-gray-400">No items found</p>
          <button onClick={() => setShowModal(true)} className="text-xs text-orange-500 hover:underline">
            Add your first item
          </button>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((item) => (
            <MenuItemCard
              key={item._id}
              item={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
              isToggling={isToggling}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}

      {showModal && <CreateMenuModal onClose={() => setShowModal(false)} />}
    </div>
  );
}