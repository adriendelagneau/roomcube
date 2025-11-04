"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  // Bloom,
  EffectComposer,
  Outline,
  ToneMapping,
} from "@react-three/postprocessing";
// import { KernelSize, Resolution, ToneMappingMode } from "postprocessing";
import { BlendFunction } from "postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import CameraManager from "./components/CameraManager";
import InteractionHandler from "./components/InteractionHandler";
import Scene from "./Scene";

const Experience = () => {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  const pointer = useRef(new THREE.Vector2());

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
      gl={{
        antialias: true,
        // toneMapping: THREE.ACESFilmicToneMapping,
        alpha: true,
      }}
      flat
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
      <EffectComposer multisampling={8} autoClear={false}>
        <Outline
          blur
          blendFunction={BlendFunction.SCREEN}
          edgeStrength={3}
          width={1000}
        />
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
        <ToneMapping blendFunction={BlendFunction.COLOR_DODGE} />
      </EffectComposer>
    </Canvas>
  );
};

export default Experience;
