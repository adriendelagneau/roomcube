"use client";

import { useCallback, useEffect, useState } from "react";

interface OrientationModalProps {
  onPortraitChange?: (isPortrait: boolean) => void;
}

const OrientationModal: React.FC<OrientationModalProps> = ({ onPortraitChange }) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const checkScreenSize = useCallback(() => {
    // Treat anything under 1024px as "mobile/tablet" (portrait)
    const small = window.innerWidth < 1024;
    setIsSmallScreen(small);
    if (onPortraitChange) onPortraitChange(small);
  }, [onPortraitChange]);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  if (!isSmallScreen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50 text-center px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        Please rotate your device or switch to a larger screen
      </h1>
      <p className="text-lg md:text-xl">
        The app works best on larger displays or landscape orientation.
      </p>
    </div>
  );
};

export default OrientationModal;
