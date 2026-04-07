"use client";

import { useState } from "react";
import CloseIcon from "@/components/atoms/CloseIcon";

const PALETTES = {
  yellow: { light: "bg-amber-50 border-amber-100", dark: "bg-amber-900/10 border-amber-800/10" },
  blue: { light: "bg-sky-50 border-sky-100", dark: "bg-sky-900/10 border-sky-800/10" },
  green: { light: "bg-emerald-50 border-emerald-100", dark: "bg-emerald-900/10 border-emerald-800/10" },
  pink: { light: "bg-pink-50 border-pink-100", dark: "bg-pink-900/10 border-pink-800/10" },
};

export default function NoteCard({ note, onUpdate, onDelete, isDark }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.text);

  const p = PALETTES[note.color] || PALETTES.yellow;
  const colorClass = isDark ? p.dark : p.light;

  const save = () => {
    if (draft.trim()) onUpdate(note.id, draft.trim());
    setEditing(false);
  };

  const rangeLabel = note.rangeStart && note.rangeEnd
    ? `${note.rangeStart} — ${note.rangeEnd}`
    : note.rangeStart || "General";

  return (
    <div className={`rounded-lg border p-3 ${colorClass}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-[9px] font-medium uppercase tracking-wider ${isDark ? "text-white/20" : "text-stone-400"}`}>
          {rangeLabel}
        </span>
        <button
          onClick={() => onDelete(note.id)}
          className={`p-0.5 transition-colors ${isDark ? "text-white/15 hover:text-rose-400" : "text-stone-300 hover:text-rose-500"}`}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") { setDraft(note.text); setEditing(false); }
          }}
          autoFocus
          className={`w-full text-sm bg-transparent border-none outline-none ${isDark ? "text-white/60" : "text-stone-600"}`}
        />
      ) : (
        <p className={`text-sm cursor-pointer ${isDark ? "text-white/50" : "text-stone-600"}`} onClick={() => setEditing(true)}>
          {note.text}
        </p>
      )}
    </div>
  );
}
