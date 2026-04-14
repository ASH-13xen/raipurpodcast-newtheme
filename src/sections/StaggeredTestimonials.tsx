"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Mic, Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { reviewsList, Review } from "@/data/testimonials";

// --- Utility Helper ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedReview extends Review {
  tempId: number;
}

// --- Sub-Component: Card ---
interface TestimonialCardProps {
  position: number;
  review: AnimatedReview;
  handleMove: (steps: number) => void;
  cardSize: number;
  isMobile: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  review,
  handleMove,
  cardSize,
  isMobile,
}) => {
  const isCenter = position === 0;

  // Mobile adjustments: Show fewer cards, stack them closer, scale them down more
  const visibleRange = isMobile ? 1 : 2;
  const isVisible = Math.abs(position) <= visibleRange;
  const xOffset = isMobile ? cardSize / 2.5 : cardSize / 1.5;
  const scaleOffset = isCenter ? 1 : isMobile ? 0.85 : 0.9;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-6 sm:p-8 transition-all duration-500 ease-in-out flex flex-col justify-between backdrop-blur-md rounded-2xl",
        isCenter
          ? "bg-white text-[#0A2540] shadow-[0_0_50px_rgba(197,160,89,0.2)] border-2 border-[#C5A059]"
          : "bg-[#06182a]/90 text-slate-400 border border-white/10 hover:border-[#C5A059]/30 shadow-xl",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${xOffset * position}px)
          translateY(${isCenter ? -20 : position % 2 ? 30 : -30}px)
          rotate(${isCenter ? 0 : position % 2 ? 4 : -4}deg)
          scale(${scaleOffset})
        `,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none", // Prevents invisible cards from blocking clicks
        zIndex: isCenter ? 50 : 20 - Math.abs(position), // Correct overlapping
      }}
    >
      {/* Header: Image & Quote Icon */}
      <div className="relative z-10 flex items-start justify-between">
        <img
          src={review.image}
          alt={review.name}
          className={cn(
            "h-12 w-12 sm:h-14 sm:w-14 object-cover object-top rounded-full border-2",
            isCenter ? "border-[#C5A059]" : "border-white/10 opacity-70",
          )}
        />
        <Quote
          className={cn(
            "w-6 h-6 sm:w-8 sm:h-8",
            isCenter ? "text-[#C5A059]/20" : "text-white/10",
          )}
        />
      </div>

      {/* Body: Testimonial Text */}
      <div className="relative z-10 mt-4">
        <div className="flex gap-1 mb-2 sm:mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3 h-3 fill-current",
                isCenter ? "text-[#C5A059]" : "text-slate-700",
              )}
            />
          ))}
        </div>
        <h3
          className={cn(
            "text-base sm:text-lg font-medium leading-snug line-clamp-4",
            isCenter ? "text-[#0A2540]" : "text-slate-300",
          )}
        >
          &quot;{review.quote}&quot;
        </h3>
      </div>

      {/* Footer: Author Info */}
      <div
        className={cn(
          "relative z-10 mt-auto pt-4 border-t",
          isCenter ? "border-[#0A2540]/10" : "border-white/10",
        )}
      >
        <p
          className={cn(
            "text-xs sm:text-sm font-bold uppercase tracking-wider truncate",
            isCenter ? "text-[#0A2540]" : "text-slate-400",
          )}
        >
          {review.name}
        </p>
        <p
          className={cn(
            "text-[10px] sm:text-xs font-medium mt-1 font-mono truncate",
            isCenter ? "text-[#C5A059]" : "text-slate-500",
          )}
        >
          {review.role}
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---
const Testimonials = () => {
  const [cardSize, setCardSize] = useState(320);
  const [isMobile, setIsMobile] = useState(false);

  const [testimonialsList, setTestimonialsList] = useState<AnimatedReview[]>(
    reviewsList.map((review, index) => ({ ...review, tempId: index })),
  );

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setCardSize(mobile ? 280 : 360);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0A2540] py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-12 sm:mb-16 text-center relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06182a] border border-[#C5A059]/30 text-[#C5A059] text-sm font-medium mb-4">
          <Mic className="w-3 h-3" />
          <span>Community Love</span>
        </div>
        <h2 className="text-4xl font-black text-white sm:text-6xl tracking-tight uppercase leading-none">
          What the City is Saying
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
          From students in dorm rooms to CEOs in boardrooms, Raipur is tuning
          in.
        </p>
      </div>

      <div
        className="relative w-full max-w-7xl overflow-hidden"
        style={{ height: isMobile ? 400 : 500 }}
      >
        {testimonialsList.map((review, index) => {
          // Fixed Centering Math for flawless rendering regardless of odd/even list length
          const position = index - Math.floor(testimonialsList.length / 2);

          return (
            <TestimonialCard
              key={review.tempId}
              review={review}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
              isMobile={isMobile}
            />
          );
        })}

        {/* Navigation Buttons */}
        <div className="absolute bottom-2 sm:bottom-6 left-1/2 flex -translate-x-1/2 gap-4 z-50">
          <button
            onClick={() => handleMove(-1)}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 shadow-lg transition-all hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#0A2540] active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleMove(1)}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 shadow-lg transition-all hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-[#0A2540] active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
