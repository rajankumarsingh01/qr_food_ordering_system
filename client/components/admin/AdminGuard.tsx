"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // localStorage se bhi check karo
    const localToken = localStorage.getItem("accessToken");

    if (!isAuthenticated && !localToken) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Token nahi hai to kuch mat dikhao
  const localToken =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  if (!isAuthenticated && !localToken) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}