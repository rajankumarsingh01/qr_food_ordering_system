import { baseApi } from "./baseApi";
import type { Review, CreateReviewRequest } from "@/types/review";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createReview: builder.mutation<ApiResponse<Review>, CreateReviewRequest>({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    getReviews: builder.query<ApiResponse<Review[]>, void>({
      query: () => "/reviews",
      providesTags: ["Review"],
    }),

    getReviewByOrder: builder.query<ApiResponse<Review> | null, string>({
      query: (orderId) => `/reviews/${orderId}`,
      // ✅ 404 ko error mat mano — simply null return karo
      transformErrorResponse: (response) => {
        if (response.status === 404) return null;
        return response;
      },
      providesTags: (result, error, orderId) => [{ type: "Review", id: orderId }],
    }),

  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsQuery,
  useGetReviewByOrderQuery,
} = reviewApi;