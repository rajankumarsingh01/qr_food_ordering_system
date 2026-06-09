export interface Category {
  _id: string;
  name: string;
  isActive: boolean;
}

export interface MenuItem {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isVeg: boolean;
  isAvailable: boolean;
  preparationTime?: number;
  category: Category;
}

export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  category: string;
  isVeg: boolean;
  preparationTime?: number;
  image?: File;
}