"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import React, { useMemo } from "react";
import { Mesh, MeshBasicMaterial } from "three";

import { HolographicMaterial } from "./HolographicMaterial";

type GLTFResult = {
  nodes: { [name: string]: Mesh };
};

const SuzanneBaked: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/suzanne.glb") as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Suzanne.geometry}>
        <HolographicMaterial />
      </mesh>
    </group>
  );
};

useGLTF.preload("/models/suzanne.glb");

export default SuzanneBaked;
