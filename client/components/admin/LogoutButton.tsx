// "use client";
// import { useLogoutMutation } from "@/redux/api/authApi";
// import { useRouter } from "next/navigation";
// import { LogOut } from "lucide-react";
// import toast from "react-hot-toast";

// export default function LogoutButton() {
// const [logoutUser, { isLoading }] = useLogoutMutation();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await logoutUser().unwrap();
//       router.push("/admin/login");
//     } catch {
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       disabled={isLoading}
//       className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/30"
//     >
//       <LogOut size={16} />
//       {isLoading ? "Logging out..." : "Logout"}
//     </button>
//   );
// }









"use client";

import { useLogoutMutation } from "@/redux/api/authApi";
import { clearCredentials } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const [logoutUser, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      // server error ho to bhi local clear karo
    } finally {
      // ✅ Redux clear
      dispatch(clearCredentials());

      // ✅ localStorage sab clear karo
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("qr_current_order");
        localStorage.removeItem("qr_cart_items");
        localStorage.removeItem("qr_table_number");
      }

      toast.success("Logged out successfully");

      // ✅ Hard redirect
      window.location.href = "/admin/login";
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-[#555] hover:bg-red-500/[0.08] hover:text-red-400 transition-all disabled:opacity-40"
    >
      <LogOut size={14} className="shrink-0" />
      {isLoading ? "Signing out…" : "Sign out"}
    </button>
  );
}