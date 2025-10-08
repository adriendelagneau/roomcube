"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import Scene from "./Scene";

const Experience = () => {
  const cameraRef = useRef(null);

  return (
    <>
      <Canvas
        flat
        gl={{ antialias: false }}
        style={{ position: "fixed", zIndex: 1, top: 0, left: 0 }}
      >
        <OrthographicCamera
          ref={cameraRef}
          makeDefault
          position={[0, 0, 10]}
          zoom={160}
        />
        <Scene />
      </Canvas>
    </>
  );
};

export default Experience;
