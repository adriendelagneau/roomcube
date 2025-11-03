"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";
import { textSplitter } from "@/utils/textSplitter";

interface SidebarLibraryProps {
  object: InteractiveObject;
}

const SidebarLibrary: React.FC<SidebarLibraryProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      const underlineEl = underlineRef.current;
      const textSpans =
        containerRef.current.querySelectorAll<HTMLElement>(".inner-span");

      const tl = gsap.timeline({ delay: 0.5 });

      // 1️⃣ Animate underline (width reveal matching text)
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // 2️⃣ Animate text (letters)
      if (textSpans.length) {
        tl.fromTo(
          textSpans,
          { opacity: 0, y: 5 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: "power3.out",
          },
          ">0.1" // starts 0.1s after underline
        );
      }
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div ref={containerRef} className="mt-6 flex flex-col gap-3">
      {/* Title with animated underline */}
      <h2 className="sidebar-title inline-block text-2xl font-bold">
        <span className="relative inline-block">
          {object.title}
          <span
            ref={underlineRef}
            className="underline-span block h-px origin-left scale-x-0 bg-blue-50"
          ></span>
        </span>
      </h2>

      {/* Intro text */}
      {object.text && (
        <p className="sidebar-block text-lg opacity-90">
          {textSplitter(object.text)}
        </p>
      )}
    </div>
  );
};

export default SidebarLibrary;
