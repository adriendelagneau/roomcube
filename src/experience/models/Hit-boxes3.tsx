"use client";

import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

import useInteractionStore from "@/store/useInteractionStore";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const HitBoxesClock_Baked: React.FC<React.ComponentProps<"group">> = (
  props
) => {
  const { nodes } = useGLTF("/models/hit-boxes.glb") as unknown as GLTFResult;
  const { clickedObject } = useInteractionStore();

  // 🟦 Transparent hit-box material
  const hitBoxMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    []
  );

  // 💠 Glowing corners material
  const cornersMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#00ffff",
        emissive: "#00ffff",
        emissiveIntensity: 1.5,
      }),
    []
  );

  // 🧩 Ref for the clock corners
  const clockCornerRef = useRef<Mesh>(null);

  // Hover state
  const [hovered, setHovered] = useState<boolean>(false);

  // Animate clock corner scale on hover
  useEffect(() => {
    gsap.to(clockCornerRef.current?.scale || {}, {
      x: hovered || clickedObject === "Clock" ? 1 : 0,
      y: hovered || clickedObject === "Clock" ? 1 : 0,
      z: hovered || clickedObject === "Clock" ? 1 : 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [hovered, clickedObject]);

  return (
    <group {...props} dispose={null}>
      {/* 💠 Clock Corners (glow) */}
      <mesh
        ref={clockCornerRef}
        geometry={nodes["corners-clock"].geometry}
        material={cornersMaterial}
        position={[-2.237, 2.41, -1.034]}
        scale={0}
      />

      {/* 🟦 Invisible Hit-box (interactive) */}
      <mesh
        name="Clock"
        geometry={nodes["hit-box-clock"].geometry}
        material={hitBoxMaterial}
        position={[-2.259, 2.41, -1.056]}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      />
    </group>
  );
};

useGLTF.preload("/models/hit-boxes.glb");

export default HitBoxesClock_Baked;
