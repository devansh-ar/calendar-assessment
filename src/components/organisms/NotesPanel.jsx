"use client";

import { useState } from "react";
import NoteCard from "@/components/molecules/NoteCard";
import ChevronDown from "@/components/atoms/ChevronDown";

export default function NotesPanel({ notes, onAdd, onUpdate, onDelete, startDate, endDate, isDark }) {
  const [newText, setNewText] = useState("");
  const [expanded, setExpanded] = useState(true);

  const handleAdd = () => {
    if (!newText.trim()) return;
    onAdd(newText.trim(), startDate, endDate);
    setNewText("");
  };

  const rangeLabel = startDate && endDate
    ? `${startDate} to ${endDate}`
    : startDate || null;

  return (
    <div className="flex flex-col h-full">
      <button
        className={`lg:hidden flex items-center justify-between w-full px-5 py-3 border-t ${
          isDark ? "border-white/5" : "border-stone-100"
        }`}
        onClick={() => setExpanded((v) => !v)}
      >
        <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${
          isDark ? "text-white/20" : "text-stone-400"
        }`}>
          Notes
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""} ${
          isDark ? "text-white/20" : "text-stone-300"
        }`} />
      </button>

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-200 ${
        expanded ? "max-h-[500px] lg:max-h-full" : "max-h-0 lg:max-h-full"
      }`}>
        {rangeLabel && (
          <div className={`px-5 py-2 text-[11px] border-b ${
            isDark ? "text-violet-400/40 border-white/5" : "text-violet-500 border-stone-100"
          }`}>
            Attached to {rangeLabel}
          </div>
        )}

        <div className={`px-5 py-3 border-b ${isDark ? "border-white/5" : "border-stone-100"}`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAdd(); }
              }}
              placeholder="Add a note..."
              className={`flex-1 text-sm px-3 py-2 rounded-lg border outline-none transition-colors ${
                isDark
                  ? "bg-white/[0.03] border-white/8 text-white/70 placeholder:text-white/20 focus:border-violet-500/30"
                  : "bg-stone-50 border-stone-200 text-stone-700 placeholder:text-stone-300 focus:border-violet-300"
              }`}
            />
            <button
              onClick={handleAdd}
              disabled={!newText.trim()}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? "bg-violet-500/20 text-violet-300 hover:bg-violet-500/30 disabled:opacity-20"
                  : "bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-30"
              } disabled:cursor-not-allowed`}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-3">
          {notes.length === 0 ? (
            <p className={`text-sm text-center py-10 ${isDark ? "text-white/15" : "text-stone-300"}`}>
              No notes yet
            </p>
          ) : (
            <div className="space-y-2">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} onUpdate={onUpdate} onDelete={onDelete} isDark={isDark} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
