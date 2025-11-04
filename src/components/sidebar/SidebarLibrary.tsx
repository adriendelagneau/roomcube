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

      const tl = gsap.timeline({ delay: 0.4 });

      // 🟦 Animate underline
      gsap.set(underlineEl, { transformOrigin: "left center", scaleX: 0 });
      tl.to(underlineEl, {
        scaleX: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate each block
      blocks.forEach((block, i) => {
        const letters = block.querySelectorAll<HTMLElement>(".inner-span");
        const icons = block.querySelectorAll<HTMLElement>(".tech-item");

        // Fade + slide in the whole block
        tl.fromTo(
          block,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          i === 0 ? "-=0.1" : "+=0.2"
        );

        // Animate text letters
        if (letters.length) {
          tl.fromTo(
            letters,
            { opacity: 0, y: 3 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.02,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }

        // Animate tech icons with opacity only
        if (icons.length) {
          tl.fromTo(
            icons,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.4,
              stagger: 0.15,
              ease: "power3.out",
            },
            "-=0.2"
          );
        }
      });
    },
    { scope: containerRef, dependencies: [object] }
  );

  return (
    <div
      ref={containerRef}
      className="scrollbar scrollbar-none mt-4 flex h-full flex-col gap-4 overflow-hidden"
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
              className="content-block text-md leading-relaxed opacity-0 xl:text-base"
            >
              {textSplitter(block.content)}
            </p>
          );
        }

        if (block.type === "techList") {
          return (
            <div
              key={i}
              className="content-block flex flex-wrap gap-3 opacity-0"
            >
              {block.items.map((item, idx) => (
                <div
                  key={idx}
                  className="tech-item flex flex-col items-center text-center"
                >
                  <div className="relative h-8 w-8">
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
