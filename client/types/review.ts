export interface Review {
  _id: string;
  orderId: string;
  tableNumber: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewRequest {
  orderId: string;
  rating: number;
  comment?: string;
}