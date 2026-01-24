"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Arjun Verma",
    role: "Host & Creator",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2500&auto=format&fit=crop",
    isHost: true,
  },
  {
    id: 2,
    name: "Sanya Iyer",
    role: "Executive Producer",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2500&auto=format&fit=crop",
    isHost: false,
  },
  {
    id: 3,
    name: "Rohan Das",
    role: "Sound Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2500&auto=format&fit=crop",
    isHost: false,
  },
  {
    id: 4,
    name: "Meera Nair",
    role: "Social Media Head",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2500&auto=format&fit=crop",
    isHost: false,
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null); // NEW: Ref for background text

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      const trackWidth = trackRef.current.offsetWidth;
      const windowWidth = window.innerWidth;
      const scrollAmount = trackWidth - windowWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollAmount + 1000}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Move Cards Left
      tl.to(trackRef.current, {
        x: -scrollAmount,
        ease: "none",
      })
        // 2. Move Background Text Right (Parallax)
        // This makes the text slide slowly to the right as you scroll
        .to(
          bgTextRef.current,
          {
            x: windowWidth * 0.15, // Move it 15% of screen width
            ease: "none",
          },
          "<",
        );

      // 3. Image Parallax
      const images = gsap.utils.toArray(".team-img") as HTMLImageElement[];
      images.forEach((img) => {
        gsap.to(img, {
          objectPosition: "100% 50%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${scrollAmount + 1000}`,
            scrub: 1,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full bg-[#E4D0D0] overflow-hidden flex flex-col justify-center relative z-40"
    >
      {/* Background Typography */}
      <div
        ref={bgTextRef}
        // Updated: increased opacity to 0.2 and z-index slightly to ensure visibility
        className="absolute top-10 left-10 opacity-20 pointer-events-none z-0"
      >
        {/* Updated: larger text size (18vw) and tighter tracking for impact */}
        <h2 className="text-[18vw] font-black text-[#867070] leading-none tracking-tighter whitespace-nowrap">
          THE CREW
        </h2>
      </div>

      {/* HORIZONTAL TRACK */}
      <div
        ref={trackRef}
        className="flex items-center h-[70vh] pl-[10vw] pr-[10vw] gap-10 md:gap-20 w-max z-10"
      >
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            className={`relative flex-shrink-0 group ${
              member.isHost
                ? "w-[80vw] md:w-[600px] h-full"
                : "w-[70vw] md:w-[350px] h-[80%]"
            }`}
          >
            {/* CARD CONTAINER */}
            <div className="w-full h-full relative overflow-hidden bg-[#867070] shadow-2xl transition-transform duration-500 group-hover:-translate-y-4">
              {member.isHost && (
                <div className="absolute top-6 left-6 z-30 bg-[#F5EBEB] text-[#867070] px-4 py-1 text-sm font-bold uppercase tracking-widest shadow-lg">
                  The Voice
                </div>
              )}

              <Image
                src={member.image}
                alt={member.name}
                fill
                className="team-img object-cover object-left grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#4a3b3b] via-transparent to-transparent opacity-80"></div>

              <div className="absolute bottom-0 left-0 w-full p-8">
                <p className="text-[#D5B4B4] font-mono text-xs md:text-sm uppercase tracking-widest mb-2">
                  {member.role}
                </p>
                <h3
                  className={`font-black text-[#F5EBEB] uppercase leading-none ${
                    member.isHost
                      ? "text-5xl md:text-7xl"
                      : "text-3xl md:text-4xl"
                  }`}
                >
                  {member.name.split(" ").map((n, i) => (
                    <span key={i} className="block">
                      {n}
                    </span>
                  ))}
                </h3>
              </div>
            </div>

            {!member.isHost && (
              <div className="absolute -bottom-12 left-0 w-full h-[1px] bg-[#867070]/30 group-hover:w-full transition-all duration-500 w-0"></div>
            )}
          </div>
        ))}

        {/* JOIN US CARD */}
        <div className="w-[300px] h-[60%] flex items-center justify-center flex-shrink-0 border-2 border-dashed border-[#867070]/50 rounded-3xl hover:bg-[#867070]/5 transition-colors cursor-pointer group">
          <div className="text-center">
            <span className="block text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              👋
            </span>
            <p className="text-[#867070] font-bold uppercase tracking-widest text-sm">
              Join the Team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
