"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SubscribeModal from "./SubscribeModal"; // <--- Import Modal

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
  const [isModalOpen, setIsModalOpen] = useState(false); // <--- Modal State
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
        pointerEvents: "all",
      });
      gsap.from(".mobile-link", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        delay: 0.2,
        duration: 0.5,
      });
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
        pointerEvents: "none",
      });
    }
  }, [isMenuOpen]);

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
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-4 flex justify-between items-center transition-all duration-300 bg-[#F5EBEB]/80 backdrop-blur-md border-b border-[#867070]/10">
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[#867070] font-black text-xl tracking-tighter z-[110]"
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

          {/* DESKTOP SUBSCRIBE BUTTON */}
          <button
            onClick={() => setIsModalOpen(true)} // <--- Open Modal
            className="bg-[#867070] text-[#F5EBEB] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Subscribe
          </button>
        </div>

        {/* MOBILE BURGER */}
        <button
          className="md:hidden z-[110] text-[#867070] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`w-8 h-1 bg-[#867070] mb-1.5 transition-all ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
          ></div>
          <div
            className={`w-8 h-1 bg-[#867070] mb-1.5 transition-all ${isMenuOpen ? "opacity-0" : ""}`}
          ></div>
          <div
            className={`w-8 h-1 bg-[#867070] transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
          ></div>
        </button>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#867070] z-[105] flex flex-col items-center justify-center pointer-events-none [clip-path:circle(0%_at_100%_0%)]"
      >
        <div className="flex flex-col gap-8 text-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="mobile-link text-[#F5EBEB] text-4xl font-black uppercase tracking-tighter hover:opacity-70 transition-opacity"
            >
              {link.name}
            </a>
          ))}
          <div className="mobile-link mt-8">
            {/* MOBILE SUBSCRIBE BUTTON */}
            <button
              onClick={() => {
                setIsMenuOpen(false); // Close menu
                setIsModalOpen(true); // Open modal
              }}
              className="bg-[#F5EBEB] text-[#867070] px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

      {/* RENDER THE MODAL COMPONENT */}
      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
