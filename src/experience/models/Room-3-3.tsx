"use client";

import { useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import React from "react";
import { MeshStandardMaterial } from "three";

type GLTFResult = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes: { [name: string]: any };
  materials: { [name: string]: MeshStandardMaterial };
};

const Room_3_3_Baked: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-3.glb") as unknown as GLTFResult;

  // 🎬 Video textures
  const pcVideo = useVideoTexture("/textures/matrix-rain.mp4");
  pcVideo.flipY = false;
  const laptopVideo = useVideoTexture("/textures/matrix-rain.mp4");
laptopVideo.flipY = false;
  // 🧱 Baked texture
  const bakedTexture = useTexture("/textures/Room3-3.jpg");
  // bakedTexture.encoding = sRGBEncoding;
  bakedTexture.flipY = false;

  return (
    <group {...props} dispose={null}>
      {/* 🖱 Mouse */}
      <group
        position={[1.004, 1.094, 0.724]}
        rotation={[0, 0.812, 0]}
        scale={1.028}
      >
        <mesh geometry={nodes.Mouse_final.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh geometry={nodes.wheel.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

      {/* 💻 Laptop */}
      <group
        position={[0.173, 1.091, 1.342]}
        rotation={[0, 1.113, 0]}
        scale={[1.388, 1.249, 1.388]}
      >
        {/* Laptop Screen (Video) */}
        <mesh geometry={nodes["laptop-screen"].geometry}>
          <meshBasicMaterial map={laptopVideo} toneMapped={false} />
        </mesh>

        {/* Laptop Frame (Baked) */}
        <mesh geometry={nodes.Plane.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

      {/* 🖥 PC Case */}
      <group
        position={[0.8, 0.22, 0.559]}
        rotation={[0, -0.943, 0]}
        scale={1.167}
      >
        {[
          "case",
          "case001",
          "caseinside",
          "fan",
          "fan001",
          "fan002",
          "fan003",
          "fan004",
          "Plane004",
        ].map((key) => (
          <mesh key={key} geometry={nodes[key].geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* 🪑 Chair */}
      <group
        position={[0.904, 0.223, 1.44]}
        rotation={[Math.PI, -1.149, Math.PI]}
        scale={1.167}
      >
        {[
          "Arm_Rests",
          "Crossbar",
          "Cushion_-Bottom",
          "Cushions_-_Back",
          "Frame",
          "Gas_Strut",
          "Legs&_Wheels#",
          "Legs&_Wheels#001",
          "Legs&_Wheels#002",
          "Legs&_Wheels#003",
          "Legs&_Wheels#004",
          "Supprt_-_V",
          "T_Joint",
        ].map((key) => (
          <mesh key={key} geometry={nodes[key].geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* 🖥 PC Monitor */}
      <group
        position={[0.561, 1.151, 0.749]}
        rotation={[0, 0.513, 0]}
        scale={1.261}
      >
        {/* Monitor Frame (Baked) */}
        <mesh geometry={nodes.Monitor.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        {/* Monitor Screen (Video) */}
        <mesh geometry={nodes["pc-screen"].geometry}>
          <meshBasicMaterial map={pcVideo} toneMapped={false} />
        </mesh>
      </group>

      {/* 🪵 Desk & Props */}
      <mesh
        geometry={nodes.Modern_Desk.geometry}
        position={[0.444, 0.015, -0.058]}
        rotation={[0, -0.797, 0]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.Desk_Lamp.geometry}
        position={[0.444, 0.015, -0.058]}
        rotation={[0, -0.797, 0]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.Circle_Rug.geometry}
        position={[0.444, 0.015, -0.058]}
        rotation={[0, -0.797, 0]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.Blender_keyboard.geometry}
        position={[0.444, 0.015, -0.058]}
        rotation={[0, -0.797, 0]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.Black_circle_round_carpet.geometry}
        position={[0.444, 0, -0.058]}
        rotation={[0, -0.797, 0]}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/Room-3-3.glb");

export default Room_3_3_Baked;
