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

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[55%] h-[42%] overlay-stripe" />

      <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-7 text-right z-10">
        <span className="text-white/60 text-[10px] sm:text-[11px] font-semibold tracking-[0.35em] uppercase block mb-0.5">
          {year}
        </span>
        <span className="text-white text-xl sm:text-3xl font-extrabold tracking-wide uppercase block leading-none"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.25)" }}>
          {MONTH_NAMES[month]}
        </span>
      </div>
    </div>
  );
}
