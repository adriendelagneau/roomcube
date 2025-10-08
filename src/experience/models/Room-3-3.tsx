/*
Converted from gltfjsx output to baked-texture setup
Original command: npx gltfjsx@6.5.3 Room-3-3.glb
*/

import { useGLTF } from "@react-three/drei";
import React from "react";
import { Mesh, TextureLoader } from "three";

// --- Type definition for GLTF nodes ---
type GLTFResult = {
  nodes: { [key: string]: Mesh };
};

// --- Component ---
const Room3_3: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-3.glb") as unknown as GLTFResult;

  const bakedTexture = React.useMemo(() => {
    const texture = new TextureLoader().load("/textures/Room3-3.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* Laptop */}
      <group
        position={[0.811, 1.077, 1.173]}
        rotation={[-Math.PI, 1.232, -Math.PI]}
        scale={[1.388, 1.249, 1.388]}
      >
        <mesh geometry={nodes["laptop-screen"].geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh geometry={nodes.Plane.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

      {/* PC Monitor */}
      <group
        position={[0.659, 1.136, 0.481]}
        rotation={[0, 1.31, 0]}
        scale={1.261}
      >
        <mesh geometry={nodes.Monitor.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh geometry={nodes["pc-screen"].geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

      {/* Mouse */}
      <group
        position={[0.95, 1.079, 0.147]}
        rotation={[-Math.PI, 1.533, -Math.PI]}
        scale={1.028}
      >
        <mesh geometry={nodes.Mouse_final.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh geometry={nodes.wheel.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

      {/* Chair */}
      <group
        position={[1.392, 0.223, 0.719]}
        rotation={[0, -1.196, 0]}
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
        ].map((name) => (
          <mesh key={name} geometry={nodes[name].geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* PC Case */}
      <group
        position={[0.69, 0.22, 0.176]}
        rotation={[0, -0.146, 0]}
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
        ].map((name) => (
          <mesh key={name} geometry={nodes[name].geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
      </group>

      {/* Network */}
      <group
        position={[0.724, 0.215, 1.724]}
        rotation={[-Math.PI, 0.723, -Math.PI]}
        scale={1.71}
      >
        <mesh
          geometry={nodes.NET.geometry}
          position={[-0.097, -0.013, -0.116]}
          scale={0.106}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </group>

      {/* Desk + Decor */}
      <mesh geometry={nodes.Modern_Desk.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh geometry={nodes.Desk_Lamp.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh geometry={nodes.Black_circle_round_carpet.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh geometry={nodes.Circle_Rug.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh geometry={nodes.Blender_keyboard.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/Room-3-3.glb");

export default Room3_3;
