import { z } from "zod";

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number({ error: "Price is required" }).min(1, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  isVeg: z.boolean(),
  preparationTime: z.number().optional(),
});

export type MenuItemFormData = z.infer<typeof menuItemSchema>;