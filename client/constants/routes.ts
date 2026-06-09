export const ROUTES = {
  // Customer
  MENU: "/customer/menu",
  CART: "/customer/cart",
  PAYMENT_SUCCESS: "/customer/payment-success",
  REVIEW: "/customer/review",
  ORDER_TRACKING: (orderId: string) => `/customer/order/${orderId}`,

  // Admin
  ADMIN_LOGIN: "/admin/login",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_MENU: "/admin/menu",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_QR: "/admin/qr",
  ADMIN_REVIEWS: "/admin/reviews",

  // Kitchen
  KITCHEN: "/kitchen",
} as const