// import Link from "next/link"

// export default function HomePage() {
//   return (
//     <main className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="text-center space-y-6">
//         <h1 className="text-3xl font-bold text-gray-900">QR Food Ordering</h1>
//         <p className="text-gray-500 text-sm">Select your role to continue</p>

//         <div className="flex flex-col gap-3 min-w-[240px]">
//           <Link
//             href="/customer/menu?table=1"
//             className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl text-sm transition text-center"
//           >
//             Customer Menu (Table 1)
//           </Link>

//           <Link
//             href="/admin/login"
//             className="w-full py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl text-sm transition text-center"
//           >
//             Admin Panel
//           </Link>

//           <Link
//             href="/kitchen"
//             className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition text-center"
//           >
//             Kitchen Display
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }













import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-5 py-8">
      {/* Hero Icon */}
      <div className="w-18 h-18 bg-orange-500 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-white text-4xl">⊞</span>
      </div>

      <p className="text-orange-500 text-xs font-medium tracking-widest uppercase mb-3">
        Scan. Order. Enjoy.
      </p>
      <h1 className="text-white text-3xl font-medium text-center leading-tight mb-2">
        QR Food<br />Ordering
      </h1>
      <p className="text-gray-500 text-sm text-center mb-10 leading-relaxed">
        Fast, contactless ordering<br />right from your table
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        {/* Customer */}
        <Link href="/customer/menu?table=1"
          className="flex items-center gap-4 p-4 bg-orange-500 hover:bg-orange-600 rounded-2xl transition">
          <div className="w-11 h-11 bg-black/15 rounded-xl flex items-center justify-center text-white text-xl">🍽</div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Browse Menu</p>
            <p className="text-orange-200 text-xs">Table 1 — scan QR to order</p>
          </div>
          <span className="text-white/50">→</span>
        </Link>

        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-gray-600 text-xs">staff access</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Admin */}
        <Link href="/admin/login"
          className="flex items-center gap-4 p-4 bg-[#181818] hover:bg-[#1f1f1f] border border-white/5 rounded-2xl transition">
          <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-gray-400 text-xl">⊟</div>
          <div className="flex-1">
            <p className="text-gray-100 font-medium text-sm">Admin panel</p>
            <p className="text-gray-500 text-xs">Manage orders & menu</p>
          </div>
          <span className="text-gray-600">→</span>
        </Link>

        {/* Kitchen */}
        <Link href="/kitchen"
          className="flex items-center gap-4 p-4 bg-[#181818] hover:bg-[#1f1f1f] border border-white/5 rounded-2xl transition">
          <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 text-xl">👨‍🍳</div>
          <div className="flex-1">
            <p className="text-gray-100 font-medium text-sm">Kitchen display</p>
            <p className="text-gray-500 text-xs">Live order queue</p>
          </div>
          <span className="text-gray-600">→</span>
        </Link>
      </div>

      <p className="mt-10 text-xs text-gray-700 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        System online
      </p>
    </main>
  );
}



