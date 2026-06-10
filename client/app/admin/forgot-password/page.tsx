"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";

const schema = z.object({
  email: z.string().min(1, "Email required").email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data).unwrap();
      setSent(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-950">
        <div className="w-full max-w-md text-center">
          <CheckCircle size={56} className="mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Check Your Email
          </h2>
          <p className="mt-2 text-gray-500">
            If this email exists, a reset link has been sent.
          </p>
          <Link
            href="/admin/login"
            className="mt-6 inline-block text-sm text-indigo-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-950">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600">
            <Mail size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Forgot Password
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-8 shadow-sm dark:bg-gray-900">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="admin@qrfood.com"
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>

        <Link
          href="/admin/login"
          className="mt-4 flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={14} />
          Back to Login
        </Link>

      </div>
    </div>
  );
}