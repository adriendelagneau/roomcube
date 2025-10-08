"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import useInteractionStore from "@/store/useInteractionStore";

import {
  interactiveObjects,
  type InteractiveObject,
} from "@/data/interactiveObjects";
import { textSplitter } from "@/utils/textSplitter";

gsap.registerPlugin(useGSAP);

const Sidebar: React.FC = () => {
  const { clickedObject } = useInteractionStore();

  const activeObject: InteractiveObject | undefined = interactiveObjects.find(
    (obj) => obj.name === clickedObject
  );

  // Type containerRef as HTMLDivElement | null
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the gsap hook instead of useEffect
  useGSAP(
    () => {
      if (!activeObject || !containerRef.current) return;

      const spans =
        containerRef.current.querySelectorAll<HTMLElement>(".inner-span");

      gsap.fromTo(
        spans,
        { opacity: 0 },
        {
          opacity: 1,
          delay: 0.7,
          duration: 0.6,
          stagger: 0.03,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef, dependencies: [activeObject] }
  );

  return (
    <div
      className={`fixed top-0 right-0 z-50 box-border h-full w-92 transform bg-zinc-950 p-5 text-zinc-100 transition-transform duration-700 ease-in-out ${
        clickedObject ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {activeObject && (
        <div ref={containerRef} className="relative flex h-full flex-col">
          {/* Content */}
          <div className="mt-10 space-y-10 font-medium">
            <h2 className="text-2xl font-bold">{activeObject.title}</h2>
            <p className="text-xl opacity-90">
              
              {textSplitter(activeObject.text ?? "")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
