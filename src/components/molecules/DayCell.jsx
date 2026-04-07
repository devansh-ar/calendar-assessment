"use client";

import { getHoliday } from "@/data/holidays";
import Dot from "@/components/atoms/Dot";

function buildCellStyles(selectionState, isCurrentMonth, isWeekend, isToday) {
  let cell = "relative flex items-center justify-center h-8 sm:h-9 text-sm sm:text-base cursor-pointer transition-all duration-150 select-none";
  let text = "";

  if (selectionState === "start" || selectionState === "single" || selectionState === "end") {
    cell += " bg-sky-500 text-white rounded-full font-semibold";
  } else if (selectionState === "in-range") {
    cell += " bg-sky-100";
  } else {
    if (!isCurrentMonth) text = "text-gray-300";
    else if (isWeekend) text = "text-sky-500 font-medium";
    else text = "text-gray-700";
    cell += " hover:bg-gray-50 rounded-full";
  }

  if (isToday && !selectionState) {
    cell += " ring-2 ring-sky-400 ring-offset-1";
  }

  return { cell, text };
}

export default function DayCell({ dayData, selectionState, hasNotes, onClick, onMouseEnter }) {
  const { day, isCurrentMonth, isToday, dateStr } = dayData;
  const holiday = isCurrentMonth ? getHoliday(dateStr) : null;
  const dayOfWeek = new Date(dayData.year, dayData.month, dayData.day).getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const styles = buildCellStyles(selectionState, isCurrentMonth, isWeekend, isToday);

  return (
    <td className="p-0">
      <button
        className={`${styles.cell} ${styles.text} w-full`}
        onClick={() => isCurrentMonth && onClick(dateStr)}
        onMouseEnter={() => isCurrentMonth && onMouseEnter(dateStr)}
        aria-label={`${day}${holiday ? `, ${holiday}` : ""}`}
        title={holiday || undefined}
        disabled={!isCurrentMonth}
      >
        {day}
        {hasNotes && <Dot color="bg-amber-400" />}
        {holiday && !hasNotes && <Dot color="bg-red-400" />}
      </button>
    </td>
  );
}
