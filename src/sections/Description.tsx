/* eslint-disable react-hooks/refs */
"use client";

import React, { forwardRef } from "react";

// UPDATED: Use a callback function type instead of RefObject
interface DescriptionProps {
  setCircleRef: (el: HTMLDivElement | null) => void;
}

const Description = forwardRef<HTMLDivElement, DescriptionProps>(
  (props, ref) => {
    return (
      <section
        ref={ref}
        className="relative min-h-screen w-full bg-[#E4D0D0] flex items-center justify-center overflow-hidden py-20"
      >
        {/* Custom CSS for the Heartbeat Animation */}
        <style jsx global>{`
          @keyframes heartbeat {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-heartbeat {
            animation: heartbeat 3s infinite ease-in-out;
          }
        `}</style>

        <div className="absolute top-10 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
          <h1 className="text-[20vw] font-black text-[#867070] whitespace-nowrap leading-none">
            CULTURE • MUSIC • ART •
          </h1>
        </div>

        <div className="container mx-auto px-4 h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* 1. STABLE WRAPPER (Logic Target) */}
            {/* We attach the ref here so the coordinates are always stable for the logo to land */}
            <div
              ref={props.setCircleRef}
              className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center relative"
            >
              {/* 2. VISUAL CIRCLE (Animated) */}
              {/* This is the border that actually beats */}
              <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#867070]/30 animate-heartbeat"></div>

              {/* 3. INNER GLOW (Pulsing) */}
              {/* Added a secondary ping effect for more "activity" */}
              <div className="absolute inset-0 rounded-full bg-[#F5EBEB]/20 blur-3xl animate-pulse"></div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10 pl-0 lg:pl-10">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="h-[2px] w-12 bg-[#867070]"></span>
                <span className="text-[#867070] font-bold tracking-[0.2em] uppercase text-sm">
                  Since 2024
                </span>
              </div>

              <h2 className="text-6xl md:text-8xl font-black text-[#867070] leading-[0.9]">
                THE VOICE <br />
                <span className="text-[#F5EBEB] drop-shadow-sm italic">
                  OF RAIPUR
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <p className="text-xl md:text-2xl text-[#867070] font-medium leading-relaxed max-w-lg">
                We document the <strong>soul of the city</strong>. From the
                chaotic charm of Jaistambh Chowk to the silence of Naya Raipur
                evenings.
              </p>

              <div className="bg-[#F5EBEB]/40 backdrop-blur-md p-6 rounded-2xl border border-[#F5EBEB]/50 shadow-xl max-w-xs transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <h4 className="text-[#867070] font-black text-4xl mb-1">
                  12K+
                </h4>
                <p className="text-[#867070] text-sm font-medium uppercase tracking-wider mb-4">
                  Monthly Listeners
                </p>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-[#D5B4B4] border-2 border-[#E4D0D0]"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#867070]/20 pt-8 mt-4">
              <h3 className="text-[#867070] font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#867070] animate-pulse"></span>
                LATEST DROPS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group bg-[#F5EBEB] p-5 rounded-xl hover:bg-[#867070] transition-colors duration-300 cursor-pointer">
                  <span className="text-xs font-bold text-[#D5B4B4] mb-1 block">
                    EPISODE 42
                  </span>
                  <h4 className="text-lg font-black text-[#867070] group-hover:text-[#F5EBEB]">
                    The Street Food Kings
                  </h4>
                </div>
                <div className="group bg-[#F5EBEB] p-5 rounded-xl hover:bg-[#867070] transition-colors duration-300 cursor-pointer">
                  <span className="text-xs font-bold text-[#D5B4B4] mb-1 block">
                    EPISODE 43
                  </span>
                  <h4 className="text-lg font-black text-[#867070] group-hover:text-[#F5EBEB]">
                    Startup Ecosystem
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  },
);

Description.displayName = "Description";
export default Description;
