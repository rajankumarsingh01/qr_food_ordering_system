import { baseApi } from "./baseApi";
import type {
  RevenueStat,
  TopItem,
  PeakHour,
  ApiResponse,
} from "@/types/analytics";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueAnalytics: builder.query<ApiResponse<RevenueStat[]>, void>({
      query: () => "/analytics/revenue",
      providesTags: ["Analytics"],
    }),

    getTopItems: builder.query<ApiResponse<TopItem[]>, void>({
      query: () => "/analytics/top-items",
      providesTags: ["Analytics"],
    }),

    getPeakHours: builder.query<ApiResponse<PeakHour[]>, void>({
      query: () => "/analytics/peak-hours",
      providesTags: ["Analytics"],
    }),
  }),
});

export const {
  useGetRevenueAnalyticsQuery,
  useGetTopItemsQuery,
  useGetPeakHoursQuery,
} = analyticsApi;