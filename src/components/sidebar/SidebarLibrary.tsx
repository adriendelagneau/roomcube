"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
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
      const blocks =
        containerRef.current.querySelectorAll<HTMLElement>(".content-block");
      const letters =
        containerRef.current.querySelectorAll<HTMLElement>(".inner-span");

      const tl = gsap.timeline({ delay: 0.4 });

      // Underline animation
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate letters inside text blocks
      if (letters.length) {
        tl.fromTo(
          letters,
          { opacity: 0, y: 3 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.02,
            ease: "power3.out",
          },
          "-=0.2"
        );
      }

      // Animate all content blocks after text animation
      tl.fromTo(
        blocks,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.2"
      );
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div
      ref={containerRef}
      className="scrollbar-thin scrollbar-thumb-blue-500/40 scrollbar-track-transparent mt-4 flex max-h-[75vh] flex-col gap-6 overflow-y-auto pr-2"
    >
      {/* Title */}
      <h2 className="sidebar-title inline-block text-xl font-semibold lg:text-2xl">
        <span className="relative inline-block">
          {object.title}
          <span
            ref={underlineRef}
            className="underline-span block h-px origin-left scale-x-0 bg-blue-50"
          ></span>
        </span>
      </h2>

      {/* Dynamic blocks */}
      {object.blocks?.map((block, i) => {
        if (block.type === "text") {
          return (
            <p
              key={i}
              className="content-block text-base leading-relaxed opacity-90"
            >
              {textSplitter(block.content)}
            </p>
          );
        }

        if (block.type === "techList") {
          return (
            <div
              key={i}
              className="content-block grid grid-cols-3 gap-4 pt-2 sm:grid-cols-4"
            >
              {block.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-1 text-center transition-transform duration-200 hover:scale-105"
                >
                  <div className="relative h-10 w-10">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs opacity-80">{item.name}</span>
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default SidebarLibrary;
