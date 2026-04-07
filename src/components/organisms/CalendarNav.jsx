"use client";

import IconButton from "@/components/atoms/IconButton";
import ChevronLeft from "@/components/atoms/ChevronLeft";
import ChevronRight from "@/components/atoms/ChevronRight";

export default function CalendarNav({ onPrev, onNext, onToday, isDark }) {
  const arrow = isDark
    ? "hover:bg-white/[0.04] text-white/25 hover:text-white/50"
    : "hover:bg-violet-50 text-stone-400 hover:text-violet-500";

  return (
    <div className="flex items-center justify-between px-5 py-3 no-print">
      <IconButton onClick={onPrev} label="Previous month" className={arrow}>
        <ChevronLeft className="w-4 h-4" />
      </IconButton>

      <button
        onClick={onToday}
        className={`text-[11px] px-5 py-1.5 rounded-full font-semibold tracking-wider transition-all ${
          isDark
            ? "bg-violet-500/10 text-violet-300 border border-violet-500/15 hover:bg-violet-500/20"
            : "bg-violet-50 text-violet-600 border border-violet-200/50 hover:bg-violet-100"
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
