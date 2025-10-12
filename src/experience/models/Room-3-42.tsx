/*
Converted from gltfjsx output
Original command: npx gltfjsx@6.5.3 Room-3-4.glb
*/

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
      minutesRef.current.rotation.x = -(
        (minutes + seconds / 60) *
        (Math.PI / 30)
      );
    if (secondsRef.current)
      secondsRef.current.rotation.x = -(seconds * (Math.PI / 30));
  });

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
      {[
        "Plane051",
        "Plane050",
        "Plane049",
        "Plane048",
        "Plane047",
        "Plane046",
        "Plane045",
        "Plane044",
        "Plane043",
        "Plane042",
        "Plane041",
        "Plane040",
        "Plane039",
        "Plane038",
        "Plane037",
        "Plane036",
        "Plane035",
        "Plane034",
        "Plane033",
        "Plane032",
        "Plane031",
        "Plane030",
        "Plane029",
        "Plane028",
        "Plane027",
        "Plane026",
        "Plane025",
        "Plane024",
        "Plane023",
        "Plane022",
        "Plane021",
        "Plane020",
        "Plane019",
        "Plane018",
        "Plane017",
        "Plane016",
        "Plane015",
        "Plane014",
        "Plane013",
        "Plane012",
        "Plane011",
        "Plane010",
        "Plane009",
        "Plane008",
        "Plane007",
        "Plane006",
        "Plane005",
        "Plane003",
        "Plane002",
        "Plane001",
      ].map((name) => {
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

      {/* 📜 Papers */}
      {[
        "paper004",
        "paper005",
        "paper006",
        "paper007",
        "paper008",
        "paper009",
        "paper010",
        "paper011",
      ].map((name) => {
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

      {/* 📸 Photos */}
      {[
        "photo004",
        "photo005",
        "photo006",
        "photo007",
        "photo008",
        "photo009",
        "photo010",
        "photo011",
      ].map((name) => {
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

      {/* 🖼 Frames */}
      {[
        "photo_frame004",
        "photo_frame005",
        "photo_frame006",
        "photo_frame007",
        "photo_frame008",
        "photo_frame009",
        "photo_frame010",
        "photo_frame011",
      ].map((name) => {
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
