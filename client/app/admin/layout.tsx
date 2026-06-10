








// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   UtensilsCrossed,
//   ClipboardList,
//   BarChart2,
//   QrCode,
//   Star,
//   ChefHat,
// } from "lucide-react";
// import LogoutButton from "@/components/admin/LogoutButton";
// import AdminGuard from "@/components/admin/AdminGuard";

// const NAV_SECTIONS = [
//   {
//     label: "Overview",
//     links: [
//       { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
//     ],
//   },
//   {
//     label: "Manage",
//     links: [
//       { href: "/admin/menu",   label: "Menu",       icon: UtensilsCrossed },
//       { href: "/admin/orders", label: "Orders",     icon: ClipboardList },
//       { href: "/admin/qr",     label: "QR Manager", icon: QrCode },
//     ],
//   },
//   {
//     label: "Insights",
//     links: [
//       { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
//       { href: "/admin/reviews",   label: "Reviews",   icon: Star },
//     ],
//   },
// ];

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   return (
//     <div className="flex min-h-screen bg-[#f5f5f0]">

//       {/* ── Sidebar ── */}
//       <aside className="flex w-[220px] flex-col bg-[#0f0f0f] shrink-0 sticky top-0 h-screen">

//         {/* Brand */}
//         <div className="px-4 py-5 border-b border-white/[0.06]">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
//               <ChefHat size={16} className="text-white" />
//             </div>
//             <div>
//               <p className="text-[14px] font-bold text-[#f0f0f0] leading-tight tracking-tight">
//                 zap<span className="text-orange-500">eats</span>
//               </p>
//               <p className="text-[10px] text-[#444] uppercase tracking-widest mt-0.5">
//                 Admin Panel
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 px-2 py-3 space-y-4 overflow-y-auto">
//           {NAV_SECTIONS.map((section) => (
//             <div key={section.label}>
//               <p className="px-2 mb-1 text-[9px] font-semibold text-[#444] uppercase tracking-[.08em]">
//                 {section.label}
//               </p>
//               <div className="space-y-0.5">
//                 {section.links.map(({ href, label, icon: Icon }) => {
//                   const active = pathname === href || pathname.startsWith(href + "/");
//                   return (
//                     <Link
//                       key={href}
//                       href={href}
//                       className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
//                         active
//                           ? "bg-orange-500/[0.12] text-orange-500"
//                           : "text-[#666] hover:bg-white/[0.05] hover:text-[#ccc]"
//                       }`}
//                     >
//                       <Icon size={15} className="shrink-0" />
//                       {label}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="px-2 pb-4 border-t border-white/[0.06] pt-3">
//           <div className="flex items-center gap-2.5 px-2.5 py-2 mb-1">
//             <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[11px] font-semibold text-[#666] shrink-0">
//               AD
//             </div>
//             <div className="min-w-0">
//               <p className="text-xs font-medium text-[#aaa] truncate">Admin</p>
//               <p className="text-[10px] text-[#444] truncate">Restaurant owner</p>
//             </div>
//           </div>
//           <LogoutButton />
//         </div>
//       </aside>

//       {/* ── Main ── */}
//       <main className="flex-1 overflow-auto">
//         {children}
//       </main>
//     </div>
//   );
// }








"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  BarChart2,
  QrCode,
  Star,
  ChefHat,
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminGuard from "@/components/admin/AdminGuard";

const NAV_SECTIONS = [
  {
    label: "Overview",
    links: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Manage",
    links: [
      { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
      { href: "/admin/orders", label: "Orders", icon: ClipboardList },
      { href: "/admin/qr", label: "QR Manager", icon: QrCode },
    ],
  },
  {
    label: "Insights",
    links: [
      { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
      { href: "/admin/reviews", label: "Reviews", icon: Star },
    ],
  },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[220px] flex-col bg-[#0f0f0f] shrink-0 sticky top-0 h-screen">

      {/* Brand */}
      <div className="px-4 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shrink-0">
            <ChefHat size={16} className="text-white" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-[#f0f0f0] leading-tight tracking-tight">
              zap<span className="text-orange-500">eats</span>
            </p>
            <p className="text-[10px] text-[#444] uppercase tracking-widest mt-0.5">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-4 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="px-2 mb-1 text-[9px] font-semibold text-[#444] uppercase tracking-[.08em]">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.links.map(({ href, label, icon: Icon }) => {
                const active =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? "bg-orange-500/[0.12] text-orange-500"
                        : "text-[#666] hover:bg-white/[0.05] hover:text-[#ccc]"
                    }`}
                  >
                    <Icon size={15} className="shrink-0" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 border-t border-white/[0.06] pt-3">
        <div className="flex items-center gap-2.5 px-2.5 py-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[11px] font-semibold text-[#666] shrink-0">
            AD
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#aaa] truncate">Admin</p>
            <p className="text-[10px] text-[#444] truncate">Restaurant owner</p>
          </div>
        </div>
        <LogoutButton />
      </div>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ✅ AdminGuard — bina login ke koi page nahi khulega
    <AdminGuard>
      <div className="flex min-h-screen bg-[#f5f5f0]">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}