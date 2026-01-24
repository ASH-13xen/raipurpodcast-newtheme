/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DUMMY DATA ---
const ALL_INSIGHTS = [
  {
    id: 1,
    episode: "EP 042",
    title: "Why did the capital shift from Raipur to Atal Nagar?",
    category: "History",
    date: "Oct 12, 2024",
    readTime: "3 min",
    content:
      "The shift was primarily driven by the need for better urban planning. Raipur's old infrastructure was struggling to keep up with the population boom. Atal Nagar (Nava Raipur) is designed as India's first greenfield smart city, focusing on sustainability and administrative efficiency.",
  },
  {
    id: 2,
    episode: "EP 038",
    title: "The secret recipe behind the famous 'Poha' of Jaistambh Chowk",
    category: "Food",
    date: "Sep 28, 2024",
    readTime: "2 min",
    content:
      "It's all about the 'Jeeravan Masala'. Unlike Indori Poha which is sweet, the Raipur variant relies heavily on a spicy, tangy mix of fennel, coriander, and dried mango powder. Plus, the double-steam method keeps it fluffy.",
  },
  {
    id: 3,
    episode: "EP 045",
    title: "How startups are changing the landscape of Chhattisgarh?",
    category: "Business",
    date: "Nov 02, 2024",
    readTime: "5 min",
    content:
      "With the new incubation center at NIT Raipur and 36Inc, we are seeing a surge in D2C brands. The cost of living advantage allows founders to have a longer runway compared to Bangalore or Delhi.",
  },
  {
    id: 4,
    episode: "EP 012",
    title: "Hidden waterfalls near Raipur you can visit in a day",
    category: "Travel",
    date: "Aug 15, 2024",
    readTime: "4 min",
    content:
      "Apart from Chitrakote, check out Ghatarani and Jatmai. They are best visited during the monsoon (July-Sept). There is also a lesser-known trek near Bernawapara Wildlife Sanctuary that leads to a secluded pool.",
  },
  {
    id: 5,
    episode: "EP 050",
    title: "Understanding the tribal art forms of Bastar",
    category: "Art",
    date: "Dec 10, 2024",
    readTime: "6 min",
    content:
      "Dhokra art isn't just metal casting; it's a 4000-year-old lost-wax tradition. Each piece tells a story of nature, hunting, or village life. The 'Bell Metal' used is an alloy of brass, nickel, and zinc.",
  },
  {
    id: 6,
    episode: "EP 029",
    title: "Is the real estate market in Raipur bubbling?",
    category: "Business",
    date: "July 22, 2024",
    readTime: "3 min",
    content:
      "Experts suggest steady growth rather than a bubble. The demand is end-user driven rather than speculative investor driven. Areas like Saddu and Kachna are seeing the highest appreciation.",
  },
  {
    id: 7,
    episode: "EP 033",
    title: "The legend of Hatkeshwar Mahadev Temple",
    category: "History",
    date: "Aug 05, 2024",
    readTime: "2 min",
    content:
      "Built in 1402 by Haihaya ruler Brahmadeo, this temple on the banks of Kharun river is a prime example of Nagara architectural style. The intricate carvings resemble those of Khajuraho.",
  },
];

