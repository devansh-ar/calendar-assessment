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

  useEffect(() => {
    document.body.style.background = isDark ? "#1a1a2e" : "#f3f4f6";
  }, [isDark]);

  const handleTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      navigateMonth(diff > 0 ? -1 : 1);
    }
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

  const cardBg = isDark ? "bg-gray-900 shadow-2xl shadow-black/50" : "bg-white shadow-2xl shadow-gray-300/50";
  const panelBg = isDark ? "bg-gray-900 shadow-xl shadow-black/50" : "bg-white shadow-xl shadow-gray-200/50";

  return (
    <div className={`min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-500 ${
      isDark ? "bg-[#1a1a2e]" : "bg-gray-100"
    }`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />

      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-4 lg:gap-6 mt-8">
        <div
          className={`flex-1 max-w-lg mx-auto lg:mx-0 rounded-b-xl overflow-hidden transition-shadow duration-300 ${cardBg}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <SpiralBinding />
          <HeroImage month={currentMonth} year={currentYear} flipDirection={flipDirection} />
          <CalendarNav
            onPrev={() => navigateMonth(-1)}
            onNext={() => navigateMonth(1)}
            onToday={goToToday}
          />

          <div className="flex flex-col sm:flex-row px-3 sm:px-4 pb-4">
            <div className="hidden sm:block sm:w-1/3 pr-3 border-r border-gray-100">
              <InlineNotes notes={notes} onAdd={addNote} startDate={startDate} endDate={endDate} />
            </div>
            <div className="flex-1 sm:pl-3">
              <CalendarGrid
                days={days}
                getSelectionState={getSelectionState}
                getNotesForDate={getNotesForDate}
                onDayClick={handleDayClick}
                onDayHover={handleDayHover}
              />
            </div>
          </div>

          <RangeIndicator startDate={startDate} endDate={endDate} onClear={clearSelection} />
        </div>

        <div className={`w-full lg:w-80 rounded-xl overflow-hidden transition-shadow duration-300 ${panelBg}`}>
          <div className="hidden lg:block px-4 pt-4 pb-2">
            <h2 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Notes
            </h2>
          </div>
          <NotesPanel
            notes={notes}
            onAdd={addNote}
            onUpdate={updateNote}
            onDelete={deleteNote}
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        <div className="sm:hidden">
          <div className={`rounded-xl overflow-hidden ${panelBg} px-4 py-3`}>
            <InlineNotes notes={notes} onAdd={addNote} startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
