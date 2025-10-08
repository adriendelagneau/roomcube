"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import CameraManager from "./CameraManager";
import RaycasterHandler from "./RaycasterHandler";
import Scene from "./Scene";

const Experience = () => {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);

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
        <RaycasterHandler />
        <CameraManager camera={cameraRef} />
      </Canvas>
    </>
  );
};

export default Experience;
