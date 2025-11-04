"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";
import { textSplitter } from "@/utils/textSplitter";

interface SidebarClockProps {
  object: InteractiveObject;
}

const SidebarClock: React.FC<SidebarClockProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  // Animate title → text
  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      const underlineEl = underlineRef.current;
      const textSpans =
        containerRef.current.querySelectorAll<HTMLElement>(".inner-span");

      const tl = gsap.timeline({ delay: 0.5 });

      // Animate underline (width reveal matching text)
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate text (letters)
      tl.fromTo(
        textSpans,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.1"
      );
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div
      ref={containerRef}
      className="scrollbar scrollbar-none mt-4 h-full overflow-hidden"
    >
      {/* Title */}
      <h2 className="sidebar-title mb-2 inline-block text-xl font-semibold lg:text-2xl">
        <span className="relative inline-block">
          {object.title}
          <span
            ref={underlineRef}
            className="underline-span block h-px origin-left scale-x-0 bg-blue-50"
          />
        </span>
      </h2>

      {/* Scrollable text area */}
      {object.text && (
        <div
          ref={textRef}
          className="scroll-area relative pr-1 pb-8 text-xl leading-8 opacity-90"
        >
          {textSplitter(object.text)}
        </div>
      )}
    </div>
  );
};

export default SidebarClock;
