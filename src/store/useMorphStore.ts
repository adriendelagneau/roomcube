import { create } from "zustand";

interface MorphStore {
  targetIndex: number;
  setTargetIndex: (index: number) => void;
}

export const useMorphStore = create<MorphStore>((set) => ({
  targetIndex: 0,
  setTargetIndex: (index) => set({ targetIndex: index }),
}));
