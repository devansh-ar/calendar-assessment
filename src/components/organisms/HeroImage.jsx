"use client";

import { MONTH_NAMES } from "@/utils/dateHelpers";
import HERO_IMAGES from "@/data/heroImages";

export default function HeroImage({ month, year, flipDirection }) {
  const image = HERO_IMAGES[month];
  const animClass = flipDirection ? "flip-exit" : "flip-enter";

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
      <img
        key={`${year}-${month}`}
        src={image.url}
        alt={image.alt}
        className={`absolute inset-0 w-full h-full object-cover ${animClass}`}
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[55%] h-[42%] overlay-stripe" />

      <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6 z-10">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-[2px] bg-white/40 rounded-full" />
          <span className="text-white/60 text-[10px] font-semibold tracking-[0.35em] uppercase">
            {year}
          </span>
        </div>
      </div>

      <div className="absolute bottom-3 right-4 sm:bottom-5 sm:right-6 text-right z-10">
        <span className="text-white/70 text-[11px] sm:text-xs font-medium tracking-[0.3em] block">
          {year}
        </span>
        <span className="text-white text-xl sm:text-3xl font-extrabold tracking-wider uppercase block leading-tight"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          {MONTH_NAMES[month]}
        </span>
      </div>

      <div className="absolute top-3 left-4 sm:top-4 sm:left-5 z-10">
        <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-sm rounded-full px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/80 text-[9px] font-medium tracking-wider uppercase">Live</span>
        </div>
      </div>
    </div>
  );
}
