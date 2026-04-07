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

const MONTH_EMOJI = ["❄️","💜","🌸","🌧️","🌻","☀️","🏔️","🌅","🍂","🎃","🍁","⛄"];

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

  const card = isDark ? "cal-card-dark" : "cal-card-light";
  const subtle = isDark ? "text-white/20" : "text-stone-400";
  const muted = isDark ? "text-white/40" : "text-stone-500";

  return (
    <div className={`min-h-screen ${isDark ? "page-dark" : "page-light"}`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        <header className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className={`text-[11px] uppercase tracking-[0.25em] mb-1.5 ${subtle}`}>
              Personal planner
            </p>
            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-stone-800"}`}>
              My Calendar
            </h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`badge-pill ${isDark ? "bg-violet-500/10 text-violet-300 border border-violet-500/15" : "bg-violet-50 text-violet-600 border border-violet-200/60"}`}>
              {MONTH_EMOJI[currentMonth]} {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            {startDate && (
              <span className={`badge-pill ${isDark ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/15" : "bg-emerald-50 text-emerald-600 border border-emerald-200/60"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Range selected
              </span>
            )}
            <span className={`badge-pill ${isDark ? "bg-white/5 text-white/30 border border-white/5" : "bg-stone-50 text-stone-400 border border-stone-200/60"}`}>
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </span>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">

          <div
            className={`flex-shrink-0 w-full lg:w-[440px] overflow-hidden ${card}`}
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

            <div className={`mx-4 sm:mx-5 mb-3 h-px ${isDark ? "bg-white/5" : "bg-violet-100/50"}`} />

            <div className="flex flex-col sm:flex-row px-4 sm:px-5 pb-5 gap-0">
              <div className={`hidden sm:block sm:w-[130px] sm:flex-shrink-0 pr-3 border-r ${
                isDark ? "border-white/6" : "border-violet-100/40"
              }`}>
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

            <div className={`flex items-center justify-center gap-4 px-5 py-3 text-[10px] ${subtle} border-t ${
              isDark ? "border-white/5" : "border-violet-100/30"
            }`}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-200" />
                In range
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Has note
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                Holiday
              </span>
            </div>
          </div>

          <div className={`flex-1 min-w-0 overflow-hidden flex flex-col ${card}`}>
            <div className={`px-5 pt-5 pb-3 flex items-center justify-between border-b ${
              isDark ? "border-white/5" : "border-violet-100/30"
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  isDark ? "bg-violet-500/10" : "bg-violet-50"
                }`}>
                  📝
                </div>
                <div>
                  <h2 className={`text-sm font-semibold ${isDark ? "text-white/80" : "text-stone-700"}`}>
                    Notes
                  </h2>
                  <p className={`text-[10px] ${subtle}`}>
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </p>
                </div>
              </div>
              <span className={`badge-pill ${isDark ? "bg-white/5 text-white/30 border border-white/5" : "bg-stone-100 text-stone-400 border border-stone-200/50"}`}>
                {notes.length}
              </span>
            </div>

            <div className="flex-1">
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
          <div className={`overflow-hidden px-4 py-3 ${card}`}>
            <InlineNotes notes={notes} onAdd={addNote} startDate={startDate} endDate={endDate} isDark={isDark} />
          </div>
        </div>

        <div className={`mt-10 flex items-center gap-3 justify-center ${subtle}`}>
          <div className={`h-px flex-1 max-w-[60px] ${isDark ? "bg-white/8" : "bg-stone-200"}`} />
          <span className="text-[10px] uppercase tracking-[0.2em]">Built with care</span>
          <div className={`h-px flex-1 max-w-[60px] ${isDark ? "bg-white/8" : "bg-stone-200"}`} />
        </div>
      </div>
    </div>
  );
}
