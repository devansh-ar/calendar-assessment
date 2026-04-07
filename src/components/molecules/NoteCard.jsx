"use client";

import { useState } from "react";
import CloseIcon from "@/components/atoms/CloseIcon";

const COLOR_MAP = {
  yellow: "bg-amber-50 border-amber-200",
  blue: "bg-sky-50 border-sky-200",
  green: "bg-emerald-50 border-emerald-200",
  pink: "bg-pink-50 border-pink-200",
};

export default function NoteCard({ note, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.text);

  const colorClass = COLOR_MAP[note.color] || COLOR_MAP.yellow;

  const save = () => {
    if (draft.trim()) onUpdate(note.id, draft.trim());
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") {
      setDraft(note.text);
      setEditing(false);
    }
  };

  const rangeLabel = note.rangeStart && note.rangeEnd
    ? `${note.rangeStart} — ${note.rangeEnd}`
    : note.rangeStart || "General";

  return (
    <div className={`rounded-lg border p-3 ${colorClass} transition-all`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
          {rangeLabel}
        </span>
        <button
          onClick={() => onDelete(note.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
          aria-label="Delete note"
        >
          <CloseIcon />
        </button>
      </div>

      {editing ? (
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full text-sm bg-transparent border-none outline-none"
        />
      ) : (
        <p
          className="text-sm text-gray-700 cursor-pointer"
          onClick={() => setEditing(true)}
        >
          {note.text}
        </p>
      )}
    </div>
  );
}
