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
      dispatch(clearCredentials());
      toast.success("Logged out successfully");
      router.push("/admin/login");
    }
  };

  return { admin, isAuthenticated, accessToken, logout };
}