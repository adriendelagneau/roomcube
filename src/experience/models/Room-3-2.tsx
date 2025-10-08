import { useGLTF } from "@react-three/drei";
import React from "react";
import { Mesh, TextureLoader } from "three";

// --- Type definition for GLTF nodes ---
type GLTFResult = {
  nodes: {
    [key: string]: Mesh;
  };
};

// --- Component ---
const Room3_2: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-2.glb") as unknown as GLTFResult;

  // --- Baked texture ---
  const bakedTexture = React.useMemo(() => {
    const texture = new TextureLoader().load("/textures/Room3-2.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  return (
    <group {...props} dispose={null}>
      {[
        "Dragon",
        "Suzanne",
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
        "Cube067",
        "Cube068",
        "Cube069",
        "Cube070",
        "Cube071",
        "Cube072",
        "Cube073",
        "Cube074",
        "Cube075",
      ].map((name) => (
        <mesh key={name} geometry={nodes[name]?.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      ))}
    </group>
  );
};

useGLTF.preload("/models/Room-3-2.glb");

export default Room3_2;
