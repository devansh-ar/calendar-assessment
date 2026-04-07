"use client";

import { DAY_LABELS, DAY_LABELS_SHORT } from "@/utils/dateHelpers";
import DayCell from "@/components/molecules/DayCell";

function chunkWeeks(days) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

export default function CalendarGrid({ days, getSelectionState, getNotesForDate, onDayClick, onDayHover, isDark }) {
  const weeks = chunkWeeks(days);

  return (
    <table className="w-full border-collapse" role="grid" aria-label="Calendar">
      <thead>
        <tr>
          {DAY_LABELS.map((label, i) => (
            <th
              key={label}
              className={`text-[10px] font-semibold pb-2.5 pt-1 text-center uppercase tracking-wider ${
                i >= 5
                  ? (isDark ? "text-violet-500/60" : "text-violet-400")
                  : (isDark ? "text-white/15" : "text-stone-400/80")
              }`}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{DAY_LABELS_SHORT[i]}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, wi) => (
          <tr key={wi}>
            {week.map((dayData) => (
              <DayCell
                key={dayData.dateStr}
                dayData={dayData}
                selectionState={getSelectionState(dayData.dateStr)}
                hasNotes={getNotesForDate(dayData.dateStr).length > 0}
                onClick={onDayClick}
                onMouseEnter={onDayHover}
                isDark={isDark}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
