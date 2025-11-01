"use client";

import { useCallback, useEffect, useState } from "react";

interface OrientationModalProps {
  onPortraitChange?: (isPortrait: boolean) => void;
}

const OrientationModal: React.FC<OrientationModalProps> = ({
  onPortraitChange,
}) => {
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
      window.screen.orientation?.removeEventListener(
        "change",
        checkOrientation
      );
    };
  }, [checkOrientation]);

  return (
    <div
      className={`bg-opacity-90 absolute inset-0 z-50 flex flex-col items-center justify-center bg-black px-4 text-center text-white transition-opacity duration-500 ease-in-out ${showModal ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <h1 className="mb-4 text-2xl font-bold md:text-4xl">
        Please rotate your device to landscape
      </h1>
      <p className="text-lg md:text-xl">
        The app works best in landscape mode.
      </p>
    </div>
  );
};

export default OrientationModal;
