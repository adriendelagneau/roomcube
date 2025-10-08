import { useGLTF } from "@react-three/drei";
import React from "react";
import { Mesh, TextureLoader } from "three";

// --- Type definition for GLTF nodes ---
type GLTFResult = {
  nodes: {
    wall: Mesh;
    EU_wall_socket001: Mesh;
    Floor: Mesh;
    House_Plant_Dracaena_Lemon_Lime: Mesh;
    FloorLamp_Bulb: Mesh;
    FloorLamp_Cover: Mesh;
    FloorLamp_Stem: Mesh;
    FloorLamp_Wire: Mesh;
    FloroLamp_WirePlug: Mesh;
    Backmulti: Mesh;
    Cushions: Mesh;
    Legs: Mesh;
    win_singleRectangleClosed: Mesh;
  };
};

// --- Component ---
const Room3_1: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-1.glb") as unknown as GLTFResult;

  const bakedTexture = React.useMemo(() => {
    const texture = new TextureLoader().load("/textures/Room-3.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.wall.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh geometry={nodes.EU_wall_socket001.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh geometry={nodes.Floor.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
      <mesh geometry={nodes.House_Plant_Dracaena_Lemon_Lime.geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.FloorLamp_Bulb.geometry}
        position={[-2.362, 0.213, 2.21]}
        rotation={[-Math.PI, 1.549, -Math.PI]}
        scale={1.178}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.FloorLamp_Cover.geometry}
        position={[-2.362, 0.213, 2.21]}
        rotation={[-Math.PI, 1.549, -Math.PI]}
        scale={1.178}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.FloorLamp_Stem.geometry}
        position={[-2.362, 0.213, 2.21]}
        rotation={[-Math.PI, 1.549, -Math.PI]}
        scale={1.178}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.FloorLamp_Wire.geometry}
        position={[-2.362, 0.213, 2.21]}
        rotation={[-Math.PI, 1.549, -Math.PI]}
        scale={1.178}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.FloroLamp_WirePlug.geometry}
        position={[-2.362, 0.213, 2.21]}
        rotation={[-Math.PI, 1.549, -Math.PI]}
        scale={1.178}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.Backmulti.geometry}
        position={[-2.218, 0.173, 0.576]}
        rotation={[-Math.PI, 1.557, -Math.PI]}
        scale={1.051}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.Cushions.geometry}
        position={[-2.218, 0.173, 0.576]}
        rotation={[-Math.PI, 1.557, -Math.PI]}
        scale={1.051}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.Legs.geometry}
        position={[-2.218, 0.173, 0.576]}
        rotation={[-Math.PI, 1.557, -Math.PI]}
        scale={1.051}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={nodes.win_singleRectangleClosed.geometry}
        position={[-1.554, 1.683, -2.061]}
        rotation={[0, -0.001, 0]}
        scale={0.666}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/Room-3-1.glb");

export default Room3_1;
