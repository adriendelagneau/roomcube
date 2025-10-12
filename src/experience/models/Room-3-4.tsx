import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { TextureLoader, Mesh } from "three";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const Room3_4_Baked: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-4.glb") as unknown as GLTFResult;

  // 🧱 Baked texture
  const bakedTexture = useMemo(() => {
    const tex = new TextureLoader().load("/textures/Room3-4.jpg");
    tex.flipY = false;
    return tex;
  }, []);

  // 🕒 Clock hands refs
  const hoursRef = useRef<Mesh>(null);
  const minutesRef = useRef<Mesh>(null);
  const secondsRef = useRef<Mesh>(null);

  // 🌀 Animate clock hands
  useFrame(() => {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;

    if (hoursRef.current)
      hoursRef.current.rotation.x = -((hours + minutes / 60) * (Math.PI / 6));
    if (minutesRef.current)
      minutesRef.current.rotation.x =
        -((minutes + seconds / 60) * (Math.PI / 30));
    if (secondsRef.current)
      secondsRef.current.rotation.x = -(seconds * (Math.PI / 30));
  });

  // 🖼 Plane list from your original model
  const planes = Array.from({ length: 51 }, (_, i) => `Plane${String(i + 1).padStart(3, "0")}`);

  // 🖼 Photos
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
      <mesh
        geometry={nodes.Clock.geometry}
        position={[-2.283, 2.418, -1.072]}
        rotation={[0, -0.787, 0]}
        scale={0.93}
      >
        <meshBasicMaterial map={bakedTexture} />
        <mesh ref={hoursRef} geometry={nodes.hours.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh ref={minutesRef} geometry={nodes.minutes.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh ref={secondsRef} geometry={nodes.secondes.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </mesh>

      {/* 🖼 Planes */}
      {planes.map((name) => {
        const node = nodes[name];
        if (!node) return null;
        return (
          <mesh
            key={name}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        );
      })}

      {/* 📸 Photos */}
      {photos.map((name) => {
        const node = nodes[name];
        if (!node) return null;
        return (
          <mesh
            name={name}
            key={name}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        );
      })}

      {/* 🐱 Schrodinger */}
      <mesh
        geometry={nodes.schrodinger.geometry}
        position={[-0.127, 1.091, 1.836]}
        rotation={[Math.PI, -1.048, Math.PI]}
        scale={1.285}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/Room-3-4.glb");

export default Room3_4_Baked;
