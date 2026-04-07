"use client";

import { daysBetween } from "@/utils/dateHelpers";

export default function RangeIndicator({ startDate, endDate, onClear }) {
  if (!startDate) return null;

  const label = endDate
    ? `${startDate} — ${endDate} (${daysBetween(startDate, endDate)} days)`
    : `${startDate} (select end date)`;

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-sky-50 border-t border-sky-100 text-xs no-print">
      <span className="text-sky-700 font-medium">{label}</span>
      <button onClick={onClear} className="text-sky-500 hover:text-sky-700 transition-colors font-medium">
        Clear
      </button>
    </div>
  );
}
