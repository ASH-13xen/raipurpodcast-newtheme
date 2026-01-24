/* eslint-disable react/no-unescaped-entities */
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
    role: "Musician",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ritesh Agarwal",
    role: "Oyo Founder",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Zakir Khan",
    role: "Comedian",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Masaba Gupta",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Ranveer Allahbadia",
    role: "Podcaster",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Prajakta Koli",
    role: "YouTuber",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Aman Gupta",
    role: "Boat Lifestyle",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Guests() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!wheelRef.current || !sectionRef.current) return;

      // Radius of our "Vinyl"
      const radius = 600; // Increased radius for a flatter arc
      const totalGuests = GUESTS.length;
      const sliceAngle = 360 / totalGuests;

      // 1. INITIAL SETUP: Position cards in a circle
      gsap.set(cardsRef.current, {
        transformOrigin: `50% ${radius + 150}px`, // This makes them rotate around the center of the wheel
        z: 0,
      });

      // Apply initial rotation to distribute them
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          rotation: i * -sliceAngle, // Negative to arrange clockwise
        });
        // Important: We need the IMAGE/CONTENT to counter-rotate immediately so it stands up
        gsap.set(card.querySelector(".card-inner"), {
          rotation: i * sliceAngle,
        });
      });

      // 2. THE SPIN ANIMATION
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000", // Long scroll distance for spinning
          pin: true,
          scrub: 1,
        },
      });

      // Rotate the entire wheel container
      tl.to(wheelRef.current, {
        rotation: 360, // One full spin
        ease: "none",
      });

      // 3. COUNTER-ROTATE CARDS (To keep them upright)
      // As the wheel spins +360, the cards must spin -360 relative to the wheel
      tl.to(
        ".card-inner",
        {
          rotation: "-=360",
          ease: "none",
        },
        "<", // Sync start
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full bg-[#867070] overflow-hidden flex flex-col items-center relative z-20"
    >
      {/* HEADER */}
      <div className="absolute top-10 w-full text-center z-20">
        <p className="text-[#D5B4B4] font-mono text-xs uppercase tracking-[0.3em] mb-2">
          The Hall of Fame
        </p>
        <h2 className="text-[12vw] md:text-[8vw] font-black text-[#F5EBEB] leading-none opacity-20 tracking-tighter mix-blend-overlay">
          VIP GUESTS
        </h2>
      </div>

      {/* THE VINYL WHEEL CONTAINER */}
      <div
        ref={wheelRef}
        className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] flex justify-center"
      >
        {GUESTS.map((guest, i) => (
          <div
            key={guest.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="absolute top-0 left-0 w-[280px] h-[380px] -ml-[140px] -mt-[190px] cursor-pointer"
          >
            {/* CARD INNER: This part counter-rotates to stay upright */}
            <div className="card-inner w-full h-full relative group perspective-1000">
              {/* THE VISUAL CARD */}
              <div className="w-full h-full bg-[#F5EBEB] rounded-2xl p-3 shadow-2xl transition-all duration-500 ease-out group-hover:scale-125 group-hover:z-50 relative border-4 border-[#F5EBEB]">
                {/* Image Container */}
                <div className="w-full h-[75%] relative overflow-hidden rounded-xl bg-black">
                  <Image
                    src={guest.image}
                    alt={guest.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Info (Shown on Hover) */}
                <div className="h-[25%] flex flex-col justify-center items-center pt-2">
                  <h3 className="text-[#867070] font-black text-xl leading-none uppercase mb-1">
                    {guest.name}
                  </h3>
                  <p className="text-[#867070]/60 font-mono text-xs uppercase tracking-widest group-hover:text-[#867070] transition-colors">
                    {guest.role}
                  </p>
                </div>

                {/* HOVER DETAIL POPUP (Floating outside) */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[200px] bg-[#867070] text-[#F5EBEB] text-center p-3 rounded-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none shadow-xl z-50">
                  <p className="text-xs font-bold leading-tight">
                    "Listen to {guest.name}'s journey on Ep #{10 + i}"
                  </p>
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#867070] rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DECORATIVE VINYL GROOVES (Background) */}
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-[0] w-[1200px] h-[1200px] rounded-full border-[2px] border-[#F5EBEB]/5 pointer-events-none"></div>
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-[0] w-[1000px] h-[1000px] rounded-full border-[2px] border-[#F5EBEB]/5 pointer-events-none"></div>
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-[0] w-[800px] h-[800px] rounded-full border-[2px] border-[#F5EBEB]/5 pointer-events-none"></div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <div className="w-[1px] h-10 bg-[#F5EBEB]"></div>
        <span className="text-[#F5EBEB] text-[10px] uppercase tracking-widest">
          Spin to Explore
        </span>
      </div>
    </section>
  );
}
