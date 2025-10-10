"use client";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const HitBoxes: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/hit-boxes.glb") as unknown as GLTFResult;

  // 🟦 Invisible hit-box material
  const hitBoxMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    []
  );

  // 💠 Glowing corner material
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
  const cornerRefs = {
    mug: useRef<Mesh>(null),
    clock: useRef<Mesh>(null),
    photos: useRef<Mesh>(null),
    library: useRef<Mesh>(null),
  };

  // Hover state
  const [hovered, setHovered] = useState<string | null>(null);

  // ✨ Animate corner scale on hover
  useEffect(() => {
    Object.entries(cornerRefs).forEach(([key, ref]) => {
      gsap.to(ref.current?.scale || {}, {
        x: hovered  === key  ? 1 : 0,
        y: hovered  === key  ? 1 : 0,
        z: hovered  === key  ? 1 : 0,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }, [hovered]);

  return (
    <group {...props} dispose={null}>
      {/* ☕ Mug */}
      <mesh
        ref={cornerRefs.mug}
        geometry={nodes["corners-mug"].geometry}
        material={cornersMaterial}
        position={[-0.275, 1.154, 1.788]}
        scale={0}
      />
      <mesh
        geometry={nodes["hit-box-mug"].geometry}
        material={hitBoxMaterial}
        position={[-0.275, 1.154, 1.788]}
        onPointerOver={() => {
          setHovered("mug");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(null);
          document.body.style.cursor = "auto";
        }}
      />

      {/* ⏰ Clock */}
      <mesh
        ref={cornerRefs.clock}
        geometry={nodes["corners-clock"].geometry}
        material={cornersMaterial}
        position={[-2.147, 2.36, -1.069]}
        scale={0}
      />
      <mesh
        geometry={nodes["hit-box-clock"].geometry}
        material={hitBoxMaterial}
        position={[-2.168, 2.36, -1.091]}
        onPointerOver={() => {
          setHovered("clock");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(null);
          document.body.style.cursor = "auto";
        }}
      />

      {/* 🖼️ Photos */}
      <mesh
        ref={cornerRefs.photos}
        geometry={nodes["corners-photos"].geometry}
        material={cornersMaterial}
        position={[-1.079, 2.111, -2.114]}
        scale={0}
      />
      <mesh
        geometry={nodes["hit-box-photos"].geometry}
        material={hitBoxMaterial}
        position={[-1.101, 2.111, -2.137]}
        onPointerOver={() => {
          setHovered("photos");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(null);
          document.body.style.cursor = "auto";
        }}
      />

      {/* 📚 Library */}
      <mesh
        ref={cornerRefs.library}
        geometry={nodes["corners-library"].geometry}
        material={cornersMaterial}
        position={[2.069, 2.043, -0.33]}
        scale={0}
        />
      <mesh
        name="Library"
        geometry={nodes["hit-box-library"].geometry}
        material={hitBoxMaterial}
        position={[2.259, 2.043, -0.52]}
        onPointerOver={() => {
          setHovered("library");
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(null);
          document.body.style.cursor = "auto";
        }}
      />

      {/* 🧭 Extra invisible helpers */}
      <mesh
        geometry={nodes.tps001.geometry}
        material={hitBoxMaterial}
        position={[-1.079, 2.111, -2.114]}
      />
      <mesh
        geometry={nodes.tps002.geometry}
        material={hitBoxMaterial}
        position={[2.073, 2.043, -0.334]}
      />
    </group>
  );
};

useGLTF.preload("/models/hit-boxes.glb");

export default HitBoxes;
