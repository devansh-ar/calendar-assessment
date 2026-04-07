"use client";

import { useState, useCallback, useMemo } from "react";
import { buildCalendarGrid } from "@/utils/dateHelpers";

const FLIP_DURATION = 300;

export default function useCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [flipDirection, setFlipDirection] = useState(null);

  const navigateMonth = useCallback((direction) => {
    setFlipDirection(direction > 0 ? "next" : "prev");

    setTimeout(() => {
      setCurrentMonth((prev) => {
        const next = prev + direction;
        if (next > 11) { setCurrentYear((y) => y + 1); return 0; }
        if (next < 0) { setCurrentYear((y) => y - 1); return 11; }
        return next;
      });
      setFlipDirection(null);
    }, FLIP_DURATION);
  }, []);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(now.getMonth());
    setCurrentYear(now.getFullYear());
  }, []);

  const days = useMemo(
    () => buildCalendarGrid(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  return { currentMonth, currentYear, days, flipDirection, navigateMonth, goToToday };
}
