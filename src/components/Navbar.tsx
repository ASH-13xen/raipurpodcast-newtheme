"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SubscribeModal from "./SubscribeModal";

const NAV_LINKS = [
  { name: "Team", href: "#team" },
  { name: "Episodes", href: "#episodes" },
  { name: "Guests", href: "#guests" },
  { name: "Insights", href: "#insights" },
  { name: "Contact", href: "#contact" },
  { name: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // New scope ref

  useGSAP(
    () => {
      if (isMenuOpen) {
        // Open Animation
        gsap.to(menuRef.current, {
          clipPath: "circle(150% at 100% 0%)",
          duration: 0.8,
          ease: "power4.inOut",
          pointerEvents: "all",
        });

        // Use fromTo to ensure it always resets correctly
        gsap.fromTo(
          ".mobile-link",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            delay: 0.2,
            duration: 0.5,
            ease: "power2.out",
          },
        );
      } else {
        // Close Animation
        gsap.to(menuRef.current, {
          clipPath: "circle(0% at 100% 0%)",
          duration: 0.6,
          ease: "power4.inOut",
          pointerEvents: "none",
        });
      }
    },
    { scope: containerRef, dependencies: [isMenuOpen] }, // Scoped to this component
  );

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef}>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-4 flex justify-between items-center transition-all duration-300 bg-[#F5EBEB]/80 backdrop-blur-md border-b border-[#867070]/10">
        {/* LOGO - Changes color based on menu state */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`font-black text-xl tracking-tighter z-[110] transition-colors duration-500 ${
            isMenuOpen ? "text-[#F5EBEB]" : "text-[#867070]"
          }`}
        >
          RAIPUR PODCAST
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-[#867070] text-xs font-bold uppercase tracking-widest hover:text-[#6d5a5a] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#867070] transition-all group-hover:w-full"></span>
            </a>
          ))}

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#867070] text-[#F5EBEB] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Subscribe
          </button>
        </div>

        {/* MOBILE BURGER - Changes color based on menu state */}
        <button
          className={`md:hidden z-[110] focus:outline-none transition-colors duration-500 ${
            isMenuOpen ? "text-[#F5EBEB]" : "text-[#867070]"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`w-8 h-1 bg-current mb-1.5 transition-all ${
              isMenuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          ></div>
          <div
            className={`w-8 h-1 bg-current mb-1.5 transition-all ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-8 h-1 bg-current transition-all ${
              isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          ></div>
        </button>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#867070] z-[105] flex flex-col items-center justify-center pointer-events-none [clip-path:circle(0%_at_100%_0%)]"
      >
        <div className="flex flex-col gap-6 md:gap-8 text-center px-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="mobile-link text-[#F5EBEB] text-3xl md:text-4xl font-black uppercase tracking-tighter hover:opacity-70 transition-opacity"
            >
              {link.name}
            </a>
          ))}
          <div className="mobile-link mt-8">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="bg-[#F5EBEB] text-[#867070] px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
