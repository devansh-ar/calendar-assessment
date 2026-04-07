"use client";

import SunIcon from "@/components/atoms/SunIcon";
import MoonIcon from "@/components/atoms/MoonIcon";

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all no-print"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <SunIcon className="w-5 h-5 text-amber-500" /> : <MoonIcon className="w-5 h-5 text-gray-600" />}
    </button>
  );
}
