"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Description from "@/sections/Description";
import Team from "@/sections/Team";
import Episodes from "@/sections/Episodes";
import GuestsDirectory from "@/sections/GuestsDirectory";
import InsightsArchive from "@/sections/InsightsArchive";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Entrance Animation
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
          delay: 0.2, // Reduced delay for snappier load
        },
      );

      // 2. DOCKING (Adjusted Timing)
      const moveTl = gsap.timeline({
        scrollTrigger: {
          trigger: descRef.current,
          start: "top bottom",
          // UPDATED: "center 55%" means it finishes slightly BEFORE the section hits dead center
          end: "75% 75%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      moveTl.to(logoRef.current, {
        x: () => {
          if (!circleRef.current) return 0;
          const circleRect = circleRef.current.getBoundingClientRect();
          const circleCenterX = circleRect.left + circleRect.width / 2;
          const windowCenterX = window.innerWidth / 2;
          return circleCenterX - windowCenterX;
        },
        y: () => {
          if (!circleRef.current || !descRef.current) return 0;
          const circleRect = circleRef.current.getBoundingClientRect();
          const descRect = descRef.current.getBoundingClientRect();
          const circleCenterY = circleRect.top + circleRect.height / 2;
          const descCenterY = descRect.top + descRect.height / 2;
          return circleCenterY - descCenterY;
        },
        width: () =>
          circleRef.current
            ? circleRef.current.getBoundingClientRect().width
            : 450,
        height: () =>
          circleRef.current
            ? circleRef.current.getBoundingClientRect().height
            : 450,
        rotation: 0,
        // UPDATED: "power2.out" feels faster/more responsive than "inOut"
        ease: "power2.out",
      });

      // 3. STICKING (Synced with Docking)
      const stickTl = gsap.timeline({
        scrollTrigger: {
          trigger: descRef.current,
          // UPDATED: Must match the 'end' of the previous trigger
          start: "center 55%",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      stickTl.to(logoRef.current, {
        y: () => {
          if (!descRef.current) return -1000;
          const moveDistance =
            descRef.current.offsetHeight / 2 + window.innerHeight / 2;
          return `-=${moveDistance}`;
        },
        ease: "none",
        immediateRender: false,
      });
    },
    { scope: mainRef },
  );

  return (
    <main ref={mainRef} className="relative bg-[#F5EBEB]">
      {/* 1. NAVBAR (Fixed Top) */}
      <Navbar />

      {/* THE FIXED LOGO */}
      <div
        ref={logoRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none flex items-center justify-center"
        // UPDATED: Responsive dimensions (80vw on mobile, 850px on desktop)
        style={{
          width: "80vw",
          maxWidth: "850px",
          height: "auto",
          aspectRatio: "1/1",
        }}
      >
        <Image
          src="/logo.png"
          alt="Raipur Podcast Logo"
          fill
          className="object-contain drop-shadow-2xl"
          style={{
            filter: "drop-shadow(0 20px 30px rgba(134, 112, 112, 0.25))",
          }}
          priority
        />
      </div>

      <Hero />

      {/* Description Section */}
      <div ref={descRef} className="relative z-40">
        <Description
          ref={descRef}
          setCircleRef={(el) => {
            circleRef.current = el;
          }}
        />
      </div>

      {/* Team Section */}
      <section id="team">
        <Team />
      </section>

      {/* Episodes Section */}
      <section id="episodes">
        <Episodes />
      </section>

      {/* Guests Directory (Dark) */}
      <section id="guests">
        <GuestsDirectory />
      </section>

      {/* Insights Archive (Light) */}
      <section id="insights">
        <InsightsArchive />
      </section>

      <section id="contact">
        <Contact />
      </section>

      {/* Testimonials (Light) */}
      <section id="reviews">
        <Testimonials />
      </section>

      {/* Footer */}
      <div className="h-[30vh] bg-[#F5EBEB] flex items-center justify-center text-[#867070] relative z-30">
        <div className="text-center">
          <h3 className="text-2xl font-black mb-2">RAIPUR PODCAST</h3>
          <p className="font-mono opacity-50 text-sm">
            © 2024. All Rights Reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
