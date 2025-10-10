/*
Converted from gltfjsx output
Original command: npx gltfjsx@6.5.3 Room-3-2.glb
*/

import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import { TextureLoader, Mesh } from "three";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const Room3_2_Baked: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-2.glb") as unknown as GLTFResult;

  // 🧱 Load baked texture
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/Room3-2.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  const bakedMaterial = <meshBasicMaterial map={bakedTexture} />;

  return (
    <group {...props} dispose={null}>
      {/* 🐉 Dragon & nearby meshes */}
      {[
        "Dragon",
        "KALLRÖR_HANDLE_213MM002",
        "Cylinder001",
        "Cylinder",
        "Cube999",
        "Cube011",
        "Cube010",
        "Cube009",
        "Cube008",
        "Cube007",
        "Cube006",
        "Cube005",
        "Cube004",
        "Cube003",
        "Cube001",
        "KALLRÖR_HANDLE_213MM001",
      ].map((name) =>
        nodes[name] ? (
          <mesh key={name} geometry={nodes[name].geometry}>
            {bakedMaterial}
          </mesh>
        ) : null
      )}

      {/* ♟️ Chess pieces group */}
      {[
        "tower2001",
        "tower2",
        "tower001",
        "tower",
        "rook2001",
        "rook2",
        "rook001",
        "rook",
        "queen2",
        "queen",
        "pawn2007",
        "pawn2006",
        "pawn2005",
        "pawn2004",
        "pawn2003",
        "pawn2002",
        "pawn2001",
        "pawn2",
        "pawn007",
        "pawn006",
        "pawn005",
        "pawn004",
        "pawn003",
        "pawn002",
        "pawn001",
        "pawn",
        "knight2001",
        "knight2",
        "knight001",
        "knight",
        "king2",
        "king",
        "board",
      ].map((name) =>
        nodes[name] ? (
          <mesh key={name} geometry={nodes[name].geometry}>
            {bakedMaterial}
          </mesh>
        ) : null
      )}

      {/* 💠 Cube stack */}
      {[
        "Cube075",
        "Cube074",
        "Cube073",
        "Cube072",
        "Cube071",
        "Cube070",
        "Cube069",
        "Cube068",
        "Cube067",
      ].map((name) =>
        nodes[name] ? (
          <mesh key={name} geometry={nodes[name].geometry}>
            {bakedMaterial}
          </mesh>
        ) : null
      )}
    </group>
  );
};

useGLTF.preload("/models/Room-3-2.glb");

export default Room3_2_Baked;
