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

  useGSAP(
    () => {
      if (!containerRef.current || !underlineRef.current) return;

      const underlineEl = underlineRef.current;
      const textSpans =
        containerRef.current.querySelectorAll<HTMLElement>(".inner-span");
      const button = containerRef.current.querySelector<HTMLElement>(
        "button.download-btn"
      );

      const tl = gsap.timeline({ delay: 0.5 });

      // Animate underline
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate text
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

      // Animate download button
      if (button) {
        tl.fromTo(
          button,
          { opacity: 0 },
          {
            opacity: 1,

            duration: 0.5,
            ease: "power3.out",
          },
          "+=0.2"
        );
      }
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

      {/* Download button */}
      <button className="download-btn w-full rounded-lg bg-blue-600 py-3 font-medium text-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:bg-blue-700">
        <a
          href="/pdf/resume.pdf" // 👈 put your file in /public/CV.pdf
          download
          className="block w-full text-center"
        >
          Download CV
        </a>
      </button>
    </div>
  );
};

export default SidebarContact;
