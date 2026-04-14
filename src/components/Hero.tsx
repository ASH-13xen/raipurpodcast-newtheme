"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { insightsList } from "@/data/insights";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 3D Tilt Effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        if (!imageRef.current) return;
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        gsap.to(imageRef.current, {
          rotateY: xPos,
          rotateX: -yPos,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef },
  );

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, "_blank");
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] w-full bg-[#0A2540] text-white font-sans flex flex-col lg:flex-row"
      style={{ perspective: "1000px" }}
    >
      <style jsx global>{`
        .insights-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .insights-scroll::-webkit-scrollbar-track {
          background: rgba(197, 160, 89, 0.1);
        }
        .insights-scroll::-webkit-scrollbar-thumb {
          background: #c5a059;
          border-radius: 10px;
        }
      `}</style>

      {/* LEFT SECTION: 70% - THE TEAM IMAGE (3D) */}
      <div className="relative w-full lg:w-[70%] h-[60vh] lg:min-h-screen flex items-center justify-center p-8 lg:p-20 z-50">
        <div
          ref={imageRef}
          className="relative w-full h-full max-w-5xl aspect-square lg:aspect-video overflow-visible transition-transform duration-300 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Background Glow */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[60%] bg-[#C5A059]/5 blur-[120px] rounded-full -z-10"></div>

          {/* THE IMAGE with 3D Perspective and OVERFLOW */}
          <div className="relative w-full h-[120%] lg:h-[130%] flex items-center justify-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]">
            <Image
              src="/team1.png"
              alt="Raipur Podcast Team"
              fill
              className="object-contain"
              priority
              style={{
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.9))",
                transform: "translateZ(100px) translateY(10%)",
              }}
            />
          </div>

          {/* Floating Elements/Overlay for Depth */}
          <div
            className="absolute top-0 -left-10 p-6 bg-[#0A2540]/60 backdrop-blur-xl border border-white/10 rounded-2xl hidden lg:block shadow-2xl"
            style={{ transform: "translateZ(150px)" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="h-1 w-8 bg-[#C5A059]"></span>
              <p className="text-[#C5A059] font-black text-2xl tracking-tighter">
                THE SQUAD
              </p>
            </div>
            <p className="text-white/80 text-sm font-medium leading-tight">
              Capturing the <br />
              essence of Raipur.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: 30% - SCROLLABLE INSIGHTS */}
      <div className="w-full lg:w-[30%] h-[50vh] lg:h-screen bg-[#0A2540] border-l border-white/5 flex flex-col z-[60] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] lg:sticky lg:top-0">
        <div className="p-8 lg:p-12 flex-shrink-0 border-b border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
            <h2 className="text-[#C5A059] font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              Trending Insights
            </h2>
          </div>
          <h3 className="text-4xl font-black text-white uppercase leading-none tracking-tighter">
            PODCAST <br />
            <span className="text-[#C5A059]">MOMENTS</span>
          </h3>
        </div>

        <div className="flex-grow overflow-y-auto p-6 lg:p-10 space-y-8 insights-scroll bg-gradient-to-b from-[#0A2540] to-[#0D1B2A]">
          {insightsList.map((insight) => (
            <div
              key={insight.id}
              onClick={() => handleCardClick(insight.videoUrl)}
              className="group relative bg-[#0D1B2A]/50 hover:bg-[#16293A] border border-white/5 rounded-3xl p-6 transition-all duration-500 cursor-pointer overflow-hidden shadow-xl"
            >
              {/* Hover Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C5A059]/0 via-[#C5A059]/10 to-[#C5A059]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-[#C5A059]/20 text-[#C5A059] font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-full">
                    {insight.category}
                  </span>
                  <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                    <span className="font-mono text-[9px] uppercase">{insight.episode}</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white leading-tight group-hover:text-[#C5A059] transition-colors duration-300 line-clamp-2 mb-6">
                  {insight.title}
                </h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#C5A059] font-black text-[10px] uppercase tracking-widest">
                    <span>Watch Shot</span>
                    <svg
                      className="transform group-hover:translate-x-1 transition-transform"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/5 group-hover:bg-[#C5A059] flex items-center justify-center transition-all duration-500 transform group-hover:rotate-12">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={insight.videoUrl?.includes('insta') ? 'white' : 'currentColor'} className="text-white group-hover:text-[#0A2540]">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom Spacer */}
          <div className="h-20" />
        </div>
      </div>
    </div>
  );
}
