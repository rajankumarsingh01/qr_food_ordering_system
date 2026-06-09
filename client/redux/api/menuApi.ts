import { baseApi } from "./baseApi";
import type { MenuItem, Category } from "@/types/menu";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}


export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getMenuItems: builder.query<ApiResponse<MenuItem[]>, void>({
      query: () => "/menu",
      providesTags: ["Menu"],
    }),

    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => "/menu/categories",
      providesTags: ["Menu"],
    }),

    createMenuItem: builder.mutation<ApiResponse<MenuItem>, FormData>({
      query: (formData) => ({
        url: "/menu",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Menu"],
    }),

    toggleAvailability: builder.mutation<ApiResponse<MenuItem>, string>({
      query: (id) => ({
        url: `/menu/${id}/availability`,
        method: "PATCH",
      }),
      invalidatesTags: ["Menu"],
    }),

    deleteMenuItem: builder.mutation<ApiResponse<object>, string>({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),

  }),
});

export const {
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
  useCreateMenuItemMutation,
  useToggleAvailabilityMutation,
  useDeleteMenuItemMutation,
} = menuApi;