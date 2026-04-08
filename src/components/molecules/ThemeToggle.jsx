"use client";

import SunIcon from "@/components/atoms/SunIcon";
import MoonIcon from "@/components/atoms/MoonIcon";

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all no-print ${
        isDark
          ? "bg-white/5 border border-white/10 hover:bg-white/10 text-white/50"
          : "bg-stone-50 border border-stone-200 hover:bg-stone-100 text-stone-500"
      }`}
      aria-label={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
    </button>
  );
}
