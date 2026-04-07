"use client";

import { useState, useEffect, useCallback } from "react";
import useCalendar from "@/hooks/useCalendar";
import useRangeSelection from "@/hooks/useRangeSelection";
import useNotes from "@/hooks/useNotes";
import { MONTH_NAMES } from "@/utils/dateHelpers";

import SpiralBinding from "@/components/molecules/SpiralBinding";
import HeroImage from "@/components/organisms/HeroImage";
import CalendarNav from "@/components/organisms/CalendarNav";
import CalendarGrid from "@/components/organisms/CalendarGrid";
import InlineNotes from "@/components/organisms/InlineNotes";
import NotesPanel from "@/components/organisms/NotesPanel";
import RangeIndicator from "@/components/molecules/RangeIndicator";
import ThemeToggle from "@/components/molecules/ThemeToggle";

const SWIPE_THRESHOLD = 80;
const MONTH_ICON = ["❄️","💜","🌸","🌧️","🌻","☀️","🏔️","🌅","🍂","🎃","🍁","⛄"];

export default function CalendarPage() {
  const { currentMonth, currentYear, days, flipDirection, navigateMonth, goToToday } = useCalendar();
  const { startDate, endDate, handleDayClick, handleDayHover, clearSelection, getSelectionState } = useRangeSelection();
  const { notes, addNote, updateNote, deleteNote, getNotesForDate } = useNotes(currentYear, currentMonth);

  const [isDark, setIsDark] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const handleTouchStart = useCallback((e) => setTouchStartX(e.touches[0].clientX), []);
  const handleTouchEnd = useCallback((e) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) navigateMonth(diff > 0 ? -1 : 1);
    setTouchStartX(null);
  }, [touchStartX, navigateMonth]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") navigateMonth(-1);
      if (e.key === "ArrowRight") navigateMonth(1);
      if (e.key === "Escape") clearSelection();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigateMonth, clearSelection]);

  const card = isDark ? "cal-card-dark gradient-border-dark" : "cal-card-light gradient-border-light";
  const divider = isDark ? "border-white/[0.04]" : "border-violet-100/60";

  return (
    <div className={`min-h-screen ${isDark ? "page-dark" : "page-light"}`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">

        <header className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 fade-up">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-violet-500" : "bg-violet-400"}`} />
              <p className={`text-[11px] uppercase tracking-[0.3em] font-medium ${isDark ? "text-violet-400/40" : "text-violet-400"}`}>
                Personal planner
              </p>
            </div>
            <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-stone-800"}`}>
              My Calendar
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`badge-pill border ${isDark ? "bg-violet-500/8 text-violet-300 border-violet-500/12" : "bg-violet-50 text-violet-600 border-violet-200/50"}`}>
              {MONTH_ICON[currentMonth]} {MONTH_NAMES[currentMonth]}
            </span>
            {startDate && (
              <span className={`badge-pill border ${isDark ? "bg-emerald-500/8 text-emerald-300 border-emerald-500/12" : "bg-emerald-50 text-emerald-600 border-emerald-200/50"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Range active
              </span>
            )}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 fade-up-delay">

          <div
            className={`flex-shrink-0 w-full lg:w-[460px] overflow-hidden ${card}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <SpiralBinding isDark={isDark} />
            <HeroImage month={currentMonth} year={currentYear} flipDirection={flipDirection} />

            <CalendarNav
              onPrev={() => navigateMonth(-1)}
              onNext={() => navigateMonth(1)}
              onToday={goToToday}
              isDark={isDark}
            />

            <div className={`mx-5 border-t ${divider}`} />

            <div className="flex flex-col sm:flex-row px-5 py-4 gap-0">
              <div className={`hidden sm:block sm:w-[135px] sm:flex-shrink-0 pr-4 border-r ${divider}`}>
                <InlineNotes notes={notes} onAdd={addNote} startDate={startDate} endDate={endDate} isDark={isDark} />
              </div>
              <div className="flex-1 sm:pl-4">
                <CalendarGrid
                  days={days}
                  getSelectionState={getSelectionState}
                  getNotesForDate={getNotesForDate}
                  onDayClick={handleDayClick}
                  onDayHover={handleDayHover}
                  isDark={isDark}
                />
              </div>
            </div>

            <RangeIndicator startDate={startDate} endDate={endDate} onClear={clearSelection} isDark={isDark} />

            <div className={`flex items-center justify-center gap-5 px-5 py-3 text-[10px] border-t ${divider} ${isDark ? "text-white/15" : "text-stone-400"}`}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-sm bg-violet-600" /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-sm ${isDark ? "bg-violet-500/20" : "bg-violet-100"}`} /> In range
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Note
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> Holiday
              </span>
            </div>
          </div>

          <div className={`flex-1 min-w-0 overflow-hidden flex flex-col ${card}`}>
            <div className={`px-6 pt-6 pb-4 flex items-center justify-between border-b ${divider}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${
                  isDark ? "bg-violet-500/10 border border-violet-500/10" : "bg-violet-50 border border-violet-100"
                }`}>
                  📝
                </div>
                <div>
                  <h2 className={`text-sm font-bold ${isDark ? "text-white/80" : "text-stone-700"}`}>Notes</h2>
                  <p className={`text-[10px] tracking-wide ${isDark ? "text-white/20" : "text-stone-400"}`}>
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </p>
                </div>
              </div>
              <span className={`badge-pill border ${isDark ? "bg-white/[0.03] text-white/25 border-white/[0.05]" : "bg-stone-50 text-stone-400 border-stone-200/50"}`}>
                {notes.length}
              </span>
            </div>

            <div className="flex-1 min-h-0">
              <NotesPanel
                notes={notes}
                onAdd={addNote}
                onUpdate={updateNote}
                onDelete={deleteNote}
                startDate={startDate}
                endDate={endDate}
                isDark={isDark}
              />
            </div>
          </div>
        </div>

        <div className="sm:hidden mt-5">
          <div className={`overflow-hidden px-5 py-4 ${card}`}>
            <InlineNotes notes={notes} onAdd={addNote} startDate={startDate} endDate={endDate} isDark={isDark} />
          </div>
        </div>

        <footer className={`mt-14 flex items-center gap-3 justify-center ${isDark ? "text-white/10" : "text-stone-300"}`}>
          <div className={`h-px w-10 ${isDark ? "bg-white/[0.05]" : "bg-stone-200"}`} />
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium">Built with care</span>
          <div className={`h-px w-10 ${isDark ? "bg-white/[0.05]" : "bg-stone-200"}`} />
        </footer>
      </div>
    </div>
  );
}
