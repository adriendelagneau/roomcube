/*
Converted from gltfjsx output to baked-texture setup
Original command: npx gltfjsx@6.5.3 Room-3-4.glb
*/

import { useGLTF } from "@react-three/drei";
import React from "react";
import { Mesh, TextureLoader } from "three";

type GLTFResult = {
  nodes: { [key: string]: Mesh };
};

const Room3_4: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-4.glb") as unknown as GLTFResult;

  const bakedTexture = React.useMemo(() => {
    const texture = new TextureLoader().load("/textures/Room3-4.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* Clock */}
      <mesh geometry={nodes.Clock.geometry}>
        <meshBasicMaterial map={bakedTexture} />
        <mesh geometry={nodes.hours.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh geometry={nodes.minutes.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh geometry={nodes.secondes.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      </mesh>

      {/* Books */}
      {Array.from({ length: 13 }, (_, i) => {
        const id = i + 1;
        const node = nodes[`Book-${id}`];
        if (!node) return null;
        return (
          <mesh
            key={id}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        );
      })}

      {/* Planes */}
      {Object.entries(nodes)
        .filter(([name]) => name.startsWith("Plane"))
        .map(([name, node]: [string, Mesh]) => (
          <mesh key={name} geometry={node.geometry} rotation={node.rotation}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}

      {/* Object */}
      <mesh
        geometry={nodes.Object001.geometry}
        position={[0.955, 1.077, 1.732]}
        rotation={[0, -1.297, 0]}
        scale={1.285}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      {/* Papers */}
      {Object.entries(nodes)
        .filter(([name]) => name.startsWith("paper"))
        .map(([name, node]: [string, Mesh]) => (
          <mesh
            key={name}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}

      {/* Photos */}
      {Object.entries(nodes)
        .filter(([name]) => name.startsWith("photo") && !name.includes("frame"))
        .map(([name, node]: [string, Mesh]) => (
          <mesh
            key={name}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}

      {/* Photo Frames */}
      {Object.entries(nodes)
        .filter(([name]) => name.startsWith("photo_frame"))
        .map(([name, node]: [string, Mesh]) => (
          <mesh
            key={name}
            geometry={node.geometry}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
          >
            <meshBasicMaterial map={bakedTexture} />
          </mesh>
        ))}
    </group>
  );
};

useGLTF.preload("/models/Room-3-4.glb");

export default Room3_4;
