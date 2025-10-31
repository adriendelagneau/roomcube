"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";
import { textSplitter } from "@/utils/textSplitter";

interface SidebarContactProps {
  object: InteractiveObject;
}

const SidebarContact: React.FC<SidebarContactProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out",
        },
        "-=0.1"
      );
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div ref={containerRef} className="mt-6 flex flex-col gap-6">
      {/* Title with animated underline */}
      <h2 className="sidebar-title inline-block text-xl font-semibold lg:text-2xl">
        <span className="relative inline-block">
          {object.title}
          <span
            ref={underlineRef}
            className="underline-span block h-px origin-left scale-x-0 bg-blue-50"
          ></span>
        </span>
      </h2>

      {/* Animated text */}
      <p className="text-lg leading-relaxed opacity-90">
        {textSplitter(object.text ?? "A cup of coffee keeps the code flowing!")}
      </p>
    </div>
  );
};

export default SidebarContact;
