"use client"

import type { Category } from "@/types/menu"

interface CategoryFilterProps {
  categories: Category[]
  selected: string | null
  onChange: (id: string | null) => void
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4 py-3">
      <button
        onClick={() => onChange(null)}
        className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
          selected === null
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white text-gray-500 border-gray-200 hover:border-orange-300"
        }`}
      >
        All
      </button>
      {categories.filter((c) => c.isActive).map((cat) => (
        <button
          key={cat._id}
          onClick={() => onChange(cat._id)}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
            selected === cat._id
              ? "bg-orange-500 text-white border-orange-500"
              : "bg-white text-gray-500 border-gray-200 hover:border-orange-300"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}