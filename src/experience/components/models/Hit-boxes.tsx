"use client";

import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import React, { useMemo, useRef, useEffect } from "react";
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

import useInteractionStore from "@/store/useInteractionStore";

type GLTFResult = {
  nodes: Record<string, Mesh>;
};

const HitBoxes: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/hit-boxes.glb") as unknown as GLTFResult;
  const { hoveredObject, clickedObject } = useInteractionStore();

  // 🟦 Invisible but clickable hit-box material (still needed for raycasting)
  const hitBoxMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
        toneMapped: false,
      }),
    []
  );

  // 💠 Glowing corners material
  const cornersMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#daff47",
        emissive: "#daff47",
        emissiveIntensity: 1.0,
      }),
    []
  );

  // 🔹 Refs for animated corner meshes
  const refs = {
    Clock: useRef<Mesh>(null),
    Library: useRef<Mesh>(null),
    Mug: useRef<Mesh>(null),
    Photos: useRef<Mesh>(null),
    Monkey: useRef<Mesh>(null),
  };

  // 🎞 Animate corner glow based on hover or click state
  useEffect(() => {
    Object.entries(refs).forEach(([key, ref]) => {
      const isSelected = clickedObject === key;
      const isHovered = hoveredObject === key;
      const shouldShow = isSelected || (!clickedObject && isHovered);

      gsap.to(ref.current?.scale || {}, {
        x: shouldShow ? 1 : 0,
        y: shouldShow ? 1 : 0,
        z: shouldShow ? 1 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredObject, clickedObject]);

  // 🧱 Object data from GLB
  const objects = [
    {
      name: "Clock",
      corner: "corners-clock",
      box: "hit-box-clock",
      positionCorner: [-3.933, 3.977, -1.397],
      positionBox: [-3.915, 3.983, -1.378],
    },
    {
      name: "Library",
      corner: "corners-library",
      box: "hit-box-library",
      positionCorner: [3.638, 3.347, -0.352],
      positionBox: [3.824, 3.353, -0.546],
    },
    {
      name: "Mug",
      corner: "corners-mug",
      box: "hit-box-mug",
      positionCorner: [-0.445, 1.926, 2.979],
      positionBox: [-0.429, 1.915, 2.981],
    },
    {
      name: "Photos",
      corner: "corners-photos",
      box: "hit-box-photos",
      positionCorner: [-1.969, 3.807, -3.433],
      positionBox: [-1.959, 3.815, -3.423],
    },
    {
      name: "Monkey",
      corner: "corners-monkey",
      box: "hit-box-monkey",
      positionCorner: [2.561, 4.571, -1.43],
      positionBox: [2.77, 4.573, -1.719],
    },
  ];

  return (
    <group {...props} dispose={null}>
      {objects.map((obj) => (
        <group key={obj.name}>
          {/* 💠 Animated glow corners */}
          <mesh
            ref={refs[obj.name as keyof typeof refs]}
            geometry={nodes[obj.corner].geometry}
            material={cornersMaterial}
            position={obj.positionCorner as [number, number, number]}
            scale={0}
          />

          {/* 🟦 Invisible hit-box (no event handlers anymore) */}
          <mesh
            name={obj.name}
            geometry={nodes[obj.box].geometry}
            material={hitBoxMaterial}
            position={obj.positionBox as [number, number, number]}
          />
        </group>
      ))}
    </group>
  );
};

// 🔹 Preload GLB
useGLTF.preload("/models/hit-boxes.glb");

export default HitBoxes;
