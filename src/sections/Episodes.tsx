"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DUMMY DATA (Added more for scrolling demo) ---
const CATEGORIES = ["All", "Culture", "Food", "History", "Art"];

const EPISODES = [
  {
    id: 1,
    title: "The Lost Temples",
    category: "History",
    date: "Oct 12, 2024",
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1564053489984-317bbd824340?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Spices of the Street",
    category: "Food",
    date: "Oct 18, 2024",
    duration: "32 min",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Tribal Art Forms",
    category: "Art",
    date: "Oct 25, 2024",
    duration: "50 min",
    image:
      "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Modern Raipur",
    category: "Culture",
    date: "Nov 02, 2024",
    duration: "28 min",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Lakeside Silence",
    category: "Culture",
    date: "Nov 10, 2024",
    duration: "40 min",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Ancient Architecture",
    category: "History",
    date: "Nov 15, 2024",
    duration: "55 min",
    image:
      "https://images.unsplash.com/photo-1518182170546-0766ce6fec56?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Street Food Part 2",
    category: "Food",
    date: "Nov 20, 2024",
    duration: "35 min",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "The Coffee Culture",
    category: "Food",
    date: "Nov 22, 2024",
    duration: "20 min",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 9,
    title: "Hidden Waterfalls",
    category: "Culture",
    date: "Nov 25, 2024",
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function Episodes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // --- STATE ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // --- FILTERING ---
  const filteredEpisodes = useMemo(() => {
    return EPISODES.filter((ep) => {
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

  return (
    <section
      ref={containerRef}
      className="h-screen w-full bg-[#F5EBEB] pt-20 pb-0 px-6 md:px-20 relative z-30 flex flex-col"
    >
      {/* --- CUSTOM SCROLLBAR CSS --- */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #867070;
          border-radius: 20px;
          border: 2px solid #f5ebeb;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #6d5a5a;
        }
      `}</style>

      {/* --- HEADER SECTION (Fixed at top of section) --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8 flex-shrink-0">
        <div className="ep-header">
          <p className="text-[#D5B4B4] font-mono text-xs uppercase tracking-widest mb-2">
            Archive
          </p>
          <h2 className="text-6xl md:text-8xl font-black text-[#867070] leading-none">
            EPISODES
          </h2>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col items-end gap-4 w-full md:w-auto ep-header">
          {/* SEARCH BAR */}
          <div
            className={`relative flex items-center transition-all duration-300 ${isSearching ? "w-full md:w-[300px]" : "w-[50px] md:w-[50px]"}`}
          >
            <button
              onClick={() => setIsSearching(!isSearching)}
              className="absolute right-0 top-0 h-12 w-12 bg-[#867070] rounded-full flex items-center justify-center z-10 hover:bg-[#725e5e] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#F5EBEB"
                className="w-5 h-5"
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
              placeholder="Search episodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`h-12 bg-[#E4D0D0] text-[#867070] placeholder-[#867070]/50 rounded-full px-6 outline-none font-medium transition-all duration-300 ${isSearching ? "w-full opacity-100 pr-14" : "w-0 opacity-0 px-0"}`}
            />
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap justify-end gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#867070] text-[#F5EBEB] border-[#867070]"
                    : "bg-transparent text-[#867070] border-[#867070]/30 hover:border-[#867070]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- SCROLL AREA CONTAINER --- */}
      {/* flex-grow: takes remaining height
          overflow-y-auto: enables scrolling
          custom-scroll: applies our css styles 
      */}
      <div className="flex-grow w-full overflow-y-auto custom-scroll pr-4 pb-20">
        {/* GRID */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((ep) => (
              <div
                key={ep.id}
                className="group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-2xl bg-[#E4D0D0]"
              >
                <Image
                  src={ep.image}
                  alt={ep.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3b3b]/90 via-transparent to-transparent opacity-90 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="bg-[#F5EBEB] text-[#867070] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {ep.category}
                    </span>
                    <span className="text-[#F5EBEB]/70 text-xs font-mono">
                      {ep.duration}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black text-[#F5EBEB] leading-tight mb-2">
                    {ep.title}
                  </h3>

                  <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="text-[#D5B4B4] text-xs font-bold uppercase tracking-widest">
                      {ep.date}
                    </span>
                    <div className="h-8 w-8 rounded-full bg-[#F5EBEB] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-[#867070]"
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
            <div className="col-span-full h-[300px] flex flex-col items-center justify-center text-[#867070]/50">
              <p className="text-6xl mb-4">☹</p>
              <p className="font-mono uppercase tracking-widest">
                No episodes found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
