/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    id: 1,
    name: "Aisha Verma",
    role: "Architect",
    quote:
      "I never realized how much history was hidden in our daily commute. This podcast has completely changed how I see Raipur.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Rohan Das",
    role: "Filmmaker",
    quote:
      "The sound design is absolutely world-class. It feels less like a podcast and more like a movie for your ears.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Priya Singh",
    role: "Food Blogger",
    quote:
      "You guys captured the soul of the street food scene. I was drooling the entire time listening to the Telibandha episode.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Kabir Mehta",
    role: "Musician",
    quote:
      "Finally, a platform that gives Chhattisgarh the artistic spotlight it deserves. Pure inspiration.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const totalCards = REVIEWS.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalCards * 100}%`, // Scroll distance based on number of cards
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Animate cards one by one
      cardsRef.current.forEach((card, index) => {
        // We don't animate the last card away, it stays as the anchor
        if (index === totalCards - 1) return;

        tl.to(card, {
          y: -window.innerHeight, // Fly up off screen
          rotation: Math.random() * 10 - 5, // Slight random rotation
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="h-screen w-full bg-[#F5EBEB] overflow-hidden flex flex-col items-center justify-center relative z-20"
    >
      {/* Background Title */}
      <div className="absolute top-10 left-0 w-full text-center z-0 opacity-10">
        <h2 className="text-[15vw] font-black text-[#867070] leading-none tracking-tighter">
          REVIEWS
        </h2>
      </div>

      {/* CARD STACK CONTAINER */}
      <div className="relative w-[90vw] md:w-[600px] h-[400px] md:h-[500px] z-10 perspective-1000">
        {REVIEWS.map((review, i) => (
          <div
            key={review.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            // Absolute positioning stacks them
            className="absolute inset-0 w-full h-full bg-[#867070] rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-2xl border border-[#F5EBEB]/10 origin-bottom"
            // We reverse the z-index so the first item in array is on TOP
            style={{ zIndex: REVIEWS.length - i }}
          >
            {/* Quote Icon */}
            <div className="text-[#F5EBEB]/20">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
              </svg>
            </div>

            {/* Quote Text */}
            <p className="text-[#F5EBEB] text-xl md:text-3xl font-serif leading-relaxed">
              "{review.quote}"
            </p>

            {/* User Profile */}
            <div className="flex items-center gap-4 mt-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#F5EBEB]/50">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-[#F5EBEB] font-bold uppercase tracking-wider text-sm">
                  {review.name}
                </h4>
                <p className="text-[#D5B4B4] text-xs font-mono uppercase">
                  {review.role}
                </p>
              </div>
            </div>

            {/* Card Number Indicator */}
            <div className="absolute top-8 right-8 text-[#F5EBEB]/20 font-mono text-xl">
              0{i + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <p className="text-[#867070] text-[10px] uppercase tracking-widest">
          Scroll to read
        </p>
        <div className="w-[1px] h-10 bg-[#867070]"></div>
      </div>
    </section>
  );
}
