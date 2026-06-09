





// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import type { RootState } from "../store";
// import { updateAccessToken, clearCredentials } from "../slices/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token =
//       (getState() as RootState).auth.accessToken ||
//       (typeof window !== "undefined" ? localStorage.getItem("accessToken") : null);

//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth: BaseQueryFn
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error?.status === 401) {
//     const refreshToken =
//       typeof window !== "undefined"
//         ? localStorage.getItem("refreshToken")
//         : undefined;

//     const refreshResult = await baseQuery(
//       {
//         url: "/auth/refresh-token",
//         method: "POST",
//         body: { refreshToken },
//       },
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       const data = refreshResult.data as {
//         data: { accessToken: string; refreshToken: string };
//       };

//       api.dispatch(updateAccessToken(data.data.accessToken));

//       if (typeof window !== "undefined") {
//         localStorage.setItem("accessToken", data.data.accessToken);
//         localStorage.setItem("refreshToken", data.data.refreshToken);
//       }

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(clearCredentials());
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/admin/login";
//       }
//     }
//   }

//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["Menu", "Order", "Review", "Analytics", "Auth"],
//   endpoints: () => ({}),
// });




import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "../store";
import { updateAccessToken, clearCredentials } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.accessToken ||
      (typeof window !== "undefined" ? localStorage.getItem("accessToken") : null);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : undefined;

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const data = refreshResult.data as {
        data: { accessToken: string; refreshToken: string };
      };

      api.dispatch(updateAccessToken(data.data.accessToken));

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
      }

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/admin/login";
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Menu", "Order", "Review", "Analytics", "Auth"],
  endpoints: () => ({}),
});