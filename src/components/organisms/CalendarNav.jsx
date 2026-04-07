"use client";

import IconButton from "@/components/atoms/IconButton";
import ChevronLeft from "@/components/atoms/ChevronLeft";
import ChevronRight from "@/components/atoms/ChevronRight";

export default function CalendarNav({ onPrev, onNext, onToday }) {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 py-2 no-print">
      <IconButton onClick={onPrev} label="Previous month" className="hover:bg-gray-100">
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </IconButton>

      <button
        onClick={onToday}
        className="text-xs px-3 py-1 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors font-medium"
      >
        Today
      </button>

      <IconButton onClick={onNext} label="Next month" className="hover:bg-gray-100">
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </IconButton>
    </div>
  );
}
