"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

import { interactiveObjects } from "@/data/interactiveObjects";
import useInteractionStore from "@/store/useInteractionStore";

import SidebarClock from "./SidebarClock";
import SidebarContact from "./SidebarContact";
import SidebarLibrary from "./SidebarLibrary";
import SidebarMonkey from "./SidebarMonkey";
import SidebarPhotos from "./SidebarPhotos";

gsap.registerPlugin();

const Sidebar: React.FC = () => {
  const { clickedObject, setIsUIHovered } = useInteractionStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const activeObject = interactiveObjects.find(
    (obj) => obj.name === clickedObject
  );

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }
      );
    },
    { scope: containerRef, dependencies: [activeObject] }
  );

  return (
    <div
      onMouseEnter={() => setIsUIHovered(true)}
      onMouseLeave={() => setIsUIHovered(false)}
      onClick={(e) => e.stopPropagation()}
      className={`fixed top-0 right-0 z-50 box-border h-full w-52 transform bg-neutral-900 p-3 text-blue-50 transition-transform duration-700 ease-in-out lg:w-80 lg:p-4 ${
        clickedObject ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {activeObject && (
        <div ref={containerRef} className="relative flex h-full flex-col">
          {activeObject.name === "Monkey" && (
            <SidebarMonkey object={activeObject} />
          )}
          {activeObject.name === "Library" && (
            <SidebarLibrary object={activeObject} />
          )}
          {activeObject.name === "Photos" && (
            <SidebarPhotos object={activeObject} />
          )}
          {activeObject.name === "Mug" && (
            <SidebarContact object={activeObject} />
          )}
          {activeObject.name === "Clock" && (
            <div className="grow overflow-hidden">
              <SidebarClock object={activeObject} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
