export interface JoinTablePayload {
  tableId: string;

  tableNumber: number;
}

export interface JoinAdminPayload {
  restaurantId: string;
}

export interface JoinKitchenPayload {
  restaurantId: string;
}