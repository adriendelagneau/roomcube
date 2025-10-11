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
      <group position={[-1.518, 0.173, -1.241]} rotation={[0, 0.788, 0]} scale={1.051}>
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
      <group position={[-2.785, 0.214, -0.205]} rotation={[0, 0.812, 0]} scale={1.178}>
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
        <mesh geometry={nodes.wall.geometry} position={[0.444, 0, -0.058]} rotation={[0, -0.797, 0]}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🌿 Plant */}
      {nodes.House_Plant_Dracaena_Lemon_Lime && (
        <mesh
          geometry={nodes.House_Plant_Dracaena_Lemon_Lime.geometry}
          position={[0.444, 0, -0.058]}
          rotation={[0, -0.797, 0]}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🪵 Floor */}
      {nodes.Floor && (
        <mesh geometry={nodes.Floor.geometry} position={[0.444, 0, -0.058]} rotation={[0, -0.797, 0]}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🔌 Wall socket */}
      {nodes.EU_wall_socket001 && (
        <mesh geometry={nodes.EU_wall_socket001.geometry} position={[-2.946, 0.425, -0.425]}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🪟 Window */}
      {nodes.win_singleRectangleClosed && (
        <mesh
          geometry={nodes.win_singleRectangleClosed.geometry}
          position={[0.832, 1.683, -2.61]}
          rotation={[0, -0.797, 0]}
          scale={0.666}
        >
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}
    </group>
  );
};

useGLTF.preload("/models/Room-3-1.glb");

export default Room3_1_Baked;
