/* eslint-disable react-hooks/refs */
"use client";

import React, { forwardRef } from "react";
import Image from "next/image";
import { latestDrops } from "@/data/latest";

const Description = forwardRef<HTMLDivElement>((props, ref) => {
    const handleRedirect = (url: string) => {
      if (url) window.open(url, "_blank");
    };

    return (
      <section
        ref={ref}
        className="relative min-h-screen w-full bg-white flex items-center justify-center overflow-hidden py-10 md:py-20"
      >
        <style jsx global>{`
          /* --- KEYFRAMES --- */
          @keyframes morph-blob {
            0% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            50% {
              border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            }
            100% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
          }

          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spin-slow-reverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }

          @keyframes core-breath {
            0%,
            100% {
              transform: scale(1);
              box-shadow: 0 0 20px rgba(10, 37, 64, 0.2);
            }
            50% {
              transform: scale(1.02);
              box-shadow: 0 0 40px rgba(197, 160, 89, 0.3);
            }
          }

          /* --- ANIMATION CLASSES (Fixed) --- */
          /* We define standard classes here to ensure they link to keyframes */

          .anim-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .anim-spin-slow-rev {
            animation: spin-slow-reverse 25s linear infinite;
          }
          .anim-spin-slow-fast {
            animation: spin-slow 15s linear infinite;
          }

          .anim-blob-1 {
            animation: morph-blob 10s ease-in-out infinite;
          }
          .anim-blob-2 {
            animation: morph-blob 12s ease-in-out infinite;
          }
          .anim-blob-3 {
            animation: morph-blob 8s ease-in-out infinite;
          }

          .anim-breath {
            animation: core-breath 4s ease-in-out infinite;
          }
        `}</style>

        {/* Background Text */}
        <div className="absolute top-10 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none">
          <h1 className="text-[20vw] font-black text-[#0A2540] whitespace-nowrap leading-none">
            CULTURE • MUSIC • ART •
          </h1>
        </div>

        <div className="container mx-auto px-6 md:px-4 h-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* LEFT COLUMN (The Circle Target) */}
          <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col items-center justify-center relative mt-8 lg:mt-0">
            {/* THE DOCKING CONTAINER (Fixed Size) */}
            <div className="w-[200px] h-[200px] md:w-[450px] md:h-[450px] relative flex items-center justify-center">
              {/* --- LAYER 1: THE FLUID BACKGROUND (Spreads Wide) --- */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                {/* Blob 1: Large Gold (Fills Section) */}
                <div className="absolute w-[300px] h-[300px] md:w-[750px] md:h-[750px] bg-[#C5A059]/10 anim-spin-slow">
                  <div
                    className="w-full h-full anim-blob-1"
                    style={{
                      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                    }}
                  ></div>
                </div>

                {/* Blob 2: Medium Navy (Mid-range) */}
                <div className="absolute w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-[#0A2540]/5 anim-spin-slow-rev">
                  <div
                    className="w-full h-full anim-blob-2"
                    style={{
                      borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
                    }}
                  ></div>
                </div>

                {/* Blob 3: Small Intense Gold (Near Circle) */}
                <div className="absolute w-[220px] h-[220px] md:w-[500px] md:h-[500px] border border-[#C5A059]/30 anim-spin-slow-fast">
                  <div
                    className="w-full h-full anim-blob-3"
                    style={{
                      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                    }}
                  ></div>
                </div>
              </div>

              {/* --- LAYER 2: THE LANDING PAD (Solid Navy Circle) --- */}
              <div className="absolute w-[200px] h-[200px] md:w-[450px] md:h-[450px] rounded-full bg-[#0A2540] shadow-2xl z-20 flex items-center justify-center anim-breath overflow-hidden">
                {/* Logo Image */}
                <div className="relative w-[70%] h-[70%] z-40">
                  <Image
                    src="/logow.png"
                    alt="Raipur Podcast Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {/* INSET Golden Outline */}
                <div className="absolute inset-3 md:inset-6 rounded-full border-[1px] md:border-[2px] border-[#C5A059] pointer-events-none z-30 opacity-60"></div>
                {/* Inner Bevel/Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/30 to-transparent pointer-events-none z-10"></div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Text Content) */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-20 pl-0 lg:pl-10">
            <div className="space-y-2 ">
              <div className="flex items-center gap-4 ">
                <span className="h-[2px] w-8 md:w-12 bg-[#C5A059]"></span>
                <span className="text-[#C5A059] font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
                  Since 2024
                </span>
              </div>

              <h2 className="text-5xl md:text-8xl font-black text-[#0A2540] leading-[0.9]">
                THE VOICE <br />
                <span className="text-[#C5A059] drop-shadow-sm italic">
                  OF RAIPUR
                </span>
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <p className="text-lg md:text-2xl text-[#0A2540]/80 font-medium leading-relaxed max-w-lg">
                We document the{" "}
                <strong className="text-[#0A2540]">soul of the city</strong>.
                From the chaotic charm of Jaistambh Chowk to the silence of Naya
                Raipur evenings.
              </p>

              <div className="bg-[#0A2540] p-6 rounded-2xl border border-[#0A2540]/10 shadow-2xl w-full md:w-auto max-w-xs transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <h4 className="text-white font-black text-4xl mb-1">12K+</h4>
                <p className="text-[#C5A059] text-sm font-medium uppercase tracking-wider mb-4">
                  Monthly Listeners
                </p>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-[#E5E7EB]"
                    >
                      <Image
                        src={`https://images.unsplash.com/photo-${
                          i === 1
                            ? "1534528741775-53994a69daeb"
                            : i === 2
                              ? "1506794778202-cad84cf45f1d"
                              : i === 3
                                ? "1507003211169-0a1dd7228f2d"
                                : "1531746020798-e6953c6e8e04"
                        }?w=100&h=100&fit=crop`}
                        alt={`Listener ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#0A2540]/10 pt-8 mt-4">
              <h3 className="text-[#0A2540] font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
                LATEST DROPS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {latestDrops.map((drop) => (
                  <div
                    key={drop.id}
                    onClick={() => handleRedirect(drop.yt_url)}
                    className="group bg-slate-100 p-5 rounded-xl hover:bg-[#0A2540] transition-colors duration-300 cursor-pointer border border-transparent hover:border-[#C5A059]/30"
                  >
                    <span className="text-xs font-bold text-[#C5A059] mb-1 block group-hover:text-[#C5A059]">
                      {drop.episode}
                    </span>
                    <h4 className="text-lg font-black text-[#0A2540] group-hover:text-white">
                      {drop.title}
                    </h4>
                  </div>
                ))}
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
