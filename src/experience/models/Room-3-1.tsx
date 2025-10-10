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

  const bakedMaterial = <meshBasicMaterial map={bakedTexture} />;

  return (
    <group {...props} dispose={null}>
      {/* 🛋️ Couch group */}
      <group
        position={[-1.555, 0.173, -1.18]}
        rotation={[0, 0.803, 0]}
        scale={1.051}
      >
        {["Backmulti", "Cushions", "Legs"].map((name) =>
          nodes[name] ? (
            <mesh key={name} geometry={nodes[name].geometry}>
              {bakedMaterial}
            </mesh>
          ) : null
        )}
      </group>

      {/* 💡 Floor Lamp group */}
      <group
        position={[-2.812, 0.212, -0.125]}
        rotation={[0, 0.813, 0]}
        scale={1.178}
      >
        {[
          "FloorLamp_Bulb001",
          "FloorLamp_Cover001",
          "FloorLamp_Stem001",
          "FloorLamp_Wire001",
          "FloroLamp_WirePlug001",
        ].map((name) =>
          nodes[name] ? (
            <mesh key={name} geometry={nodes[name].geometry}>
              {bakedMaterial}
            </mesh>
          ) : null
        )}
      </group>

      {/* 🧱 Main Room Elements */}
      {[
        "wall",
        "EU_wall_socket001",
        "Floor",
        "House_Plant_Dracaena_Lemon_Lime",
      ].map((name) =>
        nodes[name] ? (
          <mesh key={name} geometry={nodes[name].geometry}>
            {bakedMaterial}
          </mesh>
        ) : null
      )}

      {/* 🪟 Window */}
      {nodes.win_singleRectangleClosed && (
        <mesh
          geometry={nodes.win_singleRectangleClosed.geometry}
          position={[0.773, 1.683, -2.585]}
          rotation={[0, -0.782, 0]}
          scale={0.666}
        >
          {bakedMaterial}
        </mesh>
      )}
    </group>
  );
};

useGLTF.preload("/models/Room-3-1.glb");

export default Room3_1_Baked;
