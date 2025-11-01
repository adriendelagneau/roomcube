import { create } from "zustand";

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  updateDimensions: (dimensions: { width: number; height: number }) => void;
}

export const useResponsiveStore = create<ResponsiveState>((set) => ({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  screenWidth: 0,
  screenHeight: 0,
  updateDimensions: (dimensions) =>
    set({
      isMobile: dimensions.width < 1024,
      isTablet: dimensions.width >= 1024 && dimensions.width < 1280,
      isDesktop: dimensions.width >= 1280,
      screenWidth: dimensions.width,
      screenHeight: dimensions.height,
    }),
}));
