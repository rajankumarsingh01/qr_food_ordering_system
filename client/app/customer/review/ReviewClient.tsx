// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { CheckCircle, MessageSquare } from "lucide-react";

// import { reviewSchema, type ReviewFormData } from "@/schemas/review.schema";
// import { useCreateReviewMutation, useGetReviewByOrderQuery } from "@/redux/api/reviewApi";
// import StarRating from "@/components/customer/StarRating";

// export default function ReviewClient() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const orderId = searchParams.get("orderId") ?? "";

//   const [submitted, setSubmitted] = useState(false);
//   const [createReview, { isLoading }] = useCreateReviewMutation();

// // ✅ error bhi check karo — 404 pe form dikhao
// const {
//   data: existingReview,
//   isError: reviewNotFound,
// } = useGetReviewByOrderQuery(orderId, {
//   skip: !orderId,
// });

// // existingReview check mein — reviewNotFound ho to form dikhao
// if (existingReview?.data && !reviewNotFound) {
//   // already reviewed UI
// }

//   const {
//     control,
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<ReviewFormData>({
//     resolver: zodResolver(reviewSchema),
//     defaultValues: { rating: 0, comment: "" },
//   });

//   const currentRating = watch("rating");

//   const onSubmit = async (data: ReviewFormData) => {
//     if (!orderId) {
//       toast.error("Order ID missing.");
//       return;
//     }
//     try {
//       await createReview({
//         orderId,
//         rating: data.rating,
//         comment: data.comment,
//       }).unwrap();
//       setSubmitted(true);
//     } catch (error) {
//       const err = error as { data?: { message?: string } };
//       toast.error(err?.data?.message ?? "Failed to submit review.");
//     }
//   };

// if (!orderId) {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-950">
//       <div className="w-full max-w-md text-center">
//         <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100">
//           <MessageSquare size={26} className="text-yellow-600" />
//         </div>
//         <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//           No Order Found
//         </h2>
//         <p className="mt-2 text-sm text-gray-500">
//           Please complete an order first, then leave a review.
//         </p>
//         <button
//           onClick={() => router.push("/customer/menu")}
//           className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
//         >
//           Go to Menu
//         </button>
//       </div>
//     </div>
//   );
// }

//   if (existingReview?.data) {
//     return (
//       <div className="flex min-h-screen items-center justify-center p-6">
//         <div className="w-full max-w-md text-center">
//           <CheckCircle size={56} className="mx-auto mb-4 text-green-500" />
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Already Reviewed!</h2>
//           <p className="mt-2 text-gray-500">You have already submitted a review for this order.</p>
//           <div className="mt-4 flex justify-center gap-1 text-xl">
//             {[1, 2, 3, 4, 5].map((s) => (
//               <span key={s} className={s <= existingReview.data.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
//             ))}
//           </div>
//           {existingReview.data.comment && (
//             <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">"{existingReview.data.comment}"</p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   if (submitted) {
//     return (
//       <div className="flex min-h-screen items-center justify-center p-6">
//         <div className="w-full max-w-md text-center">
//           <CheckCircle size={56} className="mx-auto mb-4 text-green-500" />
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Thank You!</h2>
//           <p className="mt-2 text-gray-500">Your feedback helps us serve you better.</p>
//           <button
//             onClick={() => router.push("/customer/menu")}
//             className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
//           >
//             Back to Menu
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 dark:bg-gray-950">
//       <div className="w-full max-w-md">
//         <div className="mb-6 text-center">
//           <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
//             <MessageSquare size={26} className="text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rate Your Experience</h1>
//           <p className="mt-1 text-sm text-gray-500">How was your meal today?</p>
//         </div>

//         <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-gray-900">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//             <div>
//               <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Your Rating *
//               </label>
//               <Controller
//                 name="rating"
//                 control={control}
//                 render={({ field }) => (
//                   <StarRating value={field.value} onChange={field.onChange} />
//                 )}
//               />
//               {errors.rating && (
//                 <p className="mt-1 text-xs text-red-500">{errors.rating.message}</p>
//               )}
//               {currentRating > 0 && (
//                 <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
//                   {["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][currentRating]}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Comment (optional)
//               </label>
//               <textarea
//                 {...register("comment")}
//                 rows={3}
//                 placeholder="Tell us about your experience..."
//                 className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading || currentRating === 0}
//               className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                   Submitting...
//                 </span>
//               ) : (
//                 "Submit Review"
//               )}
//             </button>

//           </form>
//         </div>

//         <p className="mt-4 text-center text-xs text-gray-400">
//           Order #{orderId.slice(-6).toUpperCase()}
//         </p>
//       </div>
//     </div>
//   );
// }











"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CheckCircle, MessageSquare, Star } from "lucide-react";

import { reviewSchema, type ReviewFormData } from "@/schemas/review.schema";
import { useCreateReviewMutation, useGetReviewByOrderQuery } from "@/redux/api/reviewApi";
import StarRating from "@/components/customer/StarRating";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent!"];

export default function ReviewClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const { data: existingReview, isError: reviewNotFound } = useGetReviewByOrderQuery(orderId, {
    skip: !orderId,
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: "" },
  });

  const currentRating = watch("rating");

  const onSubmit = async (data: ReviewFormData) => {
    if (!orderId) {
      toast.error("Order ID missing.");
      return;
    }
    try {
      await createReview({
        orderId,
        rating: data.rating,
        comment: data.comment,
      }).unwrap();
      setSubmitted(true);
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message ?? "Failed to submit review.");
    }
  };

  // ── No order ID ──
  if (!orderId) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-2.5">
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
              <MessageSquare size={24} className="text-orange-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">No order found</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Please complete an order first, then come back to leave a review.
            </p>
          </div>
          <button
            onClick={() => router.push("/customer/menu")}
            className="w-full bg-orange-500 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
          >
            Go to menu
          </button>
        </div>
      </div>
    );
  }

  // ── Already reviewed ──
  if (existingReview?.data && !reviewNotFound) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-2.5">
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <CheckCircle size={28} className="text-green-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Already reviewed</h2>
            <p className="text-xs text-gray-400 mb-4">
              You've already submitted a review for this order.
            </p>

            {/* Star display */}
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={20}
                  className={s <= existingReview.data.rating ? "text-orange-400 fill-orange-400" : "text-gray-200 fill-gray-200"}
                />
              ))}
            </div>

            {existingReview.data.comment && (
              <div className="w-full bg-[#f5f5f0] rounded-xl px-4 py-3">
                <p className="text-xs text-gray-500 leading-relaxed italic">
                  "{existingReview.data.comment}"
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => router.push("/customer/menu")}
            className="w-full bg-white rounded-2xl border border-gray-100 px-5 py-3 text-sm font-medium text-gray-500 active:scale-[0.98] transition-transform"
          >
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  // ── Submitted success ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-2.5">
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <CheckCircle size={28} className="text-green-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Thank you!</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your feedback helps us serve you better.
            </p>
            <p className="mt-3 text-[10px] text-gray-300 font-mono">
              Order #{orderId.slice(-6).toUpperCase()}
            </p>
          </div>
          <button
            onClick={() => router.push("/customer/menu")}
            className="w-full bg-orange-500 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
          >
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  // ── Review form ──
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm space-y-2.5">

        {/* Header */}
        <div className="text-center mb-1">
          <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={24} className="text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Rate your experience</h1>
          <p className="text-xs text-gray-400 mt-1">How was your meal today?</p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-100 px-5 py-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Star rating */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-3">Your rating</p>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarRating value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.rating && (
                <p className="mt-1.5 text-[10px] text-red-500">{errors.rating.message}</p>
              )}
              {currentRating > 0 && (
                <p className="mt-2 text-xs font-medium text-orange-500">
                  {RATING_LABELS[currentRating]}
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-[#f0f0f0]" />

            {/* Comment */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Comment
                <span className="ml-1 text-gray-300 font-normal">optional</span>
              </p>
              <textarea
                {...register("comment")}
                rows={3}
                placeholder="Tell us about your experience..."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 text-xs text-gray-900 placeholder-gray-300 outline-none focus:border-orange-300 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || currentRating === 0}
              className="w-full bg-orange-500 rounded-2xl py-3.5 text-sm font-semibold text-white active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit review"
              )}
            </button>

          </form>
        </div>

        {/* Order ID footer */}
        <p className="text-center text-[10px] text-gray-300 font-mono">
          Order #{orderId.slice(-6).toUpperCase()}
        </p>

      </div>
    </div>
  );
}