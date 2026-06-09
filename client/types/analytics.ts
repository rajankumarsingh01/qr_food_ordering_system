export interface RevenueStat {
  _id: string;        // "2024-01-15"
  totalRevenue: number;
  totalOrders: number;
}

export interface TopItem {
  _id: string;        // item name
  totalQuantity: number;
  revenue: number;
}

export interface PeakHour {
  _id: number;        // 0-23 (hour)
  totalOrders: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}