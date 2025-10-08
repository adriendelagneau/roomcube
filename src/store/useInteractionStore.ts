import type { Object3D } from "three";
import { create } from "zustand";

interface InteractionState {
  hoveredObject: Object3D | null;
  clickedObject: Object3D | null;
  isEntered: boolean;

  setHoveredObject: (object: Object3D | null) => void;
  setClickedObject: (object: Object3D | null) => void;
  setIsEntered: (entered: boolean) => void;
}

const useInteractionStore = create<InteractionState>((set) => ({
  hoveredObject: null,
  clickedObject: null,
  isEntered: false,

  setHoveredObject: (object) => set({ hoveredObject: object }),
  setClickedObject: (object) => set({ clickedObject: object }),
  setIsEntered: (entered) => set({ isEntered: entered }),
}));

export default useInteractionStore;
