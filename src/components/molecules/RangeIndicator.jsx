"use client";

import { daysBetween } from "@/utils/dateHelpers";

export default function RangeIndicator({ startDate, endDate, onClear, isDark }) {
  if (!startDate) return null;

  const label = endDate
    ? `${startDate} — ${endDate} (${daysBetween(startDate, endDate)} days)`
    : `${startDate} (select end date)`;

  return (
    <div className={`flex items-center justify-between px-5 py-2 text-xs no-print ${
      isDark ? "bg-violet-500/5 border-t border-white/5" : "bg-violet-50/60 border-t border-violet-100/60"
    }`}>
      <span className={isDark ? "text-violet-300/60" : "text-violet-600"}>{label}</span>
      <button
        onClick={onClear}
        className={`font-medium transition-colors ${isDark ? "text-white/30 hover:text-white/60" : "text-stone-400 hover:text-stone-600"}`}
      >
        Clear
      </button>
    </div>
  );
}
