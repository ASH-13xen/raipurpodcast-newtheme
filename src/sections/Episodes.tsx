/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { episodesList, CATEGORIES } from "@/data/episodelist"; // Import data

gsap.registerPlugin(ScrollTrigger);

export default function Episodes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // --- FILTERING ---
  const filteredEpisodes = useMemo(() => {
    return episodesList.filter((ep) => {
      const matchesCategory =
        activeCategory === "All" || ep.category === activeCategory;
      const matchesSearch = ep.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // --- ANIMATIONS ---
  useGSAP(
    () => {
      gsap.from(".ep-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: containerRef },
  );

  // Animate grid items when filter changes
  useEffect(() => {
    if (!cardsRef.current) return;

    gsap.fromTo(
      cardsRef.current.children,
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
        stagger: 0.05,
        clearProps: "all",
      },
    );
  }, [filteredEpisodes]);

  // HELPER: Handle YouTube Redirect
  const handleEpisodeClick = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <section
      ref={containerRef}
      // UPDATED: Background White to contrast with previous Navy section
      className="h-screen w-full bg-white pt-16 md:pt-20 pb-0 px-4 md:px-20 relative z-30 flex flex-col"
    >
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #0a2540; /* Navy Thumb */
          border-radius: 20px;
          border: 2px solid white;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #c5a059; /* Gold Hover */
        }
      `}</style>

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-10 gap-6 md:gap-8 flex-shrink-0">
        <div className="ep-header">
          {/* UPDATED: Gold Accent Text */}
          <p className="text-[#C5A059] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 font-bold">
            Archive
          </p>
          {/* UPDATED: Navy Title */}
          <h2 className="text-5xl md:text-8xl font-black text-[#0A2540] leading-none">
            EPISODES
          </h2>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col items-start md:items-end gap-3 md:gap-4 w-full md:w-auto ep-header">
          {/* SEARCH BAR */}
          <div
            className={`relative flex items-center transition-all duration-300 w-full md:w-auto`}
          >
            <div
              className={`relative flex items-center transition-all duration-300 ${
                isSearching ? "w-full md:w-[300px]" : "w-[44px] md:w-[50px]"
              }`}
            >
              <button
                onClick={() => setIsSearching(!isSearching)}
                // UPDATED: Navy Button
                className="absolute right-0 top-0 h-11 w-11 md:h-12 md:w-12 bg-[#0A2540] rounded-full flex items-center justify-center z-10 hover:bg-[#0f345a] transition-colors shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#C5A059" // Gold Icon
                  className="w-4 h-4 md:w-5 md:h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // UPDATED: Light Gray input with Navy text
                className={`h-11 md:h-12 bg-slate-100 text-[#0A2540] placeholder-[#0A2540]/50 rounded-full px-5 md:px-6 outline-none font-medium text-sm md:text-base transition-all duration-300 border border-[#0A2540]/10 ${
                  isSearching
                    ? "w-full opacity-100 pr-12 md:pr-14"
                    : "w-0 opacity-0 px-0"
                }`}
              />
            </div>
          </div>

          {/* CATEGORY TABS */}
          <div className="w-full overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
            <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-end gap-2 min-w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  // UPDATED: Navy/Gold Toggle Logic
                  className={`px-3 py-1.5 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-[#0A2540] text-[#C5A059] border-[#0A2540]"
                      : "bg-transparent text-[#0A2540] border-[#0A2540]/30 hover:border-[#0A2540] hover:text-[#0A2540]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- SCROLL AREA CONTAINER --- */}
      <div className="flex-grow w-full overflow-y-auto custom-scroll pr-2 md:pr-4 pb-20">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 w-full"
        >
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((ep) => (
              <div
                key={ep.id}
                onClick={() => handleEpisodeClick(ep.yt_url)}
                // UPDATED: Navy Card Background
                className="group relative h-[300px] md:h-[400px] w-full cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-[#0A2540] shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={ep.image}
                  alt={ep.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                {/* UPDATED: Gradient fading into Navy */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/40 to-transparent opacity-90 transition-opacity duration-300"></div>

                {/* VISUAL PLAY BUTTON */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#C5A059]/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 border border-white/20 shadow-lg">
                  {/* Play Triangle - White */}
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-1 md:mb-2">
                    {/* UPDATED: Gold Badge with Navy Text */}
                    <span className="bg-[#C5A059] text-[#0A2540] text-[8px] md:text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {ep.category}
                    </span>
                    {/* UPDATED: Gold Text */}
                    <span className="text-[#C5A059] text-[10px] md:text-xs font-mono">
                      {ep.duration}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-3xl font-black text-white leading-tight mb-1 md:mb-2">
                    {ep.title}
                  </h3>

                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      {ep.date}
                    </span>
                    {/* UPDATED: White Circle with Navy Arrow */}
                    <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-white flex items-center justify-center hover:bg-[#C5A059] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3 h-3 md:w-4 md:h-4 text-[#0A2540]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full h-[200px] md:h-[300px] flex flex-col items-center justify-center text-[#0A2540]/50">
              <p className="text-4xl md:text-6xl mb-2 md:mb-4">☹</p>
              <p className="font-mono uppercase tracking-widest text-sm md:text-base">
                No episodes found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
