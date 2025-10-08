import { create } from "zustand";

interface Pointer {
  x: number;
  y: number;
}

interface InputState {
  pointer: Pointer;
  setPointer: (x: number, y: number) => void;
}

const useInput = create<InputState>((set) => ({
  pointer: { x: 0, y: 0 },
  setPointer: (x, y) => set({ pointer: { x, y } }),
}));

export default useInput;

