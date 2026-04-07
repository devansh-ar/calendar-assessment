"use client";

import { useState, useCallback } from "react";
import { isDateBetween, isDateBefore } from "@/utils/dateHelpers";

export default function useRangeSelection() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const handleDayClick = useCallback((dateStr) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(dateStr);
      setEndDate(null);
    } else if (isDateBefore(dateStr, startDate)) {
      setStartDate(dateStr);
    } else {
      setEndDate(dateStr);
    }
  }, [startDate, endDate]);

  const handleDayHover = useCallback((dateStr) => {
    if (startDate && !endDate) setHoverDate(dateStr);
  }, [startDate, endDate]);

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  }, []);

  const getSelectionState = useCallback((dateStr) => {
    if (!startDate) return null;

    const effectiveEnd = endDate || hoverDate;

    if (dateStr === startDate && dateStr === effectiveEnd) return "single";
    if (dateStr === startDate) return "start";
    if (dateStr === effectiveEnd) return "end";

    if (effectiveEnd && isDateBetween(dateStr, startDate, effectiveEnd)) return "in-range";
    if (!endDate && hoverDate && isDateBefore(hoverDate, startDate) && isDateBetween(dateStr, hoverDate, startDate)) {
      return "in-range";
    }

    return null;
  }, [startDate, endDate, hoverDate]);

  return { startDate, endDate, handleDayClick, handleDayHover, clearSelection, getSelectionState };
}
