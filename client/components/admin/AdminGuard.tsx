// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/redux/hooks";

// export default function AdminGuard({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const { isAuthenticated, accessToken } = useAppSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     // localStorage se bhi check karo
//     const localToken = localStorage.getItem("accessToken");

//     if (!isAuthenticated && !localToken) {
//       router.replace("/admin/login");
//     }
//   }, [isAuthenticated, router]);

//   // Token nahi hai to kuch mat dikhao
//   const localToken =
//     typeof window !== "undefined"
//       ? localStorage.getItem("accessToken")
//       : null;

//   if (!isAuthenticated && !localToken) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
//       </div>
//     );
//   }

//   return <>{children}</>;
// }



"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (isAuthenticated || token) {
      setAllowed(true);
    } else {
      // ✅ router nahi — window.location use karo
      window.location.replace("/admin/login");
    }

    setChecked(true);
  }, []); // ← empty dependency — sirf mount pe ek baar

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f5f0]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}