"use client";

const RINGS = 9;

export default function SpiralBinding({ isDark }) {
  return (
    <div className={`flex justify-center gap-4 sm:gap-5 py-2 ${isDark ? "bg-white/[0.02]" : "bg-stone-50"}`}>
      {Array.from({ length: RINGS }, (_, i) => (
        <div key={i} className="spiral-ring" />
      ))}
    </div>
  );
}
