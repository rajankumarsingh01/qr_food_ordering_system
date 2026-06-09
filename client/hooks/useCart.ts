"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  updateSpecialNote,
  clearCart,
} from "@/redux/slices/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const totalAmount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart.items]
  );

  const totalItems = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
    [cart.items]
  );

  return {
    cart,
    totalAmount,
    totalItems,
    addToCart: (data: Parameters<typeof addToCart>[0]) => dispatch(addToCart(data)),
    increaseQuantity: (id: string) => dispatch(increaseQuantity(id)),
    decreaseQuantity: (id: string) => dispatch(decreaseQuantity(id)),
    removeFromCart: (id: string) => dispatch(removeFromCart(id)),
    updateSpecialNote: (menuItemId: string, specialNote: string) =>
      dispatch(updateSpecialNote({ menuItemId, specialNote })),
    clearCart: () => dispatch(clearCart()),
  };
};