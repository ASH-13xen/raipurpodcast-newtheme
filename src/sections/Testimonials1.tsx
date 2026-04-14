/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Using a subset of your data for a clean layout
const TESTIMONIALS = [
  {
    id: 1,
    text: "My favorite solution in the market. We work 5x faster with COMPANY. The insights from the episodes are genuinely life-changing for our startup journey.",
    name: "Alex Johnson",
    role: "CEO at TechCorp",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    text: "I know it's cliche, but we were lost before we found this podcast. The guests are top-tier and the production quality is unmatched in the region.",
    name: "Stephanie Lee",
    role: "COO at InnovateCo",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    text: "This podcast makes planning for the future seamless. Can't recommend them enough! It's become a mandatory listen for our marketing team every Tuesday.",
    name: "Marie Davis",
    role: "CFO at FuturePlanning",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.from(".test-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Cards Stagger Animation
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: ".testimonial-grid",
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Cards appear one by one
        ease: "back.out(1.7)",
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      // UPDATED: Background Navy Blue (#0A2540) to contrast with previous white section
      className="relative w-full bg-[#0A2540] text-white py-20 px-6 md:py-32 md:px-20 overflow-hidden"
    >
      {/* Background Decor - Subtle Gold Rings */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-[#C5A059]/10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full border border-[#C5A059]/5 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* HEADER */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="test-header text-[#C5A059] font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-bold">
          Community Love
        </h2>
        <h3 className="test-header text-4xl md:text-7xl font-black text-white leading-none">
          WHAT THEY SAY
        </h3>
      </div>

      {/* CARDS GRID */}
      <div className="testimonial-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative z-10 max-w-7xl mx-auto">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            // UPDATED: Card Styling
            // Bg: White
            // Text: Navy (#0A2540)
            // Accent: Gold
            className="testimonial-card flex flex-col justify-between bg-white p-8 md:p-10 rounded-2xl shadow-2xl hover:-translate-y-2 transition-transform duration-500 ease-out"
          >
            <div>
              {/* QUOTE ICON */}
              <div className="mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-[#C5A059] opacity-80"
                >
                  <path d="M14.017 21L14.017 18C14.017 16.0547 14.4453 14.5332 15.3027 13.4355C16.1602 12.3379 17.6523 11.666 19.7793 11.42V9.03906C17.3008 9.27344 15.6504 9.94727 14.8281 11.0605C14.0059 12.1738 13.5957 13.9102 13.5957 16.2695V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.0547 5.44531 14.5332 6.30273 13.4355C7.16016 12.3379 8.65234 11.666 10.7793 11.42V9.03906C8.30078 9.27344 6.65039 9.94727 5.82812 11.0605C5.00586 12.1738 4.5957 13.9102 4.5957 16.2695V21H5.0166Z" />
                </svg>
              </div>

              {/* TEXT */}
              <p className="text-[#0A2540] text-lg md:text-xl font-medium leading-relaxed mb-8">
                "{item.text}"
              </p>
            </div>

            {/* USER INFO */}
            <div className="flex items-center gap-4 border-t border-[#0A2540]/10 pt-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C5A059]">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-[#0A2540] font-bold text-sm md:text-base uppercase tracking-wide">
                  {item.name}
                </h4>
                <p className="text-[#C5A059] text-xs font-mono font-bold uppercase tracking-wider">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
