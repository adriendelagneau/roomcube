"use client";

import { useCallback, useEffect, useState } from "react";

interface OrientationModalProps {
  onPortraitChange?: (isPortrait: boolean) => void;
}

const OrientationModal: React.FC<OrientationModalProps> = ({ onPortraitChange }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const checkOrientation = useCallback(() => {
    // Debounce for iOS Safari UI adjustment
    setTimeout(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Show modal only for portrait devices with width < 1024
      const portrait = height > width && width < 1024;

      setShowModal(portrait);
      if (onPortraitChange) onPortraitChange(portrait);
    }, 150);
  }, [onPortraitChange]);

  useEffect(() => {
    checkOrientation();

    // Listen for changes
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    window.screen.orientation?.addEventListener("change", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
      window.screen.orientation?.removeEventListener("change", checkOrientation);
    };
  }, [checkOrientation]);

  return (
    <div
      className={`absolute inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50 text-center px-4
        transition-opacity duration-500 ease-in-out
        ${showModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        Please rotate your device to landscape
      </h1>
      <p className="text-lg md:text-xl">
        The app works best in landscape mode.
      </p>
    </div>
  );
};

export default OrientationModal;
