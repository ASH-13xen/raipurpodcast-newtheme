/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_LINKS = [
  {
    id: 1,
    label: "Email Us",
    value: "hello@raipurpodcast.com",
    href: "mailto:hello@raipurpodcast.com",
    isExternal: false,
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 md:w-8 md:h-8" // UPDATED: Responsive icon size
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
    ),
  },
  {
    id: 2,
    label: "WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
    isExternal: true,
    icon: (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-6 h-6 md:w-8 md:h-8" // UPDATED: Responsive icon size
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    isExternal: false,
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 md:w-8 md:h-8" // UPDATED: Responsive icon size
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    label: "Visit Studio",
    value: "Civil Lines, Raipur, CG",
    // FIXED: Real Google Maps Search Link
    href: "https://www.google.com/maps/search/?api=1&query=Civil+Lines,+Raipur,+Chhattisgarh",
    isExternal: true,
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 md:w-8 md:h-8" // UPDATED: Responsive icon size
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-card",
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      // UPDATED: Adjusted padding for mobile (py-16 px-4) vs desktop
      className="w-full bg-[#867070] text-[#F5EBEB] py-16 px-4 md:py-24 md:px-20 relative z-50"
    >
      {/* HEADER */}
      {/* UPDATED: Reduced margins for mobile */}
      <div className="mb-8 md:mb-16 border-b border-[#F5EBEB]/20 pb-4 md:pb-8">
        <h2 className="text-[#D5B4B4] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">
          Get in Touch
        </h2>
        {/* UPDATED: Adjusted text size for mobile */}
        <h3 className="text-4xl md:text-7xl font-black uppercase leading-none">
          Let's Connect
        </h3>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target={link.isExternal ? "_blank" : "_self"}
            rel={link.isExternal ? "noopener noreferrer" : undefined}
            // UPDATED: Reduced padding for mobile cards (p-6)
            className="contact-card block group relative bg-[#F5EBEB]/5 hover:bg-[#F5EBEB] border border-[#F5EBEB]/10 rounded-xl md:rounded-2xl p-6 md:p-8 transition-all duration-500 ease-out hover:-translate-y-2 cursor-pointer"
          >
            {/* UPDATED: Reduced circle size for mobile */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#F5EBEB]/10 group-hover:bg-[#867070] flex items-center justify-center mb-4 md:mb-6 transition-colors duration-500 text-[#F5EBEB]">
              {link.icon}
            </div>

            <div>
              <p className="text-[#D5B4B4] group-hover:text-[#867070]/60 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 transition-colors duration-300">
                {link.label}
              </p>
              {/* UPDATED: Adjusted value text size to prevent overflow on mobile */}
              <h4 className="text-lg md:text-2xl font-bold group-hover:text-[#867070] transition-colors duration-300 break-words leading-tight">
                {link.value}
              </h4>
            </div>

            <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#867070"
                strokeWidth="3"
                className="w-4 h-4 md:w-5 md:h-5" // UPDATED: Responsive arrow size
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
