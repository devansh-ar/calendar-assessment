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

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 w-[55%] h-[42%] overlay-stripe" />

      <div className="absolute bottom-3 right-4 sm:bottom-5 sm:right-6 text-right z-10">
        <span className="text-white/70 text-[11px] sm:text-xs font-medium tracking-[0.3em] block">
          {year}
        </span>
        <span className="text-white text-xl sm:text-3xl font-extrabold tracking-wider uppercase block leading-tight"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.15)" }}>
          {MONTH_NAMES[month]}
        </span>
      </div>
    </div>
  );
}
