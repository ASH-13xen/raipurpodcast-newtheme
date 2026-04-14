"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { episodesList, CATEGORIES } from "@/data/episodelist";

gsap.registerPlugin(ScrollTrigger);

// --- TYPES ---
interface AccordionItemProps {
  id: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

// --- SUB-COMPONENT: ACCORDION ITEM ---
const AccordionItem = ({
  title,
  imageUrl,
  isActive,
  onMouseEnter,
  onClick,
}: AccordionItemProps) => {
  // Mobile Fix: First tap expands the accordion, second tap opens the category.
  const handleInteraction = () => {
    if (!isActive) {
      onMouseEnter();
    } else {
      onClick();
    }
  };

  return (
    <div
      className={`
        relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        /* Adjusted scaling to accommodate 8 categories gracefully */
        ${
          isActive
            ? "h-[220px] sm:h-[260px] md:h-[500px] w-full md:w-[350px] lg:w-[500px] flex-grow"
            : "h-[55px] sm:h-[60px] md:h-[500px] w-full md:w-[50px] lg:w-[70px] flex-shrink-0"
        }
        border border-transparent hover:border-[#C5A059]/50
      `}
      onMouseEnter={onMouseEnter}
      onClick={handleInteraction}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className={`object-cover transition-transform duration-1000 ${
            isActive ? "scale-100" : "scale-150 grayscale opacity-50"
          }`}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#0A2540] mix-blend-multiply opacity-40" />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#0A2540] to-transparent transition-opacity duration-500 ${
          isActive ? "opacity-90 md:opacity-80" : "opacity-60 md:opacity-40"
        }`}
      />

      {/* Title (Inactive State) */}
      <div
        className={`absolute inset-0 flex items-center justify-center md:justify-center transition-opacity duration-300 ${
          isActive ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="text-white/80 font-mono text-xs uppercase tracking-widest md:-rotate-90 whitespace-nowrap">
          {title}
        </span>
      </div>

      {/* Content (Active State) */}
      <div
        className={`absolute bottom-0 left-0 w-full p-5 sm:p-6 md:p-10 lg:p-12 transition-all duration-500 transform ${
          isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <p className="text-[#C5A059] font-mono text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">
          Collection
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase leading-none tracking-tighter">
          {title}
        </h3>
        {/* Mobile Fix: Ensure the "View Episodes" call to action is visible on small screens */}
        <div className="mt-2 sm:mt-3 md:mt-6 flex items-center gap-2 text-white text-[10px] sm:text-xs md:text-sm font-bold opacity-100 transition-opacity">
          <span>Tap to View Episodes</span>
          <span className="text-[#C5A059] text-base md:text-xl">&rarr;</span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Episodes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  // --- 1. WHEEL TO HORIZONTAL SCROLL ---
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      if (activeCategory) {
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 3,
          behavior: "auto",
        });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [activeCategory]);

  // --- 2. DATA PREP ---
  const categoryData = useMemo(() => {
    return CATEGORIES.map((cat, index) => {
      const episode = episodesList.find((ep) =>
        cat === "All" ? true : ep.category === cat,
      );
      const image = episode
        ? episode.image
        : "https://placehold.co/600x400/0A2540/FFF";

      return {
        id: `cat-${index}`,
        title: cat,
        imageUrl: image,
      };
    });
  }, []);

  const filteredEpisodes = useMemo(() => {
    if (!activeCategory) return [];
    if (activeCategory === "All") return episodesList;
    return episodesList.filter((ep) => ep.category === activeCategory);
  }, [activeCategory]);

  // --- 3. GSAP ANIMATIONS ---
  useGSAP(
    () => {
      if (!activeCategory) {
        gsap.fromTo(
          ".accordion-container",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        );
      } else {
        gsap.fromTo(
          ".episode-card",
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
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
      className="min-h-screen w-full bg-white relative z-30 py-12 md:py-20 flex flex-col justify-center overflow-hidden"
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

      {/* --- VIEW 1: INTERACTIVE ACCORDION (GENRES) --- */}
      {!activeCategory && (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-[#C5A059] font-mono text-[10px] md:text-sm uppercase tracking-[0.2em] mb-2 md:mb-3 font-bold">
              The Archive
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-7xl font-black text-[#0A2540] uppercase tracking-tighter leading-none">
              Browse Collections
            </h3>
            <p className="mt-3 md:mt-4 text-[#0A2540]/60 text-xs sm:text-sm md:text-base max-w-md mx-auto px-4">
              Select a category to view all related episodes.
            </p>
          </div>

          {/* THE ACCORDION CONTAINER */}
          <div className="accordion-container w-full flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-4 md:h-[500px]">
            {categoryData.map((item, index) => (
              <AccordionItem
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                isActive={index === hoveredIndex}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => setActiveCategory(item.title)}
              />
            ))}
          </div>
        </div>
      )}

      {/* --- VIEW 2: HORIZONTAL EPISODES --- */}
      {activeCategory && (
        <div
          key="episode-view"
          className="w-full flex flex-col animate-in fade-in duration-500"
        >
          {/* Header */}
          <div className="px-4 md:px-20 mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="relative z-50 text-[#0A2540] font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-2 mb-3 md:mb-4 hover:text-[#C5A059] transition-colors bg-transparent border-none cursor-pointer"
              >
                &larr; Back to Gallery
              </button>
              <h2 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black text-[#0A2540] uppercase leading-none tracking-tighter">
                {activeCategory}
              </h2>
            </div>
            <div className="text-[#0A2540]/40 font-mono text-[10px] uppercase tracking-widest hidden md:block">
              Use Mouse Wheel to Scroll &rarr;
            </div>
            {/* Mobile-only scroll hint */}
            <div className="text-[#0A2540]/50 font-mono text-[10px] uppercase tracking-widest block md:hidden">
              Swipe to Scroll &rarr;
            </div>
          </div>

          {/* Horizontal Scroll Area */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto hide-scrollbar cursor-grab active:cursor-grabbing px-4 md:px-20 py-4 md:py-6"
          >
            <div className="flex gap-4 md:gap-8 w-max">
              {filteredEpisodes.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => handleEpisodeClick(ep.yt_url)}
                  className="episode-card group relative h-[380px] md:h-[500px] w-[280px] sm:w-[350px] md:w-[450px] flex-shrink-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#0A2540] shadow-2xl transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-4 cursor-pointer"
                >
                  <Image
                    src={ep.image}
                    alt={ep.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent opacity-90" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#C5A059] rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                      <div className="w-0 h-0 border-t-[8px] md:border-t-[10px] border-t-transparent border-l-[14px] md:border-l-[18px] border-l-white border-b-[8px] md:border-b-[10px] border-b-transparent ml-2"></div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 p-6 md:p-10 w-full translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between mb-3 md:mb-4">
                      <span className="bg-[#C5A059] text-[#0A2540] text-[9px] md:text-[10px] font-black px-3 py-1 rounded-full uppercase">
                        {ep.duration}
                      </span>
                      <span className="text-white/60 text-[9px] md:text-[10px] font-bold font-mono">
                        {ep.date}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight uppercase line-clamp-3">
                      {ep.title}
                    </h3>
                  </div>
                </div>
              ))}
              {/* Spacer for right padding in horizontal scroll */}
              <div className="w-8 md:w-40 flex-shrink-0" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
