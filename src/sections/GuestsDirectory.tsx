/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { guestList, Guest } from "@/data/guestlist";

// --- UTILITY: Convert standard YouTube URL to Embed URL ---
const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;
  // Regex to extract the video ID from standard or short YouTube URLs
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?]*)/,
  );
  // Returns embed link with autoplay enabled. Returns null if it's just a channel link.
  return match && match[1] && match[1].length === 11
    ? `https://www.youtube.com/embed/${match[1]}?autoplay=1`
    : null;
};

export default function GuestsDirectory() {
  const [activeGuest, setActiveGuest] = useState<Guest | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null); // Ref updated to target the whole card

  // --- MOBILE SEARCH & PAGINATION STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  // --- DYNAMIC ROW-WISE DISTRIBUTION (Desktop) ---
  const columns = useMemo(() => {
    return {
      col1: guestList.filter((_, i) => i % 4 === 0),
      col2: guestList.filter((_, i) => i % 4 === 1),
      col3: guestList.filter((_, i) => i % 4 === 2),
      col4: guestList.filter((_, i) => i % 4 === 3),
    };
  }, []);

  // --- MOBILE LIST COMPUTATIONS ---
  const filteredMobileGuests = useMemo(() => {
    return guestList.filter(
      (g) =>
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredMobileGuests.length / itemsPerPage);

  const visibleMobileGuests = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredMobileGuests.slice(start, start + itemsPerPage);
  }, [filteredMobileGuests, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  // --- ANIMATION (Desktop) ---
  useGSAP(() => {
    if (activeGuest && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(1.5)",
          overwrite: "auto",
        },
      );
    }
  }, [activeGuest]);

  // HELPER: Open YouTube Link (Used as a fallback if URL is a channel link)
  const handleFallbackClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    if (url) window.open(url, "_blank");
  };

  // REUSABLE ITEM (Left Aligned)
  const GuestItemLeft = ({ guest }: { guest: Guest }) => (
    <div
      onMouseEnter={() => setActiveGuest(guest)}
      className="relative flex flex-col py-2 border-b border-white/10 transition-all duration-300 cursor-pointer hover:bg-[#C5A059]/10 hover:pl-2 group"
    >
      <span className="text-xs md:text-sm font-bold uppercase truncate text-white group-hover:text-[#C5A059] transition-colors">
        {guest.name}
      </span>
      <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider group-hover:text-white transition-colors">
        {guest.role}
      </span>
    </div>
  );

  // REUSABLE ITEM (Right Aligned)
  const GuestItemRight = ({ guest }: { guest: Guest }) => (
    <div
      onMouseEnter={() => setActiveGuest(guest)}
      className="relative flex flex-col items-end py-2 border-b border-white/10 transition-all duration-300 cursor-pointer hover:bg-[#C5A059]/10 hover:pr-2 group text-right"
    >
      <span className="text-xs md:text-sm font-bold uppercase truncate text-white group-hover:text-[#C5A059] transition-colors">
        {guest.name}
      </span>
      <span className="text-[9px] font-mono text-white/50 uppercase tracking-wider group-hover:text-white transition-colors">
        {guest.role}
      </span>
    </div>
  );

  const embedUrl = activeGuest ? getYouTubeEmbedUrl(activeGuest.yt_url) : null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0A2540] text-white py-20 px-4 md:px-10 z-20 mt-20 md:mt-32"
      onMouseLeave={() => setActiveGuest(null)}
    >
      {/* HEADER */}
      <div className="mb-8 md:mb-12 border-b border-white/20 pb-8 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">
            Guest Archive
          </h2>
          <p className="text-[#C5A059] font-mono text-xs uppercase tracking-widest mt-2">
            {guestList.length} Episodes • Sorted Alphabetically
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-4xl font-black opacity-30 text-[#C5A059]">
            {guestList.length}
          </p>
          <p className="text-xs uppercase tracking-widest opacity-50">Voices</p>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:grid grid-cols-12 gap-4 relative">
        <div className="col-span-2 space-y-1">
          {columns.col1.map((guest) => (
            <GuestItemLeft key={guest.id} guest={guest} />
          ))}
        </div>
        <div className="col-span-2 space-y-1">
          {columns.col2.map((guest) => (
            <GuestItemLeft key={guest.id} guest={guest} />
          ))}
        </div>

        {/* CENTER COLUMN (Video Player) */}
        <div className="col-span-4 h-[80vh] sticky top-24 flex items-center justify-center pointer-events-none px-2">
          {activeGuest ? (
            <div
              ref={cardRef}
              // Changed from aspect-[3/4] to aspect-video to fit YouTube's 16:9 ratio naturally
              className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border-[4px] border-[#C5A059] shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto group"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveGuest(null);
                }}
                className="absolute top-[-15px] right-[-15px] z-50 w-8 h-8 rounded-full bg-[#C5A059] text-white flex items-center justify-center hover:bg-white hover:text-[#0A2540] transition-all shadow-lg opacity-0 group-hover:opacity-100 group-hover:top-3 group-hover:right-3"
                title="Close"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={activeGuest.name}
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                // Fallback Layout if URL is invalid or just a channel link
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={(e) => handleFallbackClick(e, activeGuest.yt_url)}
                >
                  <Image
                    src={activeGuest.imgUrl}
                    alt={activeGuest.name}
                    fill
                    className="object-cover opacity-60 hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-[#C5A059] text-[#0A2540] font-black text-xs px-4 py-2 rounded-full shadow-lg">
                      Visit Channel
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center opacity-20 text-[#C5A059]">
              <div className="w-16 h-16 rounded-full border-4 border-dashed border-[#C5A059] animate-spin-slow mb-4"></div>
              <p className="font-mono text-xs tracking-widest uppercase text-white">
                Hover a Name
              </p>
            </div>
          )}
        </div>

        <div className="col-span-2 space-y-1">
          {columns.col3.map((guest) => (
            <GuestItemRight key={guest.id} guest={guest} />
          ))}
        </div>
        <div className="col-span-2 space-y-1">
          {columns.col4.map((guest) => (
            <GuestItemRight key={guest.id} guest={guest} />
          ))}
        </div>
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search guests by name"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-white/5 border border-white/20 rounded-full py-3 px-5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C5A059] focus:bg-white/10 transition-all"
          />
        </div>

        {/* Paginated List */}
        <div className="grid grid-cols-1 gap-1 min-h-[450px]">
          {visibleMobileGuests.length > 0 ? (
            visibleMobileGuests.map((guest) => (
              <div
                key={guest.id}
                onClick={() => setActiveGuest(guest)}
                className="flex items-baseline justify-between py-3 px-2 border-b border-white/10 active:bg-[#C5A059]/20 transition-colors rounded-sm cursor-pointer"
              >
                <span className="text-sm font-bold uppercase truncate pr-4 text-white">
                  {guest.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider whitespace-nowrap">
                    {guest.role}
                  </span>
                  <span className="text-white/30 text-xs">{">"}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full text-white/40 text-sm font-mono uppercase tracking-widest">
              No results found
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-5 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider disabled:opacity-20 hover:bg-[#C5A059] hover:text-[#0A2540] hover:border-[#C5A059] transition-all"
            >
              Prev
            </button>
            <span className="text-xs font-mono text-[#C5A059] tracking-widest">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={currentPage === totalPages - 1}
              className="px-5 py-2 rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider disabled:opacity-20 hover:bg-[#C5A059] hover:text-[#0A2540] hover:border-[#C5A059] transition-all"
            >
              Next
            </button>
          </div>
        )}

        {/* Mobile Detail Modal (Embedded Video) */}
        {activeGuest && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActiveGuest(null)}
          >
            <div
              className="relative w-full max-w-lg aspect-video bg-black rounded-xl overflow-hidden border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.3)] pointer-events-auto"
              onClick={(e) => e.stopPropagation()} // Prevents tapping the video from closing the modal
            >
              <button
                onClick={() => setActiveGuest(null)}
                className="absolute -top-3 -right-3 z-50 bg-white text-[#0A2540] w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={activeGuest.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer bg-[#0A2540]"
                  onClick={(e) => handleFallbackClick(e, activeGuest.yt_url)}
                >
                  <Image
                    src={activeGuest.imgUrl}
                    alt={activeGuest.name}
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-black text-white uppercase leading-none mb-2">
                      {activeGuest.name}
                    </h3>
                    <span className="bg-[#C5A059] text-[#0A2540] font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-wider">
                      Visit Channel to Watch
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
