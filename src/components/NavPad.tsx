"use client";

import { BriefcaseBusiness, Clock, Coffee, Library } from "lucide-react";
import React from "react";

import useInteractionStore from "@/store/useInteractionStore";

const NavPad = () => {
  const { setClickedObject, isEntered } = useInteractionStore();

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 h-32 w-32 rounded-xl border-2 border-zinc-800 bg-zinc-950 p-2 transition-opacity duration-500 ${isEntered ? "pointer-events-auto opacity-100 delay-[1500ms]" : "pointer-events-none opacity-0"} `}
    >
      <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2">
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-zinc-900 transition hover:scale-110"
          onClick={() => setClickedObject("Library")}
        >
          <Library size={24} className="text-zinc-100 hover:text-white" />
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-zinc-900 transition hover:scale-110"
          onClick={() => setClickedObject("Projects")}
        >
          <BriefcaseBusiness
            size={24}
            className="text-zinc-100 hover:text-white"
          />
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-zinc-900 transition hover:scale-110"
          onClick={() => setClickedObject("Mug")}
        >
          <Coffee size={24} className="text-zinc-100 hover:text-white" />
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-zinc-900 transition hover:scale-110"
          onClick={() => setClickedObject("Clock")}
        >
          <Clock size={24} className="text-zinc-100 hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default NavPad;
