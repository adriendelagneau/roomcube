"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Scene from "./Scene";

const Experience = () => {
  return (
    <Canvas
      flat
      gl={{ antialias: false }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        background: "#0a0a0a",
      }}
    >
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={60} />
      <Scene />
    </Canvas>
  );
};

export default Experience;
