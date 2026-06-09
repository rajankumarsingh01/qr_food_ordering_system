import { Trash2 } from "lucide-react";
import Image from "next/image";
import type { MenuItem } from "@/types/menu";

interface Props {
  item: MenuItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isToggling: boolean;
  isDeleting: boolean;
}

export default function MenuItemCard({ item, onToggle, onDelete, isToggling, isDeleting }: Props) {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white overflow-hidden transition dark:border-gray-800 dark:bg-gray-900 ${!item.isAvailable ? "opacity-55" : ""}`}>
      {/* Image */}
      <div className="relative h-[80px] w-full bg-[#f7f3ee] dark:bg-gray-800 flex items-center justify-center">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        ) : (
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-300" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 110 20A10 10 0 0112 2zm0 0v10l4 2"/>
          </svg>
        )}

        {/* Veg badge */}
        <span className={`absolute top-1.5 left-1.5 flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
          item.isVeg ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-500"}`} />
          {item.isVeg ? "Veg" : "Non-veg"}
        </span>

        {/* Unavailable overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded-full border border-gray-200">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-2.5">
        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
        <p className="text-[10px] text-gray-400 mt-0.5 mb-1.5">{item.category.name}</p>
        <p className="text-sm font-semibold text-orange-500 mb-2.5">₹{item.price}</p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToggle(item._id)}
            disabled={isToggling}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition disabled:opacity-50 ${
              item.isAvailable
                ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-950 dark:text-green-400"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
            }`}
          >
            {item.isAvailable ? "Available" : "Unavailable"}
          </button>
          <button
            onClick={() => onDelete(item._id)}
            disabled={isDeleting}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 transition disabled:opacity-50 dark:bg-red-950"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}