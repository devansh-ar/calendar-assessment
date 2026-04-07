"use client";

import { DAY_LABELS, DAY_LABELS_SHORT } from "@/utils/dateHelpers";
import DayCell from "@/components/molecules/DayCell";

function chunkWeeks(days) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export default function CalendarGrid({ days, getSelectionState, getNotesForDate, onDayClick, onDayHover }) {
  const weeks = chunkWeeks(days);

  return (
    <table className="w-full border-collapse" role="grid" aria-label="Calendar">
      <thead>
        <tr>
          {DAY_LABELS.map((label, i) => (
            <th
              key={label}
              className={`text-xs sm:text-sm font-semibold py-1 sm:py-2 text-center ${
                i >= 5 ? "text-sky-500" : "text-gray-500"
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
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
