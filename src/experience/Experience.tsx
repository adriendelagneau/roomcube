"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import OrientationModal from "@/components/OrientationModal";
import useInput from "@/store/useInput";
import { useResponsiveStore } from "@/store/useResponsiveStore";

import CameraGUI from "./components/CameraGUI";
import CameraManager from "./components/CameraManager";
import RaycasterHandler from "./components/RaycasterHandler";
import Scene from "./Scene";

const Experience = () => {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  const { setPointer } = useInput();
  const { isMobile, isTablet, isDesktop, updateDimensions } =
    useResponsiveStore();
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  const checkOrientation = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  useEffect(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  useEffect(() => {
    updateDimensions(); // Initialize on mount
    window.addEventListener("resize", updateDimensions);
    console.log(isMobile, isTablet, isDesktop);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isDesktop, isMobile, isTablet, updateDimensions]);

  useEffect(() => {
    interface PointerMoveEvent extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handlePointerMove = (event: PointerMoveEvent): void => {
      setPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  });
  return (
    <>
      <Canvas
        flat
        gl={{ antialias: false }}
        style={{ position: "fixed", zIndex: 1, top: 0, left: 0 }}
        frameloop={isPortrait ? "demand" : "always"} // Pause when in portrait
      >
        <OrthographicCamera
          ref={cameraRef}
          makeDefault
          // position={[0, 0, 10]}
          // zoom={112}
        />
        <Scene />
        <RaycasterHandler />
        <CameraGUI cameraRef={cameraRef} />
        <CameraManager camera={cameraRef} />
      </Canvas>
      <OrientationModal onPortraitChange={setIsPortrait} />
    </>
  );
};

export default Experience;
