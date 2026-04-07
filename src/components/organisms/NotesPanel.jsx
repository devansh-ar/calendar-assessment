"use client";

import { useState } from "react";
import NoteCard from "@/components/molecules/NoteCard";
import ChevronDown from "@/components/atoms/ChevronDown";

export default function NotesPanel({ notes, onAdd, onUpdate, onDelete, startDate, endDate }) {
  const [newText, setNewText] = useState("");
  const [expanded, setExpanded] = useState(true);

  const handleAdd = () => {
    if (!newText.trim()) return;
    onAdd(newText.trim(), startDate, endDate);
    setNewText("");
  };

  const rangeLabel = startDate && endDate
    ? `Notes for ${startDate} to ${endDate}`
    : startDate
    ? `Notes for ${startDate}`
    : "General notes";

  return (
    <div className="flex flex-col h-full">
      <button
        className="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-gray-50 border-t border-gray-200"
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Notes</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        expanded ? "max-h-[500px] lg:max-h-full" : "max-h-0 lg:max-h-full"
      }`}>
        {startDate && (
          <div className="px-4 py-2 text-xs text-sky-600 bg-sky-50 border-b border-sky-100">
            {rangeLabel}
          </div>
        )}

        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAdd();
                }
              }}
              placeholder="Add a note..."
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent"
            />
            <button
              onClick={handleAdd}
              disabled={!newText.trim()}
              className="px-3 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto notes-scroll px-4 py-2">
          {notes.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              No notes yet. Select a date range and add one!
            </p>
          ) : (
            <div className="space-y-2">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} onUpdate={onUpdate} onDelete={onDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
