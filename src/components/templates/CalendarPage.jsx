"use client";

import { useState, useEffect, useCallback } from "react";
import useCalendar from "@/hooks/useCalendar";
import useRangeSelection from "@/hooks/useRangeSelection";
import useNotes from "@/hooks/useNotes";

import SpiralBinding from "@/components/molecules/SpiralBinding";
import HeroImage from "@/components/organisms/HeroImage";
import CalendarNav from "@/components/organisms/CalendarNav";
import CalendarGrid from "@/components/organisms/CalendarGrid";
import InlineNotes from "@/components/organisms/InlineNotes";
import NotesPanel from "@/components/organisms/NotesPanel";
import RangeIndicator from "@/components/molecules/RangeIndicator";
import ThemeToggle from "@/components/molecules/ThemeToggle";

const SWIPE_THRESHOLD = 80;

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

  return (
    <div className={`min-h-screen ${isDark ? "page-dark" : "page-light"}`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="mb-8 sm:mb-10">
          <p className={`text-xs uppercase tracking-[0.25em] mb-1 ${isDark ? "text-violet-400/50" : "text-stone-400"}`}>
            Personal planner
          </p>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? "text-white" : "text-stone-800"}`}>
            My Calendar
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          <div
            className={`flex-shrink-0 w-full lg:w-[440px] rounded-2xl overflow-hidden ${card}`}
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

            <div className="flex flex-col sm:flex-row px-4 sm:px-5 pb-5 gap-0">
              <div className={`hidden sm:block sm:w-[130px] sm:flex-shrink-0 pr-3 border-r ${
                isDark ? "border-white/6" : "border-stone-200"
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
          </div>

          <div className={`flex-1 min-w-0 rounded-2xl overflow-hidden ${card}`}>
            <div className="px-5 pt-5 pb-1 flex items-baseline justify-between">
              <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                isDark ? "text-violet-400/40" : "text-stone-400"
              }`}>
                Notes
              </h2>
              <span className={`text-[10px] ${isDark ? "text-white/20" : "text-stone-300"}`}>
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </span>
            </div>
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

        <div className="sm:hidden mt-5">
          <div className={`rounded-2xl overflow-hidden px-4 py-3 ${card}`}>
            <InlineNotes notes={notes} onAdd={addNote} startDate={startDate} endDate={endDate} isDark={isDark} />
          </div>
        </div>

        <footer className={`mt-12 text-center text-[10px] uppercase tracking-[0.2em] ${
          isDark ? "text-white/15" : "text-stone-300"
        }`}>
          Built with care
        </footer>
      </div>
    </div>
  );
}
