"use client";

import { useState, useEffect, useCallback } from "react";

const NOTE_COLORS = ["yellow", "blue", "green", "pink"];

function storageKey(year, month) {
  return `cal-notes-${year}-${String(month + 1).padStart(2, "0")}`;
}

const MOCK_NOTES = [
  { id: "mock-1", text: "Team standup at 10am", rangeStart: null, rangeEnd: null, color: "blue", createdAt: 1 },
  { id: "mock-2", text: "Dentist appointment", rangeStart: null, rangeEnd: null, color: "pink", createdAt: 2 },
  { id: "mock-3", text: "Submit quarterly report", rangeStart: null, rangeEnd: null, color: "yellow", createdAt: 3 },
];

export default function useNotes(year, month) {
  const [notes, setNotes] = useState(MOCK_NOTES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const key = storageKey(year, month);
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        setNotes(parsed.length > 0 ? parsed : MOCK_NOTES);
      } else {
        setNotes(MOCK_NOTES);
      }
    } catch {
      setNotes(MOCK_NOTES);
    }
    setHydrated(true);
  }, [year, month]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey(year, month), JSON.stringify(notes));
    } catch { /* storage full */ }
  }, [notes, year, month, hydrated]);

  const addNote = useCallback((text, rangeStart = null, rangeEnd = null) => {
    const note = {
      id: crypto.randomUUID(),
      text,
      rangeStart,
      rangeEnd,
      color: NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)],
      createdAt: Date.now(),
    };
    setNotes((prev) => [...prev, note]);
    return note;
  }, []);

  const updateNote = useCallback((id, text) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, text } : n)));
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getNotesForDate = useCallback((dateStr) => {
    return notes.filter((n) => {
      if (!n.rangeStart) return false;
      if (!n.rangeEnd) return n.rangeStart === dateStr;
      return dateStr >= n.rangeStart && dateStr <= n.rangeEnd;
    });
  }, [notes]);

  return { notes, addNote, updateNote, deleteNote, getNotesForDate };
}
