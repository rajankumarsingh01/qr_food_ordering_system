"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCredentials } from "@/redux/slices/authSlice";
import { useLogoutMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { admin, isAuthenticated, accessToken } = useAppSelector(
    (state) => state.auth
  );
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // server error ho to bhi local clear karo
    } finally {
      // ✅ Redux clear
      dispatch(clearCredentials());

      // ✅ localStorage manually clear karo — sab keys
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("qr_current_order");
        localStorage.removeItem("qr_cart_items");
        localStorage.removeItem("qr_table_number");
      }

      toast.success("Logged out successfully");

      // ✅ Hard redirect — Next.js router cache bhi clear ho
      window.location.href = "/admin/login";
    }
  };

  return { admin, isAuthenticated, accessToken, logout };
}