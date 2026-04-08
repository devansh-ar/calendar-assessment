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

const NAV_LINKS = ["Home", "Calendar", "Notes", "About"];

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
  const divider = isDark ? "border-[#2a2a2a]" : "border-[#e5e5e5]";

  return (
    <div className={`min-h-screen ${isDark ? "page-dark" : "page-light"}`}>

      {/* ─── Top Navbar ─── */}
      <nav className={`sticky top-0 z-40 border-b ${divider} ${isDark ? "bg-[#111]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-14">
          <h1 className={`text-lg font-bold tracking-tight ${isDark ? "text-white" : "text-stone-900"}`}>
            My Calendar
          </h1>

          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <span
                key={link}
                className={`px-3 py-1.5 text-sm font-medium rounded-md cursor-default transition-colors ${
                  link === "Calendar"
                    ? isDark ? "bg-white/10 text-white" : "bg-stone-100 text-stone-900"
                    : isDark ? "text-white/50 hover:text-white/80" : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {link}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${isDark ? "text-white/50" : "text-stone-500"}`}>
                {MONTH_ICON[currentMonth]} {MONTH_NAMES[currentMonth]} {currentYear}
              </span>
              {startDate && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isDark ? "bg-emerald-500/15 text-emerald-400" : "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Range
                </span>
              )}
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />
          </div>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ─── Left: Calendar Card ─── */}
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

            <div className={`flex items-center justify-center gap-5 px-5 py-3 text-[10px] border-t ${divider} ${isDark ? "text-white/30" : "text-stone-400"}`}>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-sm ${isDark ? "bg-white" : "bg-stone-800"}`} /> Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-sm border ${isDark ? "bg-white/10 border-white/20" : "bg-stone-200 border-stone-300"}`} /> In range
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Note
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" /> Holiday
              </span>
            </div>
          </div>

          {/* ─── Right: Notes Panel ─── */}
          <div className={`flex-1 min-w-0 overflow-hidden flex flex-col min-h-[400px] ${card}`}>
            <div className={`px-6 pt-5 pb-4 flex items-center justify-between border-b ${divider}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${
                  isDark ? "bg-white/5 border border-white/10" : "bg-stone-50 border border-stone-200"
                }`}>
                  📝
                </div>
                <div>
                  <h2 className={`text-sm font-bold ${isDark ? "text-white/80" : "text-stone-800"}`}>Notes</h2>
                  <p className={`text-[10px] tracking-wide ${isDark ? "text-white/30" : "text-stone-400"}`}>
                    {MONTH_NAMES[currentMonth]} {currentYear}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${isDark ? "bg-white/5 text-white/40" : "bg-stone-100 text-stone-500"}`}>
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

        {/* ─── Mobile inline notes ─── */}
        <div className="sm:hidden mt-5">
          <div className={`overflow-hidden px-5 py-4 ${card}`}>
            <InlineNotes notes={notes} onAdd={addNote} startDate={startDate} endDate={endDate} isDark={isDark} />
          </div>
        </div>

        <footer className={`mt-12 flex items-center gap-3 justify-center ${isDark ? "text-white/20" : "text-stone-300"}`}>
          <div className={`h-px w-10 ${isDark ? "bg-white/10" : "bg-stone-200"}`} />
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium">Built with care</span>
          <div className={`h-px w-10 ${isDark ? "bg-white/10" : "bg-stone-200"}`} />
        </footer>
      </div>
    </div>
  );
}
