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

  const divider = isDark ? "border-[#2a2a2a]" : "border-[#e5e5e5]";

  return (
    <div className="flex flex-col h-full">
      <button
        className={`lg:hidden flex items-center justify-between w-full px-5 py-3.5 border-t ${divider}`}
        onClick={() => setExpanded((v) => !v)}
      >
        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? "text-white/30" : "text-stone-400"}`}>
          Notes
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""} ${
          isDark ? "text-white/30" : "text-stone-300"
        }`} />
      </button>

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-200 ${
        expanded ? "max-h-[600px] lg:max-h-full" : "max-h-0 lg:max-h-full"
      }`}>
        {rangeLabel && (
          <div className={`px-6 py-2 text-[11px] font-medium border-b ${divider} ${
            isDark ? "text-white/40" : "text-stone-500"
          }`}>
            Attached to {rangeLabel}
          </div>
        )}

        <div className={`px-6 py-4 border-b ${divider}`}>
          <div className="flex gap-2.5">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAdd(); }
              }}
              placeholder="Write something..."
              className={`flex-1 text-sm px-3.5 py-2.5 rounded-lg ${isDark ? "input-dark text-white/70 placeholder:text-white/20" : "input-light text-stone-700 placeholder:text-stone-400"}`}
            />
            <button
              onClick={handleAdd}
              disabled={!newText.trim()}
              className="btn-primary w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center flex-shrink-0"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-4">
          {notes.length === 0 ? (
            <div className={`text-center py-10 ${isDark ? "text-white/20" : "text-stone-300"}`}>
              <p className="text-2xl mb-2">📋</p>
              <p className="text-sm">No notes yet</p>
            </div>
          ) : (
            <div className="space-y-3">
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
