"use client";

import { getHoliday } from "@/data/holidays";
import Dot from "@/components/atoms/Dot";

function getStyles(state, isCurrent, isWeekend, isToday, isDark) {
  let base = "relative flex items-center justify-center h-9 sm:h-10 text-[13px] sm:text-sm rounded-lg transition-all duration-150 select-none";

  if (!isCurrent) {
    return { cell: base, text: isDark ? "text-white/[0.06]" : "text-stone-200" };
  }

  if (state === "start" || state === "single" || state === "end") {
    return {
      cell: `${base} bg-violet-600 text-white font-bold shadow-md shadow-violet-600/25`,
      text: "",
    };
  }

  if (state === "in-range") {
    return {
      cell: `${base} ${isDark ? "bg-violet-500/[0.08]" : "bg-violet-50"}`,
      text: isDark ? "text-violet-200" : "text-violet-700",
    };
  }

  let text = isWeekend
    ? (isDark ? "text-violet-400" : "text-violet-500 font-medium")
    : (isDark ? "text-white/60" : "text-stone-600");

  const hover = isDark ? "hover:bg-white/[0.04]" : "hover:bg-violet-50/70";
  const today = isToday ? `font-bold ring-1.5 ${isDark ? "ring-violet-500/30" : "ring-violet-400/40"}` : "";

  return { cell: `${base} cursor-pointer ${hover} ${today}`, text };
}

export default function DayCell({ dayData, selectionState, hasNotes, onClick, onMouseEnter, isDark }) {
  const { day, isCurrentMonth, isToday, dateStr } = dayData;
  const holiday = isCurrentMonth ? getHoliday(dateStr) : null;
  const dow = new Date(dayData.year, dayData.month, dayData.day).getDay();
  const isWeekend = dow === 0 || dow === 6;

  const s = getStyles(selectionState, isCurrentMonth, isWeekend, isToday, isDark);

  return (
    <td className="p-px">
      <button
        className={`${s.cell} ${s.text} w-full`}
        onClick={() => isCurrentMonth && onClick(dateStr)}
        onMouseEnter={() => isCurrentMonth && onMouseEnter(dateStr)}
        aria-label={`${day}${holiday ? `, ${holiday}` : ""}`}
        title={holiday || undefined}
        disabled={!isCurrentMonth}
      >
        {day}
        {hasNotes && <Dot color="bg-amber-400" />}
        {holiday && !hasNotes && <Dot color="bg-rose-400" />}
      </button>
    </td>
  );
}
