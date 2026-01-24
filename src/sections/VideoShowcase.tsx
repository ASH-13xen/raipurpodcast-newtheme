"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !cardRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "+=100%", // Slightly shorter distance for a snappier expansion
          scrub: 0.5,
          pin: true,
        },
      });

      // PHASE 1: EXPAND UPWARDS
      // Since the container is 'items-end', growing height forces it to go UP.
      tl.to(cardRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        borderWidth: 0,
        marginBottom: 0, // Remove the initial bottom spacing
        ease: "power2.inOut",
        duration: 1,
      });

      // PHASE 2: FADE IN TEXT
      tl.fromTo(
        textContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      // items-end: Anchors the card to the bottom so it grows UP
      // -mt-[15vh]: Overlap with Description
      className="relative w-full h-screen flex justify-center items-end z-[60] -mt-[15vh] pointer-events-none pb-[10vh]"
    >
      {/* THE CARD */}
      <div
        ref={cardRef}
        // Theme Border: #F5EBEB (Lightest Rose)
        className="relative w-[400px] md:w-[700px] h-[250px] md:h-[450px] bg-[#867070] rounded-t-3xl rounded-b-3xl md:rounded-3xl overflow-hidden shadow-2xl border-[8px] border-[#F5EBEB] pointer-events-auto"
      >
        <video
          className="w-full h-full object-cover opacity-90"
          autoPlay
          muted
          loop
          playsInline
        >
          {/* Using a warm/nature toned placeholder if possible, or sticking to the abstract wave */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Theme Overlay: Darkened Rose/Brown tint instead of pure black */}
        <div className="absolute inset-0 bg-[#4a3b3b]/60 mix-blend-multiply"></div>

        {/* "Next Story" Badge - Theme Colors */}
        <div className="absolute top-4 left-0 w-full text-center">
          <span className="bg-[#F5EBEB] text-[#867070] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
            Up Next
          </span>
        </div>

        {/* FULL SCREEN CONTENT */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-20 opacity-0"
        >
          {/* Main Title: #F5EBEB (Lightest) */}
          <h2 className="text-6xl md:text-[10rem] font-black text-[#F5EBEB] uppercase tracking-tighter leading-none mb-4 mix-blend-overlay">
            Chitrakote
          </h2>

          {/* Subtitle: #D5B4B4 (Muted Pink) */}
          <p className="text-xl md:text-3xl text-[#D5B4B4] max-w-2xl font-light italic tracking-wide">
            "The Niagara of India"
          </p>

          {/* Button: #F5EBEB bg with #867070 text */}
          <button className="mt-12 px-10 py-4 bg-[#F5EBEB] text-[#867070] rounded-full font-bold uppercase tracking-widest hover:bg-[#D5B4B4] hover:text-[#fff] transition-all duration-300 text-sm md:text-base shadow-lg">
            Start Experience
          </button>
        </div>
      </div>
    </section>
  );
}
