"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useMemo } from "react";
import { Mesh, TextureLoader } from "three";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  materials: { [name: string]: any };
};

const Room3_4_Baked: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-4.glb") as unknown as GLTFResult;

  // 🧱 Baked texture
  const bakedTexture = useMemo(() => {
    const tex = new TextureLoader().load("/textures/Room3-4.jpg");
    tex.flipY = false;
    return tex;
  }, []);

  const bakedMat = <meshBasicMaterial map={bakedTexture} />;

  // 🕒 Clock hands refs
  const hoursRef = useRef<Mesh>(null);
  const minutesRef = useRef<Mesh>(null);
  const secondsRef = useRef<Mesh>(null);

  // 🌀 Animate clock
  useFrame(() => {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;

    if (hoursRef.current)
      hoursRef.current.rotation.z = -((hours + minutes / 60) * (Math.PI / 6));
    if (minutesRef.current)
      minutesRef.current.rotation.z = -(
        (minutes + seconds / 60) *
        (Math.PI / 30)
      );
    if (secondsRef.current)
      secondsRef.current.rotation.z = -(seconds * (Math.PI / 30));
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object001.geometry}
        position={[-0.173, 1.158, 1.772]}
        rotation={[0, -1.41, 0]}
      >
        {bakedMat}
      </mesh>

      <group position={[-2.276, 2.329, -1.009]}>
        <mesh geometry={nodes.Clock.geometry}>{bakedMat}</mesh>
        <mesh ref={hoursRef} geometry={nodes.hours.geometry}>
          {bakedMat}
        </mesh>
        <mesh ref={minutesRef} geometry={nodes.minutes.geometry}>
          {bakedMat}
        </mesh>
        <mesh ref={secondsRef} geometry={nodes.secondes.geometry}>
          {bakedMat}
        </mesh>
      </group>

      {/* 📚 Books */}
      {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => {
        const name = `Book-${num}`;
        const node = nodes[name];
        return (
          node && (
            <mesh
              key={name}
              geometry={node.geometry}
              position={[0.205, 0, 0.136]}
            >
              {bakedMat}
            </mesh>
          )
        );
      })}

      {/* 🧱 Planes */}
      {Object.keys(nodes)
        .filter((k) => k.startsWith("Plane"))
        .map((key) => (
          <mesh
            key={key}
            geometry={nodes[key].geometry}
            position={[-0.386, 1.115, 1.85]}
          >
            {bakedMat}
          </mesh>
        ))}
    </group>
  );
};

useGLTF.preload("/models/Room-3-4.glb");

export default Room3_4_Baked;
