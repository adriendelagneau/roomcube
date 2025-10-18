"use client";

import { useEffect, useState } from "react";

interface OrientationModalProps {
  onPortraitChange?: (isPortrait: boolean) => void;
}

const OrientationModal: React.FC<OrientationModalProps> = ({ onPortraitChange }) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  const checkOrientation = () => {
    const portrait = window.innerHeight > window.innerWidth;
    setIsPortrait(portrait);
    if (onPortraitChange) onPortraitChange(portrait);
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (!isPortrait) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center z-50 text-center px-4">
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
