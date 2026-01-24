"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- GENERATE 100 DUMMY GUESTS ---
const NAMES = [
  "Ananya Birla",
  "Ritesh Agarwal",
  "Zakir Khan",
  "Masaba Gupta",
  "Ranveer Allahbadia",
  "Prajakta Koli",
  "Aman Gupta",
  "Nikhil Kamath",
  "Ghazal Alagh",
  "Tanmay Bhat",
  "Bhuvan Bam",
  "Kusha Kapila",
  "Dolly Singh",
  "CarryMinati",
  "BeerBiceps",
  "Sandeep Maheshwari",
  "Gaurav Taneja",
  "Mumbiker Nikhil",
  "Faye D'Souza",
  "Dhruv Rathee",
];

const ROLES = [
  "Musician",
  "Founder",
  "Comedian",
  "Designer",
  "Creator",
  "Investor",
  "Actor",
];

// specific images for the first few to show it works, then placeholders
const REAL_IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
];

const GUESTS = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  name: i < 20 ? NAMES[i] : `${NAMES[i % NAMES.length]} ${i}`, // Generate names
  role: ROLES[i % ROLES.length],
  image:
    i < 4
      ? REAL_IMAGES[i]
      : `https://images.unsplash.com/photo-${1500000000000 + i}?q=80&w=800&auto=format&fit=crop`, // Dynamic placeholder
}));

export default function GuestsDirectory() {
  const [activeGuest, setActiveGuest] = useState<(typeof GUESTS)[0] | null>(
    null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // MOUSE TRACKING FOR "VIEW" LABEL
  useGSAP(() => {
    const xTo = gsap.quickTo(cursorLabelRef.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorLabelRef.current, "y", {
      duration: 0.4,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      // Only move if we are hovering
      if (activeGuest) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeGuest]);

  // IMAGE REVEAL ANIMATION
  useGSAP(() => {
    if (activeGuest && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0, rotate: -2 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        },
      );
    }
  }, [activeGuest]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#867070] text-[#F5EBEB] py-20 px-4 md:px-10 z-20 cursor-crosshair"
      onMouseLeave={() => setActiveGuest(null)}
    >
      {/* HEADER */}
      <div className="mb-12 border-b border-[#F5EBEB]/20 pb-8 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Guest Archive
          </h2>
          <p className="text-[#D5B4B4] font-mono text-xs uppercase tracking-widest mt-2">
            Sorted Alphabetically • 100+ Episodes
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-4xl font-black opacity-30">{GUESTS.length}</p>
          <p className="text-xs uppercase tracking-widest opacity-50">Voices</p>
        </div>
      </div>

      {/* --- THE DIRECTORY LIST --- */}
      {/* We use the 'group' class on the parent to handle the dimming effect purely with CSS.
         When the parent is hovered (group-hover), ALL children fade out.
         BUT the specific child being hovered (hover:) fades back in.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-1 w-full group">
        {GUESTS.map((guest) => (
          <div
            key={guest.id}
            onMouseEnter={() => setActiveGuest(guest)}
            className="
              relative flex items-baseline justify-between py-3 border-b border-[#F5EBEB]/10 
              transition-all duration-300
              group-hover:opacity-20 hover:!opacity-100 hover:pl-4
            "
          >
            <span className="text-sm md:text-lg font-bold uppercase truncate pr-4">
              {guest.name}
            </span>
            <span className="text-[10px] font-mono text-[#D5B4B4] uppercase tracking-wider whitespace-nowrap">
              {guest.role}
            </span>
          </div>
        ))}
      </div>

      {/* --- THE FLOATING REVEAL IMAGE (FIXED CENTER) --- */}
      {/* Only visible when a guest is active */}
      <div
        className={`fixed inset-0 pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ${activeGuest ? "opacity-100" : "opacity-0"}`}
      >
        {activeGuest && (
          <div className="relative w-[300px] h-[400px] md:w-[450px] md:h-[600px] bg-black rounded-lg overflow-hidden shadow-2xl border-[6px] border-[#F5EBEB]">
            <Image
              ref={imageRef as any} // TS casting for quick ref usage
              src={activeGuest.image}
              alt={activeGuest.name}
              fill
              className="object-cover"
            />

            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-3xl font-black text-[#F5EBEB] uppercase leading-none">
                {activeGuest.name}
              </h3>
              <p className="text-[#867070] font-bold text-sm mt-1">
                EPISODE #{100 - activeGuest.id}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* --- FLOATING CURSOR LABEL --- */}
      <div
        ref={cursorLabelRef}
        className={`fixed top-0 left-0 w-20 h-20 bg-[#F5EBEB] rounded-full flex items-center justify-center pointer-events-none z-[60] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-opacity duration-200 ${activeGuest ? "opacity-100" : "opacity-0"}`}
      >
        <span className="text-[#867070] text-[10px] font-black uppercase tracking-widest">
          VIEW
        </span>
      </div>
    </section>
  );
}
