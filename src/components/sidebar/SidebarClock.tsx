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

  useGSAP(() => {
    if (!containerRef.current || !textRef.current || !underlineRef.current)
      return;

    const container = containerRef.current;
    const underlineEl = underlineRef.current;
    const letters =
      textRef.current.querySelectorAll<HTMLElement>(".inner-span");

    const lineHeight = parseFloat(
      getComputedStyle(textRef.current).lineHeight || "8"
    );

    // 1️⃣ Underline animation
    gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
    gsap.to(underlineEl, {
      scaleX: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.3,
    });

    // 2️⃣ Hide all letters first
    gsap.set(letters, { opacity: 0 });

    // 3️⃣ Reveal letters one by one
    const tl = gsap.timeline({
      delay: 0.6,
      onComplete: () => {
        container.style.overflowY = "auto";
        gsap.to(container, {
          scrollTop: container.scrollHeight,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    letters.forEach((letter, i) => {
      tl.add(() => {
        gsap.fromTo(
          letter,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.04, ease: "power2.out" }
        );

        const rect = letter.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const distanceFromBottom = containerRect.bottom - rect.bottom;

        // 4️⃣ When near the bottom, scroll up one line height
        if (distanceFromBottom < lineHeight * 2) {
          gsap.to(container, {
            scrollTop: `+=${lineHeight}`,
            duration: 0.25,
            ease: "power2.out",
          });
        }
      }, i * 0.04); // adjust speed here
    });

    return () => tl.kill();
  }, [object]);

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
