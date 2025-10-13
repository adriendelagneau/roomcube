/*
Converted from gltfjsx output
Original command: npx gltfjsx@6.5.3 Room-3-1.glb
*/

import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import { TextureLoader, Mesh } from "three";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const Room3_1_Baked: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-1.glb") as unknown as GLTFResult;

  // 🧱 Load baked texture
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/Room3-1.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* 🛋 Sofa group */}
      <group
        position={[-2.289, -0.261, -1.731]}
        rotation={[0, 0.796, 0]}
        scale={1.578}
      >
        {["Backmulti", "Cushions", "Legs"].map(
          (name) =>
            nodes[name] && (
              <mesh key={name} geometry={nodes[name].geometry}>
                <meshBasicMaterial map={bakedTexture} />
              </mesh>
            )
        )}
      </group>

      {/* 💡 Floor lamp group */}
      <group
        position={[-4.178, -0.199, -0.16]}
        rotation={[0, 0.821, 0]}
        scale={1.769}
      >
        {[
          "FloorLamp_Bulb",
          "FloorLamp_Cover",
          "FloorLamp_Stem",
          "FloorLamp_Wire",
          "FloroLamp_WirePlug",
        ].map(
          (name) =>
            nodes[name] && (
              <mesh key={name} geometry={nodes[name].geometry}>
                <meshBasicMaterial map={bakedTexture} />
              </mesh>
            )
        )}
      </group>

      {/* 🧱 Wall */}
      {nodes.wall && (
        <mesh
          geometry={nodes.wall.geometry}
          position={[0.672, -0.52, 0.02]}
          rotation={[0, -0.788, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🌿 Plant */}
      {nodes.House_Plant_Dracaena_Lemon_Lime && (
        <mesh
          geometry={nodes.House_Plant_Dracaena_Lemon_Lime.geometry}
          position={[0.672, -0.52, 0.02]}
          rotation={[0, -0.788, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🪵 Floor */}
      {nodes.Floor && (
        <mesh
          geometry={nodes.Floor.geometry}
          position={[0.672, -0.52, 0.02]}
          rotation={[0, -0.788, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🔌 Wall socket */}
      {nodes.EU_wall_socket001 && (
        <mesh
          geometry={nodes.EU_wall_socket001.geometry}
          position={[-4.423, 0.118, -0.489]}
          rotation={[0, 0.008, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🪟 Window */}
      {nodes.win_singleRectangleClosed && (
        <mesh
          geometry={nodes.win_singleRectangleClosed.geometry}
          position={[1.222, 2.007, -3.816]}
          rotation={[0, -0.789, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}
    </group>
  );
};

useGLTF.preload("/models/Room-3-1.glb");

export default Room3_1_Baked;
