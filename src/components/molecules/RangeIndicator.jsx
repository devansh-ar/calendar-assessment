"use client";

import { daysBetween } from "@/utils/dateHelpers";

export default function RangeIndicator({ startDate, endDate, onClear, isDark }) {
  if (!startDate) return null;

  const label = endDate
    ? `${startDate} — ${endDate} (${daysBetween(startDate, endDate)} days)`
    : `${startDate} (select end date)`;

  return (
    <div className={`flex items-center justify-between px-5 py-2.5 text-xs no-print border-t ${
      isDark ? "border-[#2a2a2a] bg-white/[0.02]" : "border-[#e5e5e5] bg-stone-50/50"
    }`}>
      <span className={isDark ? "text-white/60" : "text-stone-600"}>{label}</span>
      <button
        onClick={onClear}
        className={`font-medium text-[10px] uppercase tracking-wider transition-colors ${
          isDark ? "text-white/30 hover:text-rose-400" : "text-stone-400 hover:text-rose-500"
        }`}
      >
        Clear
      </button>
    </div>
  );
}
