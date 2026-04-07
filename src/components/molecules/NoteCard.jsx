"use client";

import { useState } from "react";
import CloseIcon from "@/components/atoms/CloseIcon";

const PALETTES = {
  yellow: { light: "bg-amber-50/80 border-amber-200/40", dark: "bg-amber-500/[0.06] border-amber-500/10" },
  blue:   { light: "bg-sky-50/80 border-sky-200/40",     dark: "bg-sky-500/[0.06] border-sky-500/10" },
  green:  { light: "bg-emerald-50/80 border-emerald-200/40", dark: "bg-emerald-500/[0.06] border-emerald-500/10" },
  pink:   { light: "bg-pink-50/80 border-pink-200/40",   dark: "bg-pink-500/[0.06] border-pink-500/10" },
};

const DOT_COLORS = {
  yellow: "bg-amber-400",
  blue: "bg-sky-400",
  green: "bg-emerald-400",
  pink: "bg-pink-400",
};

export default function NoteCard({ note, onUpdate, onDelete, isDark }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(note.text);

  const p = PALETTES[note.color] || PALETTES.yellow;
  const dot = DOT_COLORS[note.color] || DOT_COLORS.yellow;
  const colorClass = isDark ? p.dark : p.light;

  const save = () => {
    if (draft.trim()) onUpdate(note.id, draft.trim());
    setEditing(false);
  };

  const rangeLabel = note.rangeStart && note.rangeEnd
    ? `${note.rangeStart} — ${note.rangeEnd}`
    : note.rangeStart || "General";

  return (
    <div className={`group rounded-xl border p-3.5 transition-all ${colorClass}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          <span className={`text-[9px] font-semibold uppercase tracking-wider ${isDark ? "text-white/20" : "text-stone-400"}`}>
            {rangeLabel}
          </span>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className={`opacity-0 group-hover:opacity-100 transition-opacity p-0.5 ${isDark ? "text-white/15 hover:text-rose-400" : "text-stone-300 hover:text-rose-500"}`}
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
        <p className={`text-sm leading-relaxed cursor-pointer ${isDark ? "text-white/50" : "text-stone-600"}`}
          onClick={() => setEditing(true)}>
          {note.text}
        </p>
      )}
    </div>
  );
}
