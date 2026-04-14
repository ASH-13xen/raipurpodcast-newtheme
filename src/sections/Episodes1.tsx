/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { episodesList, CATEGORIES } from "@/data/episodelist";

gsap.registerPlugin(ScrollTrigger);

export default function Episodes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // --- 1. WHEEL TO HORIZONTAL SCROLL ---
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 3,
        behavior: "auto",
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeCategory]);

  // --- 2. DATA PREP ---
  const categoryCovers = useMemo(() => {
    const covers: Record<string, string> = {};
    CATEGORIES.forEach((cat) => {
      const found = episodesList.find((ep) =>
        cat === "All" ? true : ep.category === cat,
      );
      if (found) covers[cat] = found.image;
    });
    return covers;
  }, []);

  const filteredEpisodes = useMemo(() => {
    if (!activeCategory) return [];
    if (activeCategory === "All") return episodesList;
    return episodesList.filter((ep) => ep.category === activeCategory);
  }, [activeCategory]);

  // --- 3. ANIMATION LOGIC ---
  useGSAP(
    () => {
      // Logic for Genre Grid (View 1)
      if (!activeCategory) {
        gsap.fromTo(
          ".genre-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
        );
      }
      // Logic for Episodes (View 2)
      else {
        gsap.fromTo(
          ".episode-card",
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
          },
        );
      }
    },
    { scope: containerRef, dependencies: [activeCategory] },
  );

  const handleEpisodeClick = (url: string) => {
    if (url) window.open(url, "_blank");
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full bg-white relative z-30 py-20 flex flex-col justify-center overflow-hidden"
    >
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* --- VIEW 1: GENRE GRID --- */}
      {!activeCategory && (
        <div key="grid-view" className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#C5A059] font-mono text-sm uppercase tracking-[0.2em] mb-4 font-bold">
              The Archive
            </h2>
            <h3 className="text-5xl md:text-8xl font-black text-[#0A2540] uppercase tracking-tighter leading-none">
              Collections
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="genre-card group relative h-80 rounded-[2rem] overflow-hidden bg-[#0A2540] cursor-pointer shadow-xl border border-transparent hover:border-[#C5A059]/30 transition-colors"
              >
                <Image
                  src={categoryCovers[cat] || ""}
                  alt={cat}
                  fill
                  className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-black text-white uppercase">
                    {cat}
                  </h3>
                  <p className="text-[#C5A059] font-bold text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all">
                    EXPLORE &rarr;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- VIEW 2: HORIZONTAL EPISODES --- */}
      {activeCategory && (
        <div key="episode-view" className="w-full flex flex-col">
          {/* Header */}
          <div className="px-6 md:px-20 mb-10 flex justify-between items-end">
            <div>
              {/* --- FIX APPLIED HERE: Added relative, z-50, and type="button" --- */}
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="relative z-50 text-[#0A2540] font-black text-xs uppercase tracking-widest flex items-center gap-2 mb-4 hover:text-[#C5A059] transition-colors bg-transparent border-none cursor-pointer"
              >
                &larr; Back to Gallery
              </button>
              <h2 className="text-6xl md:text-9xl font-black text-[#0A2540] uppercase leading-none tracking-tighter">
                {activeCategory}
              </h2>
            </div>
            <div className="text-[#0A2540]/30 font-mono text-[10px] uppercase tracking-widest hidden md:block">
              Use Mouse Wheel to Scroll &rarr;
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing px-6 md:px-20 py-6"
          >
            <div className="flex gap-8 w-max">
              {filteredEpisodes.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => handleEpisodeClick(ep.yt_url)}
                  className="episode-card group relative h-[500px] w-[350px] md:w-[450px] flex-shrink-0 rounded-[3rem] overflow-hidden bg-[#0A2540] shadow-2xl transition-all duration-500 hover:-translate-y-4"
                >
                  <Image
                    src={ep.image}
                    alt={ep.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <div className="w-20 h-20 bg-[#C5A059] rounded-full flex items-center justify-center shadow-2xl">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 p-10 w-full">
                    <div className="flex justify-between mb-4">
                      <span className="bg-[#C5A059] text-[#0A2540] text-[10px] font-black px-3 py-1 rounded-full uppercase">
                        {ep.duration}
                      </span>
                      <span className="text-white/50 text-[10px] font-bold font-mono">
                        {ep.date}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight uppercase">
                      {ep.title}
                    </h3>
                  </div>
                </div>
              ))}
              <div className="w-20 md:w-40 flex-shrink-0" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
