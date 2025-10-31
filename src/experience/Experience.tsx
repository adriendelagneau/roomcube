"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import Scene from "./Scene";

const Experience = () => {
  const pointer = useRef(new THREE.Vector2());

  // Track mouse movement and update pointer position
  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

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
      <Scene pointer={pointer} />
    </Canvas>
  );
};

export default Experience;
