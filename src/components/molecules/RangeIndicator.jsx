"use client";

import { daysBetween } from "@/utils/dateHelpers";

export default function RangeIndicator({ startDate, endDate, onClear, isDark }) {
  if (!startDate) return null;

  const label = endDate
    ? `${startDate} — ${endDate} (${daysBetween(startDate, endDate)} days)`
    : `${startDate} (select end date)`;

  return (
    <div className={`flex items-center justify-between px-5 py-2.5 text-xs no-print border-t ${
      isDark ? "border-white/[0.04] bg-violet-500/[0.04]" : "border-violet-100/60 bg-violet-50/40"
    }`}>
      <span className={isDark ? "text-violet-300/70" : "text-violet-600"}>{label}</span>
      <button
        onClick={onClear}
        className={`font-medium text-[10px] uppercase tracking-wider transition-colors ${
          isDark ? "text-white/20 hover:text-rose-400" : "text-stone-400 hover:text-rose-500"
        }`}
      >
        Clear
      </button>
    </div>
  );
}
