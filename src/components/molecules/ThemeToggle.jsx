"use client";

import SunIcon from "@/components/atoms/SunIcon";
import MoonIcon from "@/components/atoms/MoonIcon";

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-5 right-5 z-50 w-9 h-9 flex items-center justify-center rounded-full transition-colors no-print ${
        isDark
          ? "bg-white/5 hover:bg-white/10 text-white/40"
          : "bg-stone-100 hover:bg-stone-200 text-stone-500"
      }`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </button>
  );
}
