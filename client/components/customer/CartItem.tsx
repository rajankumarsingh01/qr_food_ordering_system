"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { CartItem as ItemType } from "@/types/cart";

import { useCart } from "@/hooks/useCart";

interface Props {
  item: ItemType;
}

export default function CartItem({
  item,
}: Props) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    updateSpecialNote,
  } = useCart();

  return (
    <div className="rounded-xl border p-4">
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold">
            {item.name}
          </h3>

          <p>
            ₹{item.price}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() =>
                decreaseQuantity(
                  item.menuItemId
                )
              }
            >
              <Minus size={16} />
            </button>

            <span>
              {item.quantity}
            </span>

            <button
              onClick={() =>
                increaseQuantity(
                  item.menuItemId
                )
              }
            >
              <Plus size={16} />
            </button>

            <button
              onClick={() =>
                removeFromCart(
                  item.menuItemId
                )
              }
              className="ml-auto"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <textarea
            value={item.specialNote}
            placeholder="Special instructions..."
            onChange={(e) =>
              updateSpecialNote(
                item.menuItemId,
                e.target.value
              )
            }
            className="mt-3 w-full rounded-lg border p-2"
          />
        </div>
      </div>
    </div>
  );
}