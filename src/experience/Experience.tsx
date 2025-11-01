"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useInteractionStore from "@/store/useInteractionStore";

import CameraManager from "./components/CameraManager";
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
  const handlePointerEvent = (
    e: ThreeEvent<PointerEvent>,
    type: "hover" | "click"
  ) => {
    const intersections = e.intersections ?? [];
    const hitInteractive = intersections.some((i) =>
      interactiveNames.includes(i.object.name.toLowerCase())
    );

    if (!hitInteractive) {
      if (type === "hover") setHoveredObject(null);
      if (type === "click") setClickedObject(null);
    }
  };

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
      onPointerMove={(e) =>
        handlePointerEvent(e as unknown as ThreeEvent<PointerEvent>, "hover")
      }
      onPointerDown={(e) =>
        handlePointerEvent(e as unknown as ThreeEvent<PointerEvent>, "click")
      }
    >
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 10]}
        zoom={60}
      />

      <Scene pointer={pointer} />
      <CameraManager camera={cameraRef} />
    </Canvas>
  );
};

export default Experience;
