"use client"

import { Search, X } from "lucide-react"

interface MenuSearchBarProps {
  value: string
  onChange: (val: string) => void
}

export default function MenuSearchBar({ value, onChange }: MenuSearchBarProps) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
      <input
        type="text"
        placeholder="Search dishes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-8 pr-8 py-2 rounded-xl border border-gray-100 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-orange-300 focus:bg-white transition"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}