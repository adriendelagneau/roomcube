import { create } from "zustand";

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  updateDimensions: () => void;
}

export const useResponsiveStore = create<ResponsiveState>((set) => {
  const getDimensions = () => {
    if (typeof window === "undefined") {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        screenWidth: 0,
        screenHeight: 0,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      isMobile: width < 1024,
      isTablet: width >= 1024 && width < 1280,
      isDesktop: width >= 1280,
      screenWidth: width,
      screenHeight: height,
    };
  };

  return {
    ...getDimensions(),
    updateDimensions: () => set(getDimensions()),
  };
});
