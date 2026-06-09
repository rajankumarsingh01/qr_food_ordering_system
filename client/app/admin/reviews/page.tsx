"use client"

import { useState, useMemo } from "react"
import { useGetReviewsQuery } from "@/redux/api/reviewApi"
import type { Review } from "@/types/review"
import { Star } from "lucide-react"
import Loader from "@/components/shared/Loader"

// ── Star Display Component ─────────────────────────────────────────
function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  )
}

// ── Review Card ────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
            T{review.tableNumber}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Table {review.tableNumber}
            </p>
            <p className="text-xs text-gray-400">{date}</p>
          </div>
        </div>
        <StarDisplay rating={review.rating} />
      </div>

      {review.comment ? (
        <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
          "{review.comment}"
        </p>
      ) : (
        <p className="text-sm text-gray-400 italic border-t border-gray-50 pt-3">
          No comment left
        </p>
      )}
    </div>
  )
}

// ── Filter Bar ─────────────────────────────────────────────────────
function FilterBar({
  selected,
  onChange,
  counts,
}: {
  selected: number | null
  onChange: (val: number | null) => void
  counts: Record<number, number>
}) {
  const filters: { label: string; value: number | null }[] = [
    { label: "All", value: null },
    { label: "5 ★", value: 5 },
    { label: "4 ★", value: 4 },
    { label: "3 ★", value: 3 },
    { label: "2 ★", value: 2 },
    { label: "1 ★", value: 1 },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const count = f.value === null
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[f.value] ?? 0)

        return (
          <button
            key={String(f.value)}
            onClick={() => onChange(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              selected === f.value
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
            }`}
          >
            {f.label}
            <span className="ml-1.5 text-xs opacity-70">({count})</span>
          </button>
        )
      })}
    </div>
  )
}

// ── Average Rating Summary ─────────────────────────────────────────
function RatingSummary({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length

  return (
    <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 flex items-center gap-6">
      <div className="text-center">
        <p className="text-4xl font-bold text-orange-500">{avg.toFixed(1)}</p>
        <StarDisplay rating={Math.round(avg)} />
        <p className="text-xs text-gray-500 mt-1">{reviews.length} reviews</p>
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = reviews.filter((r) => r.rating === star).length
          const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0
          return (
            <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-4 text-right">{star}</span>
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-yellow-400 h-full rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-5">{count}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────
export default function AdminReviewsPage() {
  const { data, isLoading, isError } = useGetReviewsQuery()
  const [filterRating, setFilterRating] = useState<number | null>(null)

  const reviews = data?.data ?? []

  const ratingCounts = useMemo(() => {
    return reviews.reduce<Record<number, number>>((acc, r) => {
      acc[r.rating] = (acc[r.rating] ?? 0) + 1
      return acc
    }, {})
  }, [reviews])

  const filtered = useMemo(() => {
    if (filterRating === null) return reviews
    return reviews.filter((r) => r.rating === filterRating)
  }, [reviews, filterRating])

  // ── States ──
  if (isLoading) return <Loader />

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load reviews. Please try again.
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">
            All feedback from your customers
          </p>
        </div>

        {/* Summary */}
        <RatingSummary reviews={reviews} />

        {/* Filter */}
        <FilterBar
          selected={filterRating}
          onChange={setFilterRating}
          counts={ratingCounts}
        />

        {/* List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Star size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">
              {filterRating !== null
                ? `No ${filterRating}-star reviews yet`
                : "No reviews yet"}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}