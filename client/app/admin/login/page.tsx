// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { Eye, EyeOff, UtensilsCrossed } from "lucide-react";
// import { useState } from "react";

// import { loginSchema, type LoginFormData } from "@/schemas/login.schema";
// import { useLoginMutation } from "@/redux/api/authApi";
// import { setCredentials } from "@/redux/slices/authSlice";
// import type { AppDispatch } from "@/redux/store";

// export default function AdminLoginPage() {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const [showPassword, setShowPassword] = useState(false);
//   const [login, { isLoading }] = useLoginMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormData>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginFormData) => {
//     try {
//       const response = await login(data).unwrap();

//       dispatch(
//         setCredentials({
//           admin: response.data.admin,
//           accessToken: response.data.accessToken,
//         })
//       );

//       toast.success(`Welcome back, ${response.data.admin.name}!`);
//       router.push("/admin/dashboard");
//     } catch (error) {
//       const err = error as { data?: { message?: string } };
//       toast.error(err?.data?.message ?? "Invalid email or password");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
//       <div className="w-full max-w-md">

//         {/* Logo */}
//         <div className="mb-8 text-center">
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600">
//             <UtensilsCrossed size={32} className="text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Admin Login
//           </h1>
//           <p className="mt-1 text-sm text-gray-500">
//             QR Food Ordering System
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="rounded-2xl border bg-white p-8 shadow-sm dark:bg-gray-900">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//             {/* Email */}
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Email
//               </label>
//               <input
//                 {...register("email")}
//                 type="email"
//                 placeholder="admin@qrfood.com"
//                 autoComplete="email"
//                 className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   {...register("password")}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                   className="w-full rounded-lg border px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((p) => !p)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                   Signing in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//             </button>

//           </form>

//           {/* Demo credentials */}
//           <div className="mt-6 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
//             <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
//               Demo credentials
//             </p>
//             <p className="text-xs text-gray-600 dark:text-gray-300">
//               admin@qrfood.com / Admin@123
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }






"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, UtensilsCrossed } from "lucide-react";
import { useState } from "react";

import { loginSchema, type LoginFormData } from "@/schemas/login.schema";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import type { AppDispatch } from "@/redux/store";

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();

      dispatch(
        setCredentials({
          admin: response.data.admin,
          accessToken: response.data.accessToken,
        })
      );

      // ✅ localStorage mein save karo
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      toast.success(`Welcome back, ${response.data.admin.name}!`);

      // ✅ Hard redirect
      window.location.href = "/admin/dashboard";

    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message ?? "Invalid email or password");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f7] px-4 dark:bg-gray-950">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 dark:bg-gray-800">
            <UtensilsCrossed size={22} className="text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5 mb-px animate-pulse" />
            QR Food Ordering — Admin
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-gray-900">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                Email address
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="admin@qrfood.com"
                  autoComplete="email"
                  className={`w-full rounded-lg border bg-gray-50 pl-9 pr-4 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:bg-white focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-600 dark:focus:bg-gray-750 ${errors.email ? "border-red-300" : "border-gray-100 dark:border-gray-700"
                    }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
                Password
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full rounded-lg border bg-gray-50 pl-9 pr-10 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-300 focus:border-gray-400 focus:bg-white dark:bg-gray-800 dark:text-white ${errors.password ? "border-red-300" : "border-gray-100 dark:border-gray-700"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
              <span className="text-[10px] text-gray-300 uppercase tracking-wider">demo credentials</span>
              <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className="rounded-lg bg-gray-50 px-3 py-2.5 space-y-2 dark:bg-gray-800">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide mb-1">
                Login details
              </p>
              {[
                { label: "Email", value: "admin@qrfood.com" },
                { label: "Password", value: "Admin@123" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{value}</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(value)}
                    className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 transition"
                  >
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}