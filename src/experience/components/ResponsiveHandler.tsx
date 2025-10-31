"use client";

import { useEffect } from "react";

import { useResponsiveStore } from "@/store/useResponsiveStore";

const ResponsiveHandler = () => {
  const { updateDimensions } = useResponsiveStore();

  useEffect(() => {
    const handleResize = () => {
      updateDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateDimensions]);

  return null;
};

export default ResponsiveHandler;
