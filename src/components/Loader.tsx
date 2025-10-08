"use client";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

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
        setIsDone(true);
        setIsEntered(true); // 🔹 Mark as entered in the global store
      },
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
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        ref={topRef}
        className="absolute top-0 right-0 left-0 flex h-1/2 items-end justify-center bg-zinc-950"
      >
        <div
          className="relative h-[60px] w-[120px]"
          style={{ perspective: 1000 }}
        >
          <div
            ref={cardRef}
            className="relative h-[120px] w-full text-2xl"
            style={{ transformStyle: "preserve-3d", top: "-60px" }}
          >
            {/* Front Side: Loading Progress */}
            <div
              className="absolute flex h-full w-full items-center justify-center"
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
              <span className="pointer-events-auto text-zinc-100">Loading</span>
            </div>

            {/* Back Side: Enter Button */}
            <div
              className="absolute flex h-full w-full items-center justify-center"
              style={{
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <button
                onClick={handleEnter}
                disabled={!canEnter}
                className={`pointer-events-auto h-full w-full px-6 py-3 text-zinc-100 transition duration-300 ${
                  canEnter
                    ? "cursor-pointer border-2 border-zinc-100 opacity-100 hover:bg-zinc-100 hover:text-zinc-950"
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
        className="absolute right-0 bottom-0 left-0 h-1/2 bg-zinc-950"
      />
    </div>
  );
}
