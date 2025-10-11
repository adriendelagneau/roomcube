/*
Converted from gltfjsx output
Original command: npx gltfjsx@6.5.3 Room-3-3.glb
*/

import { useGLTF, useVideoTexture } from "@react-three/drei";
import React, { useMemo } from "react";
import { TextureLoader, Mesh } from "three";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const Room3_3_Baked: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-3.glb") as unknown as GLTFResult;

  // 🧱 Load baked texture
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/Room3-3.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  const bakedMaterial = <meshBasicMaterial map={bakedTexture} />;

  // 🎬 Use Drei’s useVideoTexture for dynamic screen content
  const videoTexture = useVideoTexture("/textures/matrix-rain.mp4");
  videoTexture.flipY = false; // Correct orientation
  const videoMaterial = (
    <meshBasicMaterial map={videoTexture} toneMapped={false} />
  );

  return (
    <group {...props} dispose={null}>
      {/* 💻 Laptop */}
      <group
        position={[0.175, 1.077, 1.377]}
        rotation={[0, 1.128, 0]}
        scale={[1.388, 1.249, 1.388]}
      >
        {nodes["laptop-screen"] && (
          <mesh
            geometry={nodes["laptop-screen"].geometry}
            position={[0, 0.03, 0]}
          >
            {/* {videoMaterial} */}
          </mesh>
        )}
        {nodes["Plane"] && (
          <mesh geometry={nodes["Plane"].geometry} position={[0, 0.03, 0]}>
            {bakedMaterial}
          </mesh>
        )}
      </group>

      {/* 🖥️ PC Monitor */}
      <group
        position={[0.554, 1.136, 0.778]}
        rotation={[0, 0.528, 0]}
        scale={1.261}
      >
        {nodes["Monitor"] && (
          <mesh geometry={nodes["Monitor"].geometry} position={[0, -0.02, 0]}>
            {bakedMaterial}
          </mesh>
        )}
        {nodes["pc-screen"] && (
          <mesh geometry={nodes["pc-screen"].geometry} position={[0, -0.02, 0]}>
            {/* {videoMaterial} */}
          </mesh>
        )}
      </group>

      {/* 🖱️ Mouse */}
      <group
        position={[0.996, 1.079, 0.746]}
        rotation={[0, 0.828, 0]}
        scale={1.028}
      >
        {["Mouse_final", "wheel"].map((name) =>
          nodes[name] ? (
            <mesh
              key={name}
              geometry={nodes[name].geometry}
              position={[0, name === "wheel" ? 0.039 : 0.036, 0]}
            >
              {bakedMaterial}
            </mesh>
          ) : null
        )}
      </group>

      {/* 🪑 Chair */}
      <group
        position={[0.907, 0.237, 1.463]}
        rotation={[Math.PI, -1.164, Math.PI]}
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
        ].map((name) =>
          nodes[name] ? (
            <mesh key={name} geometry={nodes[name].geometry}>
              {bakedMaterial}
            </mesh>
          ) : null
        )}
      </group>

      {/* 🧰 PC Case */}
      <group
        position={[0.791, 0.238, 0.584]}
        rotation={[0, -0.928, 0]}
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
        ].map((name) =>
          nodes[name] ? (
            <mesh key={name} geometry={nodes[name].geometry}>
              {bakedMaterial}
            </mesh>
          ) : null
        )}
      </group>

      {/* 🪞 Desk, Lamp, Rug, Keyboard */}
      {[
        "Modern_Desk",
        "Desk_Lamp",
        "Black_circle_round_carpet",
        "Circle_Rug",
        "Blender_keyboard",
      ].map((name) =>
        nodes[name] ? (
          <mesh
            key={name}
            geometry={nodes[name].geometry}
            position={
              name === "Desk_Lamp"
                ? [0.518, -0.059, 0.184]
                : name === "Black_circle_round_carpet"
                  ? [0.039, 0, -0.298]
                  : [0, 0.036, 0]
            }
            rotation={name === "Desk_Lamp" ? [0, -0.316, 0] : undefined}
            scale={
              name === "Desk_Lamp"
                ? 1.093
                : name === "Black_circle_round_carpet"
                  ? 1.089
                  : undefined
            }
          >
            {bakedMaterial}
          </mesh>
        ) : null
      )}
    </group>
  );
};

useGLTF.preload("/models/Room-3-3.glb");

export default Room3_3_Baked;
