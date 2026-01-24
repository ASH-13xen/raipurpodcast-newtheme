"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(mapRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out",
      })
        .to(glowRef.current, { opacity: 0.6, scale: 1, duration: 2 }, "-=1.8")
        .to(
          textRef.current,
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          "-=1.0",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#F5EBEB]"
    >
      {/* LEVEL 1: Background Map */}
      <div
        ref={mapRef}
        className="absolute inset-0 z-0 opacity-0 pointer-events-none"
      >
        <Image
          src="/raipur-map.png"
          alt="Map"
          fill
          className="object-cover opacity-60 md:opacity-100"
          priority
        />
      </div>

      {/* LEVEL 2: Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-gradient-to-tr from-[#D5B4B4]/40 via-[#E4D0D0]/30 to-transparent blur-[60px] md:blur-[100px] rounded-full z-0 pointer-events-none opacity-0 scale-50"
      />

      {/* LEVEL 3: HERO TEXT */}
      <div className="absolute z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none px-4">
        <h1
          ref={textRef}
          // UPDATED: Reduced mobile size from [18vw] to [14vw]
          className="text-[14vw] md:text-[13vw] leading-none font-black text-[#867070] tracking-tighter uppercase opacity-0"
        >
          Raipur
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#867070] to-[#D5B4B4]">
            Podcast
          </span>
        </h1>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 right-6 md:right-10 text-right z-[60]">
        <p className="text-[10px] md:text-xs font-mono text-[#D5B4B4] mb-1">
          CURRENT LOCATION
        </p>
        <p className="text-xs md:text-sm font-bold text-[#867070] tracking-wider">
          ATAL NAGAR-NAVA RAIPUR
        </p>
      </div>
    </section>
  );
}
