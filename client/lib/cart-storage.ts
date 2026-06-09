import { CartState } from "@/types/cart";

const STORAGE_KEY = "qr-food-cart";

export const saveCartToStorage = (
  cart: CartState
) => {
  if (typeof window === "undefined")
    return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(cart)
  );
};

export const loadCartFromStorage =
  (): CartState | null => {
    if (
      typeof window === "undefined"
    )
      return null;

    const stored =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!stored) return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  };

export const clearCartStorage =
  () => {
    if (
      typeof window === "undefined"
    )
      return;

    localStorage.removeItem(
      STORAGE_KEY
    );
  };