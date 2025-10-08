"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import useInteractionStore from "@/store/useInteractionStore";

export default function Loader() {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [canEnter, setCanEnter] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const setIsEntered = useInteractionStore((state) => state.setIsEntered);

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    setDisplayProgress((prev) => Math.max(prev, Math.round(progress)));
  }, [progress]);

  useEffect(() => {
    if (progress === 100 && cardRef.current) {
      setCanEnter(true);
      gsap.to(cardRef.current, {
        rotationX: -180,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.5,
      });
    }
  }, [progress]);

  const handleEnter = () => {
    if (!topRef.current || !bottomRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true),
        setIsEntered(true); // 🔹 Mark as entered in the global store
      } 
    });

    tl.to(topRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power2.inOut",
    }).to(
      bottomRef.current,
      {
        y: "100%",
        duration: 1,
        ease: "power2.inOut",
      },
      "<"
    );
  };

  if (isDone) return null;

  const size = 120;
  const strokeWidth = 2;
  const perimeter = (size - strokeWidth) * 4;
  const dashOffset = perimeter - (displayProgress / 100) * perimeter;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={topRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-zinc-950 flex items-end justify-center"
      >
        <div
          className="relative w-[120px] h-[60px]"
          style={{ perspective: 1000 }}
        >
          <div
            ref={cardRef}
            className="relative w-full h-[120px] text-2xl"
            style={{ transformStyle: "preserve-3d", top: "-60px" }}
          >
            {/* Front Side: Loading Progress */}
            <div
              className="absolute w-full h-full flex items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="absolute"
              >
                <rect
                  x={strokeWidth / 2}
                  y={strokeWidth / 2}
                  width={size - strokeWidth}
                  height={size - strokeWidth}
                  stroke="#333"
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                <rect
                  x={strokeWidth / 2}
                  y={strokeWidth / 2}
                  width={size - strokeWidth}
                  height={size - strokeWidth}
                  stroke="#fff"
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={perimeter}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.3s ease" }}
                />
              </svg>
              <span className="text-zinc-100  pointer-events-auto">
                Loading
              </span>
            </div>

            {/* Back Side: Enter Button */}
            <div
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <button
                onClick={handleEnter}
                disabled={!canEnter}
                className={`px-6 py-3 w-full h-full text-zinc-100  transition duration-300 pointer-events-auto ${
                  canEnter
                    ? "opacity-100 cursor-pointer border-2 border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950"
                    : "opacity-0"
                }`}
              >
                Entrer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-zinc-950"
      />
    </div>
  );
}
