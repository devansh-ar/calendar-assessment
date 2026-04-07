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
      />

      <div
        className="absolute bottom-0 right-0 w-3/5 h-2/5"
        style={{
          clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
          background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
        }}
      />

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-right text-white z-10">
        <div className="text-sm sm:text-base font-medium tracking-widest opacity-90">
          {year}
        </div>
        <div className="text-xl sm:text-3xl font-bold tracking-wider uppercase">
          {MONTH_NAMES[month]}
        </div>
      </div>
    </div>
  );
}
