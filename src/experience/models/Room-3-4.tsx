/*
Converted from gltfjsx output
Original command: npx gltfjsx@6.5.3 Room-3-4.glb
*/

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { TextureLoader, Mesh } from "three";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const Room3_4_Baked: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/Room-3-4.glb") as unknown as GLTFResult;

  // 🧱 Load baked texture
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/Room3-4.jpg");
    texture.flipY = false;
    return texture;
  }, []);

      // 🕒 Clock hands refs
      const hoursRef = useRef<Mesh>(null);
      const minutesRef = useRef<Mesh>(null);
      const secondsRef = useRef<Mesh>(null);
    
      // 🌀 Animate clock
      useFrame(() => {
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    
        if (hoursRef.current)
          hoursRef.current.rotation.x = -((hours + minutes / 60) * (Math.PI / 6));
        if (minutesRef.current)
          minutesRef.current.rotation.x = -(
            (minutes + seconds / 60) *
            (Math.PI / 30)
          );
        if (secondsRef.current)
          secondsRef.current.rotation.x = -(seconds * (Math.PI / 30));
      });
    

  return (
    <group {...props} dispose={null}>
      {/* 🕰 Clock group */}
      {nodes.Clock && (
        <mesh
          geometry={nodes.Clock.geometry}
          position={[-2.283, 2.418, -1.072]}
          rotation={[0, -0.787, 0]}
          scale={0.93}
        >
          <meshBasicMaterial map={bakedTexture} />

          {/* 🕓 Clock hands */}
          {nodes.hours && (
            <mesh ref={hoursRef} geometry={nodes.hours.geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )}
          {nodes.minutes && (
            <mesh ref={minutesRef} geometry={nodes.minutes.geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )}
          {nodes.secondes && (
            <mesh ref={secondsRef} geometry={nodes.secondes.geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )}
        </mesh>
      )}
    </group>
  );
};

useGLTF.preload("/models/Room-3-4.glb");

export default Room3_4_Baked;

