"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({
  isOpen,
  onClose,
}: SubscribeModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!overlayRef.current || !modalRef.current) return;

    // Create the timeline once, paused at the start
    tl.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto", // Enable clicks when open
        duration: 0.3,
        ease: "power2.inOut",
      })
      .fromTo(
        modalRef.current,
        { scale: 0.9, y: 20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
        "<", // Start at same time as overlay
      );
  }, []);

  // Watch for the 'isOpen' prop change to Play or Reverse
  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0A2540]/60 backdrop-blur-sm opacity-0 pointer-events-none px-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden opacity-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#0A2540]/40 hover:text-[#0A2540] transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* CONTENT */}
        <div className="text-center mb-8">
          <h3 className="text-[#0A2540] text-3xl font-black uppercase tracking-tight mb-2">
            Daily Insights
          </h3>
          <p className="text-[#0A2540]/60 text-sm font-medium">
            Get the best of Raipur Podcast delivered directly to your inbox.
          </p>
        </div>

        {/* FORM */}
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-[#0A2540] placeholder-[#0A2540]/30 outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#C5A059] text-[#0A2540] font-black uppercase tracking-widest py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            Subscribe
          </button>
        </form>

        {/* HELPER TEXT */}
        <p className="mt-6 text-center text-[10px] text-[#0A2540]/30 uppercase tracking-widest font-bold flex items-center justify-center gap-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          No spam, we promise.
        </p>
      </div>
    </div>
  );
}
