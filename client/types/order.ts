export type OrderStatus =
  | "received"
  | "preparing"
  | "ready"
  | "served";

export interface OrderItem {
  menuItem: string;

  name: string;

  price: number;

  quantity: number;

  specialNote?: string;
}

export interface Order {
  _id: string;

  tableNumber: number;

  items: OrderItem[];

  totalAmount: number;

   status: OrderStatus;

  paymentStatus:
    | "pending"
    | "paid"
    | "failed";

  createdAt: string;
}