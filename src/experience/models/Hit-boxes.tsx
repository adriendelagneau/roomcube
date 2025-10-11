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
        color: "#00ffff",
        emissive: "#00ffff",
        emissiveIntensity: 1.5,
      }),
    []
  );

  // 🧩 Refs for corner meshes
  const clockCornerRef = useRef<Mesh>(null);
  const libraryCornerRef = useRef<Mesh>(null);

  // Hover states
  const [hoveredClock, setHoveredClock] = useState(false);
  const [hoveredLibrary, setHoveredLibrary] = useState(false);

  // Animate clock corners
  useEffect(() => {
    gsap.to(clockCornerRef.current?.scale || {}, {
      x: hoveredClock || clickedObject === "Clock" ? 1 : 0,
      y: hoveredClock || clickedObject === "Clock" ? 1 : 0,
      z: hoveredClock || clickedObject === "Clock" ? 1 : 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [hoveredClock, clickedObject]);

  // Animate library corners
  useEffect(() => {
    gsap.to(libraryCornerRef.current?.scale || {}, {
      x: hoveredLibrary || clickedObject === "Library" ? 1 : 0,
      y: hoveredLibrary || clickedObject === "Library" ? 1 : 0,
      z: hoveredLibrary || clickedObject === "Library" ? 1 : 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [hoveredLibrary, clickedObject]);

  return (
    <group {...props} dispose={null}>
      {/* 💠 Clock Corners */}
      <mesh
        ref={clockCornerRef}
        geometry={nodes["corners-clock"].geometry}
        material={cornersMaterial}
        position={[-2.237, 2.41, -1.034]}
        scale={0}
      />
      {/* 🟦 Clock Hit-box */}
      <mesh
        name="Clock"
        geometry={nodes["hit-box-clock"].geometry}
        material={hitBoxMaterial}
        position={[-2.259, 2.41, -1.056]}
        onPointerOver={() => {
          setHoveredClock(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredClock(false);
          document.body.style.cursor = "auto";
        }}
      />

      {/* 💠 Library Corners */}
      <mesh
        ref={libraryCornerRef}
        geometry={nodes["corners-library"].geometry}
        material={cornersMaterial}
        position={[2.064, 2.043, -0.325]}
        scale={0}
      />
      {/* 🟦 Library Hit-box */}
      <mesh
        name="Library"
        geometry={nodes["hit-box-library"].geometry}
        material={hitBoxMaterial}
        position={[2.264, 2.043, -0.524]}
        onPointerOver={() => {
          setHoveredLibrary(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHoveredLibrary(false);
          document.body.style.cursor = "auto";
        }}
      />
    </group>
  );
};

useGLTF.preload("/models/hit-boxes.glb");

export default HitBoxes_Baked;
