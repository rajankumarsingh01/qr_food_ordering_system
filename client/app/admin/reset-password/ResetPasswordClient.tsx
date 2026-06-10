"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { KeyRound, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/api/authApi";

const schema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm password"),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const [done, setDone] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Invalid reset link.");
      return;
    }
    try {
      await resetPassword({ token, newPassword: data.newPassword }).unwrap();
      setDone(true);
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message ?? "Failed to reset password.");
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <p className="text-red-500">Invalid or missing reset token.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <CheckCircle size={56} className="mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Password Reset!
          </h2>
          <p className="mt-2 text-gray-500">
            Your password has been updated successfully.
          </p>
          <button
            onClick={() => router.push("/admin/login")}
            className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600">
            <KeyRound size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Set New Password
          </h1>
        </div>

        <div className="rounded-2xl border bg-white p-8 shadow-sm dark:bg-gray-900">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <div className="relative">
                <input
                  {...register("newPassword")}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border px-4 py-2.5 pr-10 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}