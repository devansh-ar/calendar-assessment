"use client";

const RING_COUNT = 7;
const RING_GAP = 48;

export default function SpiralBinding({ isDark }) {
  const totalWidth = RING_COUNT * RING_GAP;
  const wireColor = isDark ? "#555" : "#a8a29e";
  const wireHighlight = isDark ? "#777" : "#c4bfba";
  const holeFill = isDark ? "#1a1a24" : "#e7e5e4";
  const holeShadow = isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)";

  return (
    <div className={`relative w-full overflow-visible rounded-t-2xl ${
      isDark ? "bg-[#141320]" : "bg-stone-100/70"
    }`} style={{ height: 28 }}>
      <svg
        viewBox={`0 0 ${totalWidth} 40`}
        className="absolute left-1/2 -translate-x-1/2 -top-3"
        style={{ width: Math.min(totalWidth, 340), height: 40 }}
        fill="none"
      >
        {Array.from({ length: RING_COUNT }, (_, i) => {
          const cx = i * RING_GAP + RING_GAP / 2;
          return (
            <g key={i}>
              <circle cx={cx} cy={30} r={5} fill={holeFill} />
              <circle cx={cx} cy={30} r={4} fill="transparent"
                stroke={holeShadow} strokeWidth="1.5" />

              <path
                d={`M ${cx - 9} 30 A 9 12 0 0 1 ${cx + 9} 30`}
                stroke={wireColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M ${cx - 7} 29 A 7 10 0 0 1 ${cx + 7} 29`}
                stroke={wireHighlight}
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
