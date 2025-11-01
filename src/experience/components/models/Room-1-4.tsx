"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

type GLTFResult = {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: THREE.MeshStandardMaterial };
};

const Room_1_4: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-1-4.glb") as unknown as GLTFResult;

  // 🧱 Baked texture
  const bakedTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load("/textures/room-4.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  // 🕒 Clock refs
  const hoursRef = useRef<THREE.Mesh>(null);
  const minutesRef = useRef<THREE.Mesh>(null);
  const secondsRef = useRef<THREE.Mesh>(null);

  // ⏱ Clock animation
  useFrame(() => {
    const date = new Date();
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds() + date.getMilliseconds() / 1000;

    if (hoursRef.current)
      hoursRef.current.rotation.x = -((hours + minutes / 60) * (Math.PI / 6));
    if (minutesRef.current)
      minutesRef.current.rotation.x = -(
        (minutes + seconds / 60) *
        (Math.PI / 30)
      );
    if (secondsRef.current)
      secondsRef.current.rotation.x = -(seconds * (Math.PI / 30));
  });

  // 🖼 Photo frame list
  const photos = [
    "photo-1",
    "photo-2",
    "photo-3",
    "photo-4",
    "photo-5",
    "photo-6",
    "photo-7",
    "photo-8",
  ];

  return (
    <group {...props} dispose={null}>
      {/* 🕰 Clock */}
      {nodes.Clock && (
        <group
          position={[-3.966, 3.98, -1.421]}
          rotation={[0, -0.77, 0]}
          scale={1.224}
        >
          <mesh geometry={nodes.Clock.geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
          {nodes.hours && (
            <mesh ref={hoursRef} geometry={nodes.hours.geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )}
          {nodes.minutes && (
            <mesh ref={minutesRef} geometry={nodes.minutes.geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )}
          {nodes.secondes && (
            <mesh ref={secondsRef} geometry={nodes.secondes.geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )}
        </group>
      )}

      {/* ☕ Schrödinger Mug */}
      {nodes.schrodinger && (
        <mesh
          geometry={nodes.schrodinger.geometry}
          position={[-0.299, 1.898, 2.997]}
          rotation={[0, -0.469, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🪞 Table or plane prop */}
      {nodes.Plane040 && (
        <mesh
          geometry={nodes.Plane040.geometry}
          position={[-0.588, 1.834, 2.989]}
          scale={1.201}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🖼 Photos on wall */}
      {photos.map((name) => {
        const node = nodes[name];
        if (!node) return null;
        return (
          <mesh
            key={name}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        );
      })}
    </group>
  );
};

// 🔹 Preload model
useGLTF.preload("/models/room-1-4.glb");

export default Room_1_4;
