"use client"

import { useState } from "react"
import { Plus, Minus, Clock } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import type { MenuItem } from "@/types/menu"

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()
  const [imgError, setImgError] = useState(false)

  const cartItem = cart.items.find((i) => i.menuItemId === item._id)
  const quantity = cartItem?.quantity ?? 0

  const handleAdd = () => {
    if (!item.isAvailable) return
    if (quantity === 0) {
      addToCart({
        menuItemId: item._id,
        name: item.name,
        image: item.image ?? "",
        price: item.price,
        quantity: 1,
      })
    } else {
      increaseQuantity(item._id)
    }
  }

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all ${
      item.isAvailable ? "border-gray-100" : "border-gray-100 opacity-60"
    }`}>
      {/* Image */}
      <div className="relative w-full h-[90px] bg-[#f7f3ee]">
        {item.image && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl opacity-30">🍽</span>
          </div>
        )}

        {/* Veg/Non-veg indicator */}
        <div className={`absolute top-1.5 left-1.5 w-3.5 h-3.5 rounded-[3px] border-[1.5px] bg-white flex items-center justify-center ${
          item.isVeg ? "border-green-600" : "border-red-600"
        }`}>
          <div className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
        </div>

        {/* Unavailable overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-[10px] font-medium text-gray-400 bg-white px-2.5 py-1 rounded-full border border-gray-200">
              Not available
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-2.5 flex flex-col gap-1.5">
        <div>
          <h3 className="text-xs font-semibold text-gray-900 leading-snug">{item.name}</h3>
          {item.description && (
            <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {item.preparationTime && (
          <div className="flex items-center gap-1 text-[10px] text-gray-300">
            <Clock size={10} />
            <span>{item.preparationTime} mins</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-0.5">
          <span className="text-sm font-semibold text-gray-900">₹{item.price}</span>

          {item.isAvailable && (
            quantity === 0 ? (
              <button
                onClick={handleAdd}
                className="px-3 py-1 rounded-lg bg-orange-500 text-white text-[11px] font-semibold hover:bg-orange-600 transition active:scale-95"
              >
                Add
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-lg px-1.5 py-1">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="w-5 h-5 flex items-center justify-center rounded hover:bg-orange-100 transition"
                >
                  <Minus size={11} className="text-orange-500" />
                </button>
                <span className="text-xs font-semibold text-orange-500 min-w-[14px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleAdd}
                  className="w-5 h-5 flex items-center justify-center rounded hover:bg-orange-100 transition"
                >
                  <Plus size={11} className="text-orange-500" />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}