import { baseApi } from "./baseApi";
import type { LoginRequest, LoginResponse, RefreshTokenResponse } from "@/types/auth";
import type { Admin } from "@/types/auth";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<ApiResponse<object>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),

    getCurrentAdmin: builder.query<ApiResponse<Admin>, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentAdminQuery,
} = authApi;