// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { Admin, AuthState } from "@/types/auth";

// const initialState: AuthState = {
//   admin: null,
//   accessToken: null,
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (
//       state,
//       action: PayloadAction<{ admin: Admin; accessToken: string }>
//     ) => {
//       state.admin = action.payload.admin;
//       state.accessToken = action.payload.accessToken;
//       state.isAuthenticated = true;
//     },
//     updateAccessToken: (state, action: PayloadAction<string>) => {
//       state.accessToken = action.payload;
//     },
//     clearCredentials: (state) => {
//       state.admin = null;
//       state.accessToken = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { setCredentials, updateAccessToken, clearCredentials } =
//   authSlice.actions;
// export default authSlice.reducer;









import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Admin, AuthState } from "@/types/auth";

// ✅ localStorage se initial state load karo
const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return { admin: null, accessToken: null, isAuthenticated: false };
  }
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      return { admin: null, accessToken: token, isAuthenticated: true };
    }
  } catch {}
  return { admin: null, accessToken: null, isAuthenticated: false };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ admin: Admin; accessToken: string }>
    ) => {
      state.admin = action.payload.admin;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload);
      }
    },
    clearCredentials: (state) => {
      state.admin = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },
  },
});

export const { setCredentials, updateAccessToken, clearCredentials } =
  authSlice.actions;
export default authSlice.reducer;