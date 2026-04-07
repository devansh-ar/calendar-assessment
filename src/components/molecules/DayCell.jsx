"use client";

import { getHoliday } from "@/data/holidays";
import Dot from "@/components/atoms/Dot";

function getStyles(state, isCurrent, isWeekend, isToday, isDark) {
  let base = "relative flex items-center justify-center h-8 sm:h-9 text-[13px] sm:text-sm rounded-lg transition-colors duration-150 select-none";

  if (!isCurrent) {
    return {
      cell: base,
      text: isDark ? "text-white/8" : "text-stone-200",
    };
  }

  if (state === "start" || state === "single" || state === "end") {
    return {
      cell: `${base} bg-violet-600 text-white font-semibold shadow-sm`,
      text: "",
    };
  }

  if (state === "in-range") {
    return {
      cell: `${base} ${isDark ? "bg-violet-500/10" : "bg-violet-50"}`,
      text: isDark ? "text-violet-200" : "text-violet-700",
    };
  }

  let text;
  if (isWeekend) {
    text = isDark ? "text-violet-400" : "text-violet-500";
  } else {
    text = isDark ? "text-white/70" : "text-stone-600";
  }

  const hover = isDark ? "hover:bg-white/5" : "hover:bg-stone-50";
  const todayRing = isToday ? (isDark ? "ring-1 ring-violet-500/40" : "ring-1 ring-violet-400/50") : "";

  return {
    cell: `${base} cursor-pointer ${hover} ${todayRing}`,
    text: `${text} ${isToday ? "font-bold" : ""}`,
  };
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
