export interface CartItem {
  menuItemId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  specialNote?: string;  // ✓ make optional to match the slice
}

export interface CartState {
  tableNumber: number | null;
  items: CartItem[];
  totalAmount: number;    // ← add karo
  totalItems: number;     // ← add karo
}