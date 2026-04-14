/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";

// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// Sections
import Description from "@/sections/Description";
import Team from "@/sections/Team";
import Episodes from "@/sections/Episode2";
import GuestsDirectory from "@/sections/GuestsDirectory";
import Testimonials from "@/sections/StaggeredTestimonials";
import Contact from "@/sections/Contact";



export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main ref={mainRef} className="relative bg-white">
      <Navbar />

      <Hero />

      {/* Description Section */}
      <div className="relative z-40">
        <Description />
      </div>

      <section id="team">
        <Team />
      </section>

      <section id="episodes">
        <Episodes />
      </section>

      <section id="guests">
        <GuestsDirectory />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <section id="reviews">
        <Testimonials />
      </section>

      <Footer />
    </main>
  );
}
