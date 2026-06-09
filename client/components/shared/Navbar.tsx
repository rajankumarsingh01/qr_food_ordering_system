"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { ShoppingCart, UtensilsCrossed, ClipboardList, Star } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const tableNumber = useAppSelector((state) => state.cart.tableNumber);
  const totalItems = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const currentOrderId = useAppSelector((state) => state.order.currentOrder?._id);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ mounted ke baad computed — SSR pe hamesha static URLs
  const menuUrl = mounted && tableNumber
    ? `/customer/menu?table=${tableNumber}`
    : "/customer/menu";

  const orderUrl = mounted && currentOrderId
    ? `/customer/order/${currentOrderId}`
    : "/customer/cart";

  const reviewUrl = mounted && currentOrderId
    ? `/customer/review?orderId=${currentOrderId}`
    : "/customer/review";

  const navLinks = [
    { href: menuUrl, label: "Menu", icon: UtensilsCrossed, match: "/customer/menu" },
    { href: orderUrl, label: "My Order", icon: ClipboardList, match: "/customer/order" },
    { href: reviewUrl, label: "Review", icon: Star, match: "/customer/review" },
  ];

  return (
    <nav className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur-md dark:bg-gray-950/80 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400"
        >
          <span className="text-xl">🍽️</span>
          <span className="text-base tracking-tight">QR Food</span>
        </Link>

        {/* Table badge — mounted ke baad */}
        {mounted && tableNumber && (
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            Table #{tableNumber}
          </span>
        )}

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon, match }) => {
            const isActive = pathname.startsWith(match);
            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}

          {/* Cart button */}
          <Link
            href="/customer/cart"
            className={`relative ml-1 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
              pathname === "/customer/cart"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            <ShoppingCart size={15} />
            <span className="hidden sm:inline">Cart</span>

            {mounted && totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}