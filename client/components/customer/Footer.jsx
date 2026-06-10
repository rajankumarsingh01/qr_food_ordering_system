"use client";

import { Heart, Utensils, Github, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
      {/* Subtle gradient top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30" />

      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <Utensils size={13} className="text-white" />
            </div>

            <span className="text-sm font-bold text-gray-900 dark:text-white">
              QR<span className="text-indigo-600">Food</span>
            </span>

            <span className="text-gray-300 dark:text-gray-700">·</span>

            <span className="text-xs text-gray-400">
              Scan. Order. Enjoy.
            </span>
          </div>

          {/* Made By */}
          <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-4 py-1.5 dark:border-gray-800 dark:bg-gray-900">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Made with
            </span>

            <Heart
              size={11}
              className="animate-pulse fill-red-500 text-red-500"
            />

            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              by Rajan Kumar Singh
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/rajankumarsingh01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
            >
              <Github size={13} />
            </a>

            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
            >
              <Linkedin size={13} />
            </a>

            <a
              href="https://qr-food-ordering-system-nine.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:hover:border-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-400"
            >
              <Globe size={13} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 flex flex-col items-center gap-1 border-t border-gray-50 pt-4 dark:border-gray-900 sm:flex-row sm:justify-between">
          <p className="text-[11px] text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} QRFood. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {["Privacy", "Terms", "Support"].map((item) => (
              <button
                key={item}
                className="text-[11px] text-gray-400 transition hover:text-indigo-500 dark:text-gray-600 dark:hover:text-indigo-400"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}