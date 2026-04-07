"use client";

const COIL_COUNT = 11;

export default function SpiralBinding() {
  return (
    <div className="flex justify-center gap-3 sm:gap-4 py-2 bg-gray-200 rounded-t-xl relative z-10">
      {Array.from({ length: COIL_COUNT }, (_, i) => (
        <div key={i} className="spiral-dot" />
      ))}
    </div>
  );
}
