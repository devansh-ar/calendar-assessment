"use client";

import { useState } from "react";

const EMPTY_LINES = ["", "", "", "", ""];

export default function InlineNotes({ notes, onAdd, startDate, endDate, isDark }) {
  const [lines, setLines] = useState(EMPTY_LINES);

  const handleChange = (idx, value) => {
    setLines((prev) => prev.map((l, i) => (i === idx ? value : l)));
  };

  const handleBlur = (idx) => {
    const text = lines[idx].trim();
    if (!text) return;
    onAdd(text, startDate, endDate);
    setLines((prev) => prev.map((l, i) => (i === idx ? "" : l)));
  };

  return (
    <div className="py-1">
      <h3 className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 ${isDark ? "text-white/25" : "text-stone-400"}`}>
        Notes
      </h3>

      {lines.map((line, i) => (
        <input
          key={i}
          type="text"
          value={line}
          onChange={(e) => handleChange(i, e.target.value)}
          onBlur={() => handleBlur(i)}
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          className={`ruled-line ${isDark ? "ruled-line-dark" : ""} w-full bg-transparent text-[11px] outline-none px-0 ${
            isDark ? "text-white/50 placeholder:text-white/15" : "text-stone-500 placeholder:text-stone-300"
          }`}
          placeholder={i === 0 ? "Write here..." : ""}
        />
      ))}

      {notes.length > 0 && (
        <div className="mt-2 space-y-0.5">
          {notes.slice(0, 3).map((note) => (
            <p key={note.id} className={`text-[9px] truncate ${isDark ? "text-white/20" : "text-stone-300"}`}>
              {note.text}
            </p>
          ))}
          {notes.length > 3 && (
            <p className={`text-[9px] font-medium ${isDark ? "text-white/30" : "text-stone-400"}`}>+{notes.length - 3} more</p>
          )}
        </div>
      )}
    </div>
  );
}
