"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GUESTS = [
  {
    id: 1,
    name: "Ananya Birla",
    role: "Musician & Entrepreneur",
    episode: "EP 042",
    bio: "The platinum-selling artist discusses the intersection of mental health, business, and finding your own voice in a legacy family.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ritesh Agarwal",
    role: "Founder, OYO Rooms",
    episode: "EP 043",
    bio: "From selling SIM cards to building a hospitality empire. Ritesh shares the untold gritty stories of OYO's early days.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Masaba Gupta",
    role: "Fashion Designer & Actor",
    episode: "EP 044",
    bio: "Redefining beauty standards and the chaos of 'Masaba Masaba'. A raw conversation about identity and creativity.",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Zakir Khan",
    role: "Stand-up Comedian",
    episode: "EP 045",
    bio: "The 'Sakht Launda' opens up about vulnerability, the art of storytelling, and why poetry matters in the age of reels.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Prajakta Koli",
    role: "Content Creator",
    episode: "EP 046",
    bio: "MostlySane on the transition from YouTube to Bollywood, and the pressure of being India's sweetheart.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function GuestsMagazine() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement[]>([]);
  const photosRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      // 1. PINNING THE RIGHT SIDE
      // The photo container stays pinned while the text scrolls
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".photo-container", // We pin the class we added to the right side
      });

      // 2. IMAGE REVEAL LOGIC
      detailsRef.current.forEach((detail, index) => {
        // Skip the first one (it's already visible)
        if (index === 0) return;

        const photo = photosRef.current[index];

        gsap.fromTo(
          photo,
          { clipPath: "inset(100% 0% 0% 0%)" }, // Hidden (masked from bottom)
          {
            clipPath: "inset(0% 0% 0% 0%)", // Fully visible
            ease: "none", // Linear ease links it directly to scroll
            scrollTrigger: {
              trigger: detail, // When this text block...
              start: "top center", // ...hits the center of the screen
              end: "top top", // ...until it hits the top
              scrub: true, // Smooth scrubbing
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-[#867070]">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* --- LEFT SIDE: SCROLLABLE TEXT --- */}
        <div className="w-full md:w-1/2 flex flex-col items-center py-20 md:py-0 z-10">
          {GUESTS.map((guest, i) => (
            <div
              key={guest.id}
              ref={(el) => {
                if (el) detailsRef.current[i] = el;
              }}
              // Each block is 100vh so it takes full focus
              className="h-screen w-full flex flex-col justify-center px-8 md:px-20 relative"
            >
              {/* Decorative Number */}
              <span className="text-[#F5EBEB] opacity-20 font-black text-[8rem] md:text-[12rem] absolute top-10 -left-10 md:-left-20 leading-none select-none z-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[#F5EBEB] text-[#867070] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {guest.episode}
                  </span>
                  <span className="text-[#D5B4B4] font-mono text-xs uppercase tracking-widest">
                    {guest.role}
                  </span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black text-[#F5EBEB] uppercase leading-none mb-8">
                  {guest.name}
                </h2>

                <p className="text-[#D5B4B4] text-lg md:text-xl font-light leading-relaxed max-w-md">
                  {guest.bio}
                </p>

                <button className="mt-10 text-[#F5EBEB] font-bold uppercase tracking-widest text-sm border-b border-[#F5EBEB]/30 pb-1 hover:border-[#F5EBEB] hover:text-white transition-all self-start">
                  Listen Now ↗
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- RIGHT SIDE: STICKY PHOTOS --- */}
        {/* This container gets Pinned by GSAP */}
        <div className="photo-container hidden md:block w-1/2 h-screen absolute right-0 top-0 overflow-hidden">
          {GUESTS.map((guest, i) => (
            <div
              key={guest.id}
              ref={(el) => {
                if (el) photosRef.current[i] = el;
              }}
              // First image is visible, others are stacked absolutely
              className="absolute inset-0 w-full h-full bg-[#867070]"
              style={{ zIndex: i }} // Stack order: 0, 1, 2...
            >
              <Image
                src={guest.image}
                alt={guest.name}
                fill
                className="object-cover"
                priority={i === 0} // Load first image immediately
              />
              {/* Gradient Overlay for integration */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#867070]/80 via-transparent to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
