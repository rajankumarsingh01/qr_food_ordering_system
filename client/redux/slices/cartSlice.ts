import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState } from "@/types/cart";

const TABLE_KEY = "qr_table_number";
const CART_KEY = "qr_cart_items";

const getInitialState = (): CartState => {
  if (typeof window === "undefined") {
    return { tableNumber: null, items: [], totalAmount: 0, totalItems: 0 };
  }
  try {
    const items: CartItem[] = JSON.parse(
      localStorage.getItem(CART_KEY) ?? "[]"
    );
    const tableNumber = localStorage.getItem(TABLE_KEY)
      ? Number(localStorage.getItem(TABLE_KEY))
      : null;
    return {
      tableNumber,
      items,
      totalAmount: items.reduce((s, i) => s + i.price * i.quantity, 0),
      totalItems: items.reduce((s, i) => s + i.quantity, 0),
    };
  } catch {
    return { tableNumber: null, items: [], totalAmount: 0, totalItems: 0 };
  }
};

const recalc = (state: CartState) => {
  state.totalAmount = state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  state.totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
};

const persist = (state: CartState) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(state.items));
  if (state.tableNumber !== null) {
    localStorage.setItem(TABLE_KEY, String(state.tableNumber));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState,
  reducers: {
    setTableNumber: (state, action: PayloadAction<number>) => {
      state.tableNumber = action.payload;
      persist(state);
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) => i.menuItemId === action.payload.menuItemId
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      recalc(state);
      persist(state);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.menuItemId === action.payload);
      if (item) item.quantity += 1;
      recalc(state);
      persist(state);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.menuItemId === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.menuItemId !== action.payload
          );
        }
      }
      recalc(state);
      persist(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (i) => i.menuItemId !== action.payload
      );
      recalc(state);
      persist(state);
    },

    updateSpecialNote: (
      state,
      action: PayloadAction<{ menuItemId: string; specialNote: string }>
    ) => {
      const item = state.items.find(
        (i) => i.menuItemId === action.payload.menuItemId
      );
      if (item) item.specialNote = action.payload.specialNote;
      persist(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      if (typeof window !== "undefined") {
        localStorage.removeItem(CART_KEY);
      }
    },
  },
});

export const {
  setTableNumber,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  updateSpecialNote,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;