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
        opacity: 1, // UPDATED: Fade to full visibility
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
      {/* LEVEL 1: Background Map (Original Image) */}
      <div
        ref={mapRef}
        // REMOVED: grayscale, sepia, mix-blend-multiply
        // KEPT: opacity-0 (so GSAP can fade it in)
        className="absolute inset-0 z-0 opacity-0 pointer-events-none"
      >
        <Image
          src="/raipur-map.png"
          alt="Map"
          fill
          className="object-cover"
          priority
        />
        {/* REMOVED: Radial Gradient Overlay */}
      </div>

      {/* LEVEL 2: Glow (#D5B4B4) */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#D5B4B4]/40 via-[#E4D0D0]/30 to-transparent blur-[100px] rounded-full z-0 pointer-events-none opacity-0 scale-50"
      />

      {/* LEVEL 3: HERO TEXT (Highest Priority - Z-60) */}
      <div className="absolute z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full pointer-events-none">
        <h1
          ref={textRef}
          className="text-[13vw] leading-none font-black text-[#867070] tracking-tighter uppercase opacity-0"
        >
          Raipur
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#867070] to-[#D5B4B4]">
            Podcast
          </span>
        </h1>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 right-10 text-right z-[60]">
        <p className="text-xs font-mono text-[#D5B4B4] mb-1">
          CURRENT LOCATION
        </p>
        <p className="text-sm font-bold text-[#867070] tracking-wider">
          ATAL NAGAR-NAVA RAIPUR
        </p>
      </div>
    </section>
  );
}
