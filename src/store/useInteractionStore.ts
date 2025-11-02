import { create } from "zustand";

interface InteractionState {
  hoveredObject: string | null; // name of hovered object
  clickedObject: string | null; // name of clicked object
  isEntered: boolean;
  hasEntered: boolean;
  hasIntroFinished: boolean;

  setHoveredObject: (name: string | null) => void;
  setClickedObject: (name: string | null) => void;
  setIsEntered: (entered: boolean) => void;
  setHasEntered: (entered: boolean) => void;
  setHasIntroFinished: (finished: boolean) => void;
}

const useInteractionStore = create<InteractionState>((set, get) => ({
  hoveredObject: null,
  clickedObject: null,
  isEntered: false,
  hasEntered: false,
  hasIntroFinished: false,

  setHoveredObject: (name) => {
    if (get().hoveredObject === name) return;
    set({ hoveredObject: name });
  },

  setClickedObject: (name) => {
    if (get().clickedObject === name) return; // ✅ prevents re-click camera twitch
    set({ clickedObject: name });
  },

  setIsEntered: (entered) => {
    if (get().isEntered === entered) return;
    set({ isEntered: entered });
  },

  setHasEntered: (entered) => {
    if (get().hasEntered === entered) return;
    set({ hasEntered: entered });
  },

  setHasIntroFinished: (finished) => {
    if (get().hasIntroFinished === finished) return;
    set({ hasIntroFinished: finished });
  },
}));

export default useInteractionStore;
