"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DUMMY DATA (Duplicated to ensure smooth infinite scroll) ---
const BASE_GUESTS = [
  {
    id: 1,
    name: "Ananya Birla",
    role: "Musician",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ritesh Agarwal",
    role: "Oyo Founder",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Zakir Khan",
    role: "Comedian",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Masaba Gupta",
    role: "Designer",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Ranveer Allahbadia",
    role: "Podcaster",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Prajakta Koli",
    role: "YouTuber",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Aman Gupta",
    role: "Boat Lifestyle",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Nikhil Kamath",
    role: "Zerodha",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Ghazal Alagh",
    role: "Mamaearth",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
  },
];

// Duplicate data to create "infinite" illusion (3 sets covers most screen heights)
const GUESTS = [...BASE_GUESTS, ...BASE_GUESTS, ...BASE_GUESTS];

export default function GuestsMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  // To store our GSAP tweens so we can pause/play them
  const tweens = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      if (!col1Ref.current || !col2Ref.current || !col3Ref.current) return;

      // Helper to create infinite loop
      const createLoop = (
        target: HTMLElement,
        direction: "up" | "down",
        duration: number,
      ) => {
        const distance = target.scrollHeight / 3; // We scroll 1/3rd (one set of data) then reset

        const tween = gsap.to(target, {
          y: direction === "up" ? -distance : distance,
          duration: duration,
          ease: "none",
          repeat: -1,
          // When one set finishes, we instantly reset to 0 to loop seamlessly
          modifiers: {
            y: gsap.utils.unitize((y) => parseFloat(y) % distance),
          },
        });
        tweens.current.push(tween);
        return tween;
      };

      // 1. SETUP LOOPS
      // Col 1 & 3 go UP, Col 2 goes DOWN
      // Vary durations slightly for organic feel
      const t1 = createLoop(col1Ref.current, "up", 30);
      const t2 = createLoop(col2Ref.current, "down", 25);
      const t3 = createLoop(col3Ref.current, "up", 35);

      // 2. SCROLL VELOCITY TRIGGER
      // When user scrolls, we speed up the animation timeScale
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const timeScale = 1 + velocity / 1000; // Base speed 1 + acceleration

          // Smoothly adjust speed
          gsap.to([t1, t2, t3], {
            timeScale: timeScale,
            duration: 0.5,
            overwrite: true,
            onComplete: () => {
              // Return to normal speed when scroll stops
              gsap.to([t1, t2, t3], { timeScale: 1, duration: 1 });
            },
          });
        },
      });
    },
    { scope: sectionRef },
  );

  // --- INTERACTION HANDLERS ---
  const handleMouseEnter = () => {
    // Pause all columns
    tweens.current.forEach((t) => t.timeScale(0.2)); // Slow down almost to stop
    // Dim all cards by default (handled via CSS class on parent)
    sectionRef.current?.classList.add("is-hovering");
  };

  const handleMouseLeave = () => {
    // Resume columns
    tweens.current.forEach((t) => gsap.to(t, { timeScale: 1, duration: 0.5 }));
    // Remove dim effect
    sectionRef.current?.classList.remove("is-hovering");
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full bg-[#867070] overflow-hidden relative z-20 flex flex-col items-center justify-center"
    >
      {/* HEADER OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b from-[#867070] to-transparent z-30 pointer-events-none flex items-start justify-center pt-8">
        <h2 className="text-4xl md:text-6xl font-black text-[#F5EBEB] uppercase tracking-tighter drop-shadow-xl">
          Guest List
        </h2>
      </div>

      {/* MARQUEE GRID */}
      <div
        className="w-full h-[120%] grid grid-cols-3 gap-4 md:gap-8 px-4 md:px-20 -rotate-3 scale-110" // Tilted and scaled for style
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* COLUMN 1 (UP) */}
        <div ref={col1Ref} className="flex flex-col gap-6 md:gap-8">
          {GUESTS.map((guest, i) => (
            <GuestCard key={`c1-${i}`} guest={guest} />
          ))}
        </div>

        {/* COLUMN 2 (DOWN - Start with negative margin to offset visual) */}
        <div ref={col2Ref} className="flex flex-col gap-6 md:gap-8 -mt-[500px]">
          {GUESTS.map((guest, i) => (
            <GuestCard key={`c2-${i}`} guest={guest} />
          ))}
        </div>

        {/* COLUMN 3 (UP) */}
        <div ref={col3Ref} className="flex flex-col gap-6 md:gap-8">
          {GUESTS.map((guest, i) => (
            <GuestCard key={`c3-${i}`} guest={guest} />
          ))}
        </div>
      </div>

      {/* FOOTER FADE OVERLAY */}
      <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#867070] to-transparent z-30 pointer-events-none"></div>

      {/* CSS FOR FOCUS EFFECT */}
      <style jsx>{`
        .is-hovering .guest-card {
          opacity: 0.3;
          filter: grayscale(100%);
          transform: scale(0.95);
        }
        .is-hovering .guest-card:hover {
          opacity: 1;
          filter: grayscale(0%);
          transform: scale(1.05);
          z-index: 50;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
}

// SUB-COMPONENT FOR CLEANER CODE
function GuestCard({ guest }: { guest: (typeof BASE_GUESTS)[0] }) {
  return (
    <div className="guest-card relative w-full aspect-[3/4] bg-black rounded-xl overflow-hidden transition-all duration-500 ease-out cursor-pointer">
      <Image src={guest.image} alt={guest.name} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>

      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
        <p className="text-[#D5B4B4] text-[10px] uppercase font-bold tracking-widest mb-1">
          {guest.role}
        </p>
        <h3 className="text-[#F5EBEB] text-lg md:text-2xl font-black uppercase leading-none">
          {guest.name}
        </h3>
      </div>
    </div>
  );
}
