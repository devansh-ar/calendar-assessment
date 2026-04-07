"use client";

import IconButton from "@/components/atoms/IconButton";
import ChevronLeft from "@/components/atoms/ChevronLeft";
import ChevronRight from "@/components/atoms/ChevronRight";

export default function CalendarNav({ onPrev, onNext, onToday, isDark }) {
  const arrow = isDark ? "hover:bg-white/5 text-white/30 hover:text-white/60" : "hover:bg-stone-50 text-stone-400 hover:text-stone-600";

  return (
    <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 no-print">
      <IconButton onClick={onPrev} label="Previous month" className={arrow}>
        <ChevronLeft className="w-4 h-4" />
      </IconButton>

      <button
        onClick={onToday}
        className={`text-[11px] px-4 py-1 rounded-full font-semibold tracking-wider transition-colors ${
          isDark
            ? "bg-violet-500/15 text-violet-300 hover:bg-violet-500/25"
            : "bg-violet-50 text-violet-600 hover:bg-violet-100"
        }`}
      >
        Today
      </button>

      <IconButton onClick={onNext} label="Next month" className={arrow}>
        <ChevronRight className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
