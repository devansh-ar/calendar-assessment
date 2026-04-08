"use client";

const RING_COUNT = 7;
const RING_GAP = 48;

export default function SpiralBinding({ isDark }) {
  const totalWidth = RING_COUNT * RING_GAP;
  const wire = isDark ? "#444" : "#aaa";
  const wireHi = isDark ? "#555" : "#ccc";
  const hole = isDark ? "#1a1a1a" : "#eee";

  return (
    <div className={`relative w-full overflow-visible ${isDark ? "bg-[#1a1a1a]" : "bg-[#f5f5f5]"}`}
      style={{ height: 26, borderRadius: "8px 8px 0 0" }}>
      <svg
        viewBox={`0 0 ${totalWidth} 38`}
        className="absolute left-1/2 -translate-x-1/2 -top-[10px]"
        style={{ width: Math.min(totalWidth, 340), height: 38 }}
        fill="none"
      >
        {Array.from({ length: RING_COUNT }, (_, i) => {
          const cx = i * RING_GAP + RING_GAP / 2;
          return (
            <g key={i}>
              <circle cx={cx} cy={28} r={5} fill={hole} />
              <circle cx={cx} cy={28} r={3.5} fill="transparent" stroke={wire} strokeWidth="0.5" opacity="0.3" />
              <path d={`M ${cx - 9} 28 A 9 11 0 0 1 ${cx + 9} 28`} stroke={wire} strokeWidth="2.5" strokeLinecap="round" />
              <path d={`M ${cx - 7} 27 A 7 9 0 0 1 ${cx + 7} 27`} stroke={wireHi} strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
