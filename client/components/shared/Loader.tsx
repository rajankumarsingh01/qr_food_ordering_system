export default function Loader() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-[2.5px] border-orange-100 border-t-orange-500 animate-spin" />
        <p className="text-xs text-gray-400 font-medium">Loading menu…</p>
      </div>
    </div>
  )
}