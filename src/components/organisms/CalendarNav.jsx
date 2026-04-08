"use client";

import IconButton from "@/components/atoms/IconButton";
import ChevronLeft from "@/components/atoms/ChevronLeft";
import ChevronRight from "@/components/atoms/ChevronRight";

export default function CalendarNav({ onPrev, onNext, onToday, isDark }) {
  const arrow = isDark
    ? "hover:bg-white/5 text-white/30 hover:text-white/60"
    : "hover:bg-stone-50 text-stone-400 hover:text-stone-600";

  return (
    <div className="flex items-center justify-between px-5 py-3 no-print">
      <IconButton onClick={onPrev} label="Previous month" className={arrow}>
        <ChevronLeft className="w-4 h-4" />
      </IconButton>

      <button
        onClick={onToday}
        className={`text-[11px] px-5 py-1.5 rounded-md font-semibold tracking-wider transition-all ${
          isDark
            ? "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
            : "bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100"
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
