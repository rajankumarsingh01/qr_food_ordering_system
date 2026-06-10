// "use client";

// import { Heart, Utensils, Globe } from "lucide-react";
// import { FaGithub, FaLinkedinIn } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="relative mt-auto overflow-hidden border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
//       {/* Subtle gradient top */}
//       <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30" />

//       <div className="mx-auto max-w-5xl px-4 py-6">
//         <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
//           {/* Brand */}
//           <div className="flex items-center gap-2">
//             <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
//               <Utensils size={13} className="text-white" />
//             </div>

//             <span className="text-sm font-bold text-gray-900 dark:text-white">
//               QR<span className="text-indigo-600">Food</span>
//             </span>

//             <span className="text-gray-300 dark:text-gray-700">·</span>

//             <span className="text-xs text-gray-400">
//               Scan. Order. Enjoy.
//             </span>
//           </div>

//           {/* Made By */}
//           <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5 dark:border-gray-800 dark:bg-gray-900">
//             <span className="text-xs text-gray-500 dark:text-gray-400">
//               Made with
//             </span>

//             <Heart
//               size={11}
//               className="animate-pulse fill-red-500 text-red-500"
//             />

//             <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
//               by Rajan Kumar Singh
//             </span>
//           </div>

//           {/* Social Links */}
//           <div className="flex items-center gap-3">
//             <a
//               href="https://github.com/rajankumarsingh01"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="GitHub"
//               className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
//             >
//               <FaGithub size={13} />
//             </a>

//             <a
//               href="https://linkedin.com/in/your-linkedin"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="LinkedIn"
//               className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
//             >
//               <FaLinkedinIn size={13} />
//             </a>

//             <a
//               href="https://qr-food-ordering-system-nine.vercel.app"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Website"
//               className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
//             >
//               <Globe size={13} />
//             </a>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-4 flex flex-col items-center gap-1 border-t border-gray-50 pt-4 dark:border-gray-900 sm:flex-row sm:justify-between">
//           <p className="text-[11px] text-gray-400 dark:text-gray-600">
//             © {new Date().getFullYear()} QRFood. All rights reserved.
//           </p>

//           <div className="flex items-center gap-3">
//             {["Privacy", "Terms", "Support"].map((item) => (
//               <button
//                 key={item}
//                 type="button"
//                 className="text-[11px] text-gray-400 transition hover:text-indigo-500 dark:text-gray-600 dark:hover:text-indigo-400"
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }







"use client";

import { Heart, Utensils, Globe, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const PRODUCT_LINKS = [
  { label: "How it works", href: "#" },
  { label: "For restaurants", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Changelog", href: "#" },
];

const CONNECT_LINKS = [
  { label: "GitHub", href: "https://github.com/rajankumarsingh01", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-linkedin", icon: FaLinkedinIn },
  { label: "Live demo", href: "https://qr-food-ordering-system-nine.vercel.app", icon: Globe },
];

const LEGAL_LINKS = ["Privacy", "Terms", "Support"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] border-t border-white/[0.06]">

      {/* QR dot-grid texture — signature element */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #f97316 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Top orange glow line */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #f97316 40%, #fb923c 60%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {/* Logo mark */}
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  boxShadow: "0 0 16px rgba(249,115,22,0.35)",
                }}
              >
                <Utensils size={15} className="text-white" />
              </div>

              <span className="text-[22px] font-black tracking-tight text-white">
                QR<span className="text-orange-500">Food</span>
              </span>
            </div>

            <p className="text-sm text-white/40 leading-relaxed max-w-[200px]">
              Scan a QR code, browse the menu, place your order — no app needed.
            </p>

            {/* Live badge */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
              <span
                className="relative flex h-2 w-2"
                aria-hidden
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-emerald-400 tracking-wide">
                Live
              </span>
              <span className="text-xs text-white/30">· System operational</span>
            </div>

            {/* Made with */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-white/30">Made with</span>
              <Heart
                size={10}
                className="fill-orange-500 text-orange-500 animate-pulse"
              />
              <span className="text-xs font-semibold text-white/60">
                Rajan Kumar Singh
              </span>
            </div>
          </div>

          {/* Col 2 — spacer on mobile, used in grid */}
          <div className="hidden lg:block" />

          {/* Col 3 — Product */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.15em] text-orange-500">
              Product
            </p>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group flex items-center gap-1 text-sm text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.15em] text-orange-500">
              Connect
            </p>
            <ul className="flex flex-col gap-3 mb-6">
              {CONNECT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1 text-sm text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/* Icon buttons */}
            <div className="flex items-center gap-2">
              {CONNECT_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all duration-200 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} QRFood · All rights reserved
          </p>

          <div className="flex items-center gap-1">
            {LEGAL_LINKS.map((item, i) => (
              <span key={item} className="flex items-center">
                {i > 0 && (
                  <span className="mx-2 text-[11px] text-white/10">·</span>
                )}
                <button
                  type="button"
                  className="text-[11px] text-white/25 transition-colors duration-200 hover:text-orange-400"
                >
                  {item}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}