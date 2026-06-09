"use client";

import { MenuItem } from "@/types/menu";
import { useCart } from "@/hooks/useCart";

interface Props {
    item: MenuItem;
}

export default function MenuCard({
    item,
}: Props) {
    const { addToCart } = useCart();

    return (
        <div className="overflow-hidden rounded-xl border">
            <img
                src={item.image}
                alt={item.name}
                className="h-52 w-full object-cover"
            />

            <div className="space-y-2 p-4">
                <h3 className="font-semibold">
                    {item.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                    {
                        item.description
                    }
                </p>

                <div className="flex items-center justify-between">
                    <span className="font-bold">
                        ₹
                        {item.price}
                    </span>

                   <button
  disabled={!item.isAvailable}
  onClick={() =>
    addToCart({
      menuItemId: item._id,

      name: item.name,

      price: item.price,

  image: item.image ?? "",

      quantity: 1,

      specialNote: "",
    })
  }
  className="rounded-lg border px-4 py-2"
>
  {item.isAvailable
    ? "Add"
    : "Out of Stock"}
</button>
                </div>
            </div>
        </div>
    );
}