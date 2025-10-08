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

const useInteractionStore = create<InteractionState>((set) => ({
  hoveredObject: null,
  clickedObject: null,
  isEntered: false,
  hasEntered: false,
  hasIntroFinished: false,

  setHoveredObject: (name) => set({ hoveredObject: name }),
  setClickedObject: (name) => set({ clickedObject: name }),
  setIsEntered: (entered) => set({ isEntered: entered }),
  setHasEntered: (entered) => set({ hasEntered: entered }),
  setHasIntroFinished: (finished) => set({ hasIntroFinished: finished }),
}));

export default useInteractionStore;

