/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { teamMembers } from "@/data/team";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      // Wrap the math in a function using scrollWidth to get the TRUE width of all 9 items
      const getScrollAmount = () => {
        const trackWidth = trackRef.current ? trackRef.current.scrollWidth : 0;
        return trackWidth - window.innerWidth + 150; // Added 150px buffer for right padding
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // Use functional values so GSAP recalculates dynamically
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Forces recalculation on layout changes/resizes
        },
      });

      // 1. Move Cards Left
      tl.to(trackRef.current, {
        x: () => -getScrollAmount(), // Functional value
        ease: "none",
      })
        // 2. Move Background Text Right (Parallax)
        .to(
          bgTextRef.current,
          {
            x: () => window.innerWidth * 0.15,
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
            end: () => `+=${getScrollAmount()}`,
            scrub: 1,
            invalidateOnRefresh: true, // Keeps parallax synced with the new length
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full bg-[#0A2540] overflow-hidden flex flex-col justify-center relative z-40"
    >
      {/* Background Typography */}
      <div
        ref={bgTextRef}
        className="absolute top-10 left-10 opacity-[0.05] pointer-events-none z-0"
      >
        <h2 className="text-[18vw] font-black text-white leading-none tracking-tighter whitespace-nowrap">
          THE CREW
        </h2>
      </div>

      {/* HORIZONTAL TRACK */}
      <div
        ref={trackRef}
        className="flex items-center h-[70vh] pl-[10vw] pr-[10vw] gap-10 md:gap-20 w-max z-10"
      >
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className={`relative flex-shrink-0 group ${
              member.isHost
                ? "w-[80vw] md:w-[600px] h-full"
                : "w-[70vw] md:w-[350px] h-[80%]"
            }`}
          >
            {/* CARD CONTAINER */}
            <div className="w-full h-full relative overflow-hidden bg-white shadow-2xl transition-transform duration-500 group-hover:-translate-y-4">
              {member.isHost && (
                <div className="absolute top-6 left-6 z-30 bg-[#0A2540] text-[#C5A059] px-4 py-1 text-sm font-bold uppercase tracking-widest shadow-lg border border-[#C5A059]/20">
                  The Voice
                </div>
              )}

              <Image
                src={member.imgUrl}
                alt={member.name}
                fill
                className="team-img object-cover object-left transition-all duration-700 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90"></div>

              <div className="absolute bottom-0 left-0 w-full p-8">
                <p className="text-[#C5A059] font-mono text-xs md:text-sm uppercase tracking-widest mb-2 font-bold">
                  {member.role}
                </p>
                <h3
                  className={`font-black text-[#0A2540] uppercase leading-none ${
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
              <div className="absolute -bottom-12 left-0 w-full h-[2px] bg-[#C5A059]/50 group-hover:w-full transition-all duration-500 w-0"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
