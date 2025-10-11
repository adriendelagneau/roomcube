"use client";

import React, { useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { Mesh, MeshBasicMaterial } from "three";
import { useFrame } from "@react-three/fiber";

type GLTFResult = {
  nodes: {
    Clock: Mesh;
    hours: Mesh;
    minutes: Mesh;
    secondes: Mesh;
  };
};

const Clock: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/clock.glb") as unknown as GLTFResult;

  // 🖼️ Load baked texture
  const bakedTexture = useTexture("/textures/clock.jpg");
  bakedTexture.flipY = false;

  // 🧱 Apply baked material
  const bakedMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        map: bakedTexture,
      }),
    [bakedTexture]
  );

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
      <mesh
        geometry={nodes.Clock.geometry}
        material={bakedMaterial}
        position={[-2.386, 2.339, -0.776]}
        rotation={[0, -0.723, 0]}
      >
        <mesh ref={hoursRef} geometry={nodes.hours.geometry} material={bakedMaterial} />
        <mesh ref={minutesRef} geometry={nodes.minutes.geometry} material={bakedMaterial} />
        <mesh ref={secondsRef} geometry={nodes.secondes.geometry} material={bakedMaterial} />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/clock.glb");

export default Clock;
