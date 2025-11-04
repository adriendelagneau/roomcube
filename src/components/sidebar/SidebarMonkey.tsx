"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { InteractiveObject } from "@/data/interactiveObjects";
import { useMorphStore } from "@/store/useMorphStore";
import { textSplitter } from "@/utils/textSplitter";

interface SidebarMonkeyProps {
  object: InteractiveObject;
}

const SidebarMonkey: React.FC<SidebarMonkeyProps> = ({ object }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  const setTargetIndex = useMorphStore((state) => state.setTargetIndex);

  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      const underlineEl = underlineRef.current;
      const textSpans =
        containerRef.current.querySelectorAll<HTMLElement>(".inner-span");
      const buttons =
        containerRef.current.querySelectorAll<HTMLElement>("button");

      const tl = gsap.timeline({ delay: 0.5 });

      // Underline animation
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Text animation
      tl.fromTo(
        textSpans,
        { opacity: 0, y: 5 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.2"
      );

      // 👇 Animate buttons AFTER text reveal
      tl.fromTo(
        buttons,
        { opacity: 0 },
        {
          opacity: 1,

          duration: 0.4,
          stagger: 0.15,
          ease: "power3.out",
        },
        "+=0.2" // small delay after text
      );
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div ref={containerRef} className="space-y-4">
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
      <p className="opacity-90 lg:text-xl">{textSplitter(object.text ?? "")}</p>

      {/* Buttons that will animate in after text */}
      <div className="flex gap-2 pt-2">
        <button onClick={() => setTargetIndex(0)} className="btn">
          Three.JS
        </button>
        <button onClick={() => setTargetIndex(1)} className="btn">
          Suzanne
        </button>
        <button onClick={() => setTargetIndex(2)} className="btn">
          Pikatchu
        </button>
      </div>
    </div>
  );
};

export default SidebarMonkey;
