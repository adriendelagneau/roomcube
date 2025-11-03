"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import { KernelSize, Resolution, ToneMappingMode } from "postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useInteractionStore from "@/store/useInteractionStore";

import CameraManager from "./components/CameraManager";
import InteractionHandler from "./components/InteractionHandler";
import Scene from "./Scene";

const Experience = () => {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  const pointer = useRef(new THREE.Vector2());
  const { setHoveredObject, setClickedObject } = useInteractionStore();

  // Combine all interactive object names (3D + sidebar)
  const interactiveNames = [
    ...interactiveObjects.map((obj) => obj.name.toLowerCase()),
  ];

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Handle hover and click outside interactive objects
  // Experience.tsx

  return (
    <Canvas
      flat
      gl={{ antialias: false, alpha: true }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        background: "transparent",
      }}
    >
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 10]}
        zoom={60}
      />

      <Scene pointer={pointer} />
      <CameraManager camera={cameraRef} />
      <InteractionHandler />
      <EffectComposer>
        {/* <Bloom
          intensity={0.4} // The bloom intensity.
          blurPass={undefined} // A blur pass.
          kernelSize={KernelSize.LARGE} // blur kernel size
          luminanceThreshold={0.5} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.015} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur={false} // Enables or disables mipmap blur.
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        /> */}
        <ToneMapping />
      </EffectComposer>
    </Canvas>
  );
};

export default Experience;