export default function InsightsArchive() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter Logic
  const filteredData = useMemo(() => {
    return ALL_INSIGHTS.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Animation for list entrance
  useGSAP(
    () => {
      gsap.from(".archive-row", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  // Handle Accordion Toggle
  const toggleRow = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      ref={containerRef}
      // UPDATED: Adjusted padding for mobile (py-16 px-4) vs desktop
      className="min-h-screen w-full bg-[#F5EBEB] py-16 px-4 md:py-24 md:px-20 relative z-30 flex flex-col"
    >
      {/* --- CUSTOM SCROLLBAR CSS --- */}
      <style jsx global>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #867070;
          border-radius: 20px;
          border: 1px solid #f5ebeb;
        }
      `}</style>

      {/* HEADER & SEARCH */}
      {/* UPDATED: Reduced margins for mobile */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-6 md:gap-8 border-b border-[#867070]/20 pb-6 md:pb-8 flex-shrink-0">
        <div>
          <h2 className="text-[#867070] text-[10px] md:text-xs font-mono uppercase tracking-widest mb-1 md:mb-2">
            Knowledge Base
          </h2>
          {/* UPDATED: Reduced font size for mobile (text-4xl) */}
          <h3 className="text-4xl md:text-7xl font-black text-[#867070] uppercase leading-none">
            Insights
          </h3>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-[400px] relative">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // UPDATED: Smaller input height/padding for mobile
            className="w-full bg-[#E4D0D0] text-[#867070] placeholder-[#867070]/50 rounded-lg px-4 py-3 md:py-4 outline-none font-medium text-sm md:text-base focus:ring-2 focus:ring-[#867070]"
          />
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#867070]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* TABLE HEADER (Desktop Only) */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-4 text-[#D5B4B4] font-mono text-xs uppercase tracking-widest border-b border-[#867070]/20 flex-shrink-0">
        <div className="col-span-1">Ep #</div>
        <div className="col-span-6">Topic / Question</div>
        <div className="col-span-2">Category</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-1 text-right">Read</div>
      </div>

      {/* LIST ITEMS - SCROLL AREA */}
      {/* UPDATED: Added h-[60vh] overflow-y-auto for mobile scrolling.
         On desktop (md:), it reverts to h-auto and visible overflow.
      */}
      <div className="flex-col h-[60vh] md:h-auto overflow-y-auto md:overflow-visible custom-scroll pr-2 md:pr-0">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="archive-row group border-b border-[#867070]/10 hover:bg-[#E4D0D0]/30 transition-colors duration-200 cursor-pointer"
              onClick={() => toggleRow(item.id)}
            >
              {/* MAIN ROW CONTENT */}
              {/* UPDATED: Reduced padding for mobile (px-4 py-4) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-4 md:px-6 md:py-6 items-center">
                {/* Mobile: Category Tag shows first */}
                <div className="md:hidden mb-1 flex justify-between items-center w-full">
                  <span className="bg-[#867070] text-[#F5EBEB] text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="text-[#867070] font-mono text-[10px] opacity-60">
                    {item.episode}
                  </span>
                </div>

                {/* Desktop: Episode # */}
                <div className="hidden md:block col-span-1 text-[#867070] font-mono text-sm opacity-60">
                  {item.episode}
                </div>

                {/* Title */}
                {/* UPDATED: Adjusted text size for mobile */}
                <div className="col-span-6 text-[#867070] font-bold text-base md:text-lg leading-tight group-hover:text-[#6d5a5a]">
                  {item.title}
                </div>

                <div className="hidden md:block col-span-2">
                  <span className="border border-[#867070]/30 text-[#867070] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="hidden md:block col-span-2 text-[#867070] text-sm opacity-60 font-mono">
                  {item.date}
                </div>

                <div className="hidden md:block col-span-1 text-right text-[#867070] text-sm opacity-60 font-mono">
                  {item.readTime}
                </div>

                {/* Mobile: Date & Read Time */}
                <div className="md:hidden flex justify-between mt-2 text-[#867070] text-[10px] opacity-60 font-mono w-full border-t border-[#867070]/10 pt-2">
                  <span>{item.date}</span>
                  <span>{item.readTime} read</span>
                </div>
              </div>

              {/* EXPANDABLE CONTENT (ACCORDION) */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedId === item.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                {/* UPDATED: Reduced padding for mobile accordion content */}
                <div className="px-4 py-6 md:px-[8.33%] md:py-8 bg-[#867070]/5 border-t border-[#867070]/10">
                  <div className="max-w-3xl">
                    <p className="text-[#867070] text-sm md:text-lg leading-relaxed font-serif">
                      {item.content}
                    </p>

                    <div className="mt-4 md:mt-6 flex items-center gap-2 text-[#867070] font-bold text-[10px] md:text-xs uppercase tracking-widest cursor-pointer hover:underline">
                      <span>Listen to full episode</span>
                      <svg
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
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-[#867070]/40 font-mono uppercase tracking-widest text-sm md:text-base">
            No insights found matching "{searchQuery}"
          </div>
        )}
      </div>
    </section>
  );
}
