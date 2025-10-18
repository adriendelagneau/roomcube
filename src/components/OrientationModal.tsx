"use client";

import { useCallback, useEffect, useState } from "react";

interface OrientationModalProps {
  onPortraitChange?: (isPortrait: boolean) => void;
}

// Anything below 1024px is considered tablet/mobile
const MOBILE_MAX_WIDTH = 1024;

const OrientationModal: React.FC<OrientationModalProps> = ({ onPortraitChange }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const checkOrientation = useCallback(() => {
    // Debounce a bit for smoother updates (iOS Safari fix)
    setTimeout(() => {
      const width = window.innerWidth;
      const isMobileOrTablet = width < MOBILE_MAX_WIDTH;

      setShowModal(isMobileOrTablet);
      if (onPortraitChange) onPortraitChange(isMobileOrTablet);
    }, 150);
  }, [onPortraitChange]);

  useEffect(() => {
    checkOrientation();

    // Listen to events that can change width/orientation
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    window.screen.orientation?.addEventListener("change", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
      window.screen.orientation?.removeEventListener("change", checkOrientation);
    };
  }, [checkOrientation]);

  if (!showModal) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50 text-center px-4 transition-opacity duration-300">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        Please rotate your device to landscape
      </h1>
      <p className="text-lg md:text-xl">
        The app works best in landscape mode or on larger screens.
      </p>
    </div>
  );
};

export default OrientationModal;
