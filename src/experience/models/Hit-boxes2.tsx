"use client";

import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

import useInteractionStore from "@/store/useInteractionStore";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const HitBoxes_Baked: React.FC<React.ComponentProps<"group">> = (props) => {
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
        color: "#5394fc",
        emissive: "#5394fc",
        emissiveIntensity: 1.5,
      }),
    []
  );

  // 🧩 Refs for corner meshes
  const refs = {
    Clock: useRef<Mesh>(null),
    Library: useRef<Mesh>(null),
    Mug: useRef<Mesh>(null),
  };

  // 🧠 Hover states
  const [hovered, setHovered] = useState({
    Clock: false,
    Library: false,
    Mug: false,
  });

  // 🎞 Animate corner visibility when hovered or clicked
  useEffect(() => {
    Object.entries(refs).forEach(([key, ref]) => {
      gsap.to(ref.current?.scale || {}, {
        x:
          hovered[key as keyof typeof hovered] || clickedObject === key ? 1 : 0,
        y:
          hovered[key as keyof typeof hovered] || clickedObject === key ? 1 : 0,
        z:
          hovered[key as keyof typeof hovered] || clickedObject === key ? 1 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  }, [hovered, clickedObject]);

  // 🧩 Object definitions for clean rendering
  const objects = [
    {
      name: "Clock",
      corner: "corners-clock",
      box: "hit-box-clock",
      positionCorner: [-2.237, 2.41, -1.034],
      positionBox: [-2.259, 2.41, -1.056],
    },
    {
      name: "Library",
      corner: "corners-library",
      box: "hit-box-library",
      positionCorner: [2.064, 2.043, -0.325],
      positionBox: [2.264, 2.043, -0.524],
    },
    {
      name: "Mug",
      corner: "corners-mug",
      box: "hit-box-mug",
      positionCorner: [-0.275, 1.171, 1.788],
      positionBox: [-0.275, 1.171, 1.788],
    },
  ];

  return (
    <group {...props} dispose={null}>
      {objects.map((obj) => (
        <group key={obj.name}>
          {/* 💠 Corners */}
          <mesh
            ref={refs[obj.name as keyof typeof refs]}
            geometry={nodes[obj.corner].geometry}
            material={cornersMaterial}
            position={obj.positionCorner as [number, number, number]}
            scale={0}
          />

          {/* 🟦 Hit-box */}
          <mesh
            name={obj.name}
            geometry={nodes[obj.box].geometry}
            material={hitBoxMaterial}
            position={obj.positionBox as [number, number, number]}
            onPointerOver={() => {
              setHovered((prev) => ({ ...prev, [obj.name]: true }));
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setHovered((prev) => ({ ...prev, [obj.name]: false }));
              document.body.style.cursor = "auto";
            }}
          />
        </group>
      ))}
    </group>
  );
};

useGLTF.preload("/models/hit-boxes.glb");

export default HitBoxes_Baked;
