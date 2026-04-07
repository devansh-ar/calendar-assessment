"use client";

import { useState } from "react";

const EMPTY_LINES = ["", "", "", "", ""];

export default function InlineNotes({ notes, onAdd, startDate, endDate }) {
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
    <div className="py-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</h3>

      <div className="space-y-0">
        {lines.map((line, i) => (
          <input
            key={i}
            type="text"
            value={line}
            onChange={(e) => handleChange(i, e.target.value)}
            onBlur={() => handleBlur(i)}
            onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
            className="notes-line w-full bg-transparent text-xs text-gray-600 outline-none px-0 placeholder:text-gray-300"
            placeholder={i === 0 ? "Write a note..." : ""}
          />
        ))}
      </div>

      {notes.length > 0 && (
        <div className="mt-2 space-y-1">
          {notes.slice(0, 3).map((note) => (
            <div key={note.id} className="text-[10px] text-gray-500 truncate">
              &bull; {note.text}
            </div>
          ))}
          {notes.length > 3 && (
            <div className="text-[10px] text-sky-500">+{notes.length - 3} more</div>
          )}
        </div>
      )}
    </div>
  );
}
