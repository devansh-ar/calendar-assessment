"use client";

import SunIcon from "@/components/atoms/SunIcon";
import MoonIcon from "@/components/atoms/MoonIcon";

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-xl transition-all no-print ${
        isDark
          ? "bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-white/30"
          : "bg-white border border-violet-100/60 hover:border-violet-200 text-stone-500 shadow-sm"
      }`}
      aria-label={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </button>
  );
}
