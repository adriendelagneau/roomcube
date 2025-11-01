"use client";

import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import { TextureLoader, Mesh, MeshStandardMaterial } from "three";

type GLTFResult = {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};

const Room_1_1: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-1-1.glb") as unknown as GLTFResult;

  // 🧱 Baked texture (memoized for performance)
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/room-1.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* 🛋 Sofa */}
      <group>
        {["Backmulti", "Cushions", "Legs"].map(
          (name) =>
            nodes[name] && (
              <mesh
                key={name}
                geometry={nodes[name].geometry}
                position={nodes[name].position}
              >
                <meshBasicMaterial map={bakedTexture} />
              </mesh>
            )
        )}
      </group>

      {/* 💡 Floor Lamp */}
      <group>
        {[
          "FloorLamp_Bulb",
          "FloorLamp_Cover",
          "FloorLamp_Stem",
          "FloorLamp_Wire",
          "FloroLamp_WirePlug",
        ].map(
          (name) =>
            nodes[name] && (
              <mesh
                key={name}
                geometry={nodes[name].geometry}
                position={nodes[name].position}
              >
                <meshBasicMaterial map={bakedTexture} />
              </mesh>
            )
        )}
      </group>

      {/* 🪴 Plant + Structure */}
      {["House_Plant_Dracaena_Lemon_Lime", "wall", "Floor"].map(
        (name) =>
          nodes[name] && (
            <mesh
              key={name}
              geometry={nodes[name].geometry}
              position={nodes[name].position}
            >
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 🔌 Wall Socket */}
      {nodes["EU_wall_socket001"] && (
        <mesh
          geometry={nodes["EU_wall_socket001"].geometry}
          position={nodes["EU_wall_socket001"].position}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🪟 Window */}
      {nodes["win_singleRectangleClosed"] && (
        <mesh
          geometry={nodes["win_singleRectangleClosed"].geometry}
          position={nodes["win_singleRectangleClosed"].position}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}
    </group>
  );
};

// 🔹 Preload model
useGLTF.preload("/models/room-1-1.glb");

export default Room_1_1;
