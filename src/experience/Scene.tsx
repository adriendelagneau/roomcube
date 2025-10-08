import { useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";

import useInput from "@/store/useInput";
import useInteractionStore from "@/store/useInteractionStore";

import Room1 from "./models/Room-3-1";
import Room2 from "./models/Room-3-2";
import Room3 from "./models/Room-3-3";
import Room4 from "./models/Room-3-4";

const Scene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!); // <-- typed as THREE.Group
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const { pointer } = useInput();
  const { clickedObject } = useInteractionStore();

  // Scene rotation
  useFrame(() => {
    if (!groupRef.current) return;

    if (!clickedObject) {
      const targetX = pointer.y * Math.PI * 0.01;
      const targetY = pointer.x * Math.PI * 0.02;

      rotationX.current = THREE.MathUtils.lerp(rotationX.current, targetX, 0.1);
      rotationY.current = THREE.MathUtils.lerp(rotationY.current, targetY, 0.1);

      groupRef.current.rotation.x = rotationX.current;
      groupRef.current.rotation.y = rotationY.current;
    }
  });

  return (
    <Suspense fallback={null}>
      <group
        rotation={[Math.PI / 14, 0, 0]}
        position={[0, -2.8, 0]}
        scale={1.7}
      >
        <group ref={groupRef}>
          <Room1 />
          <Room2 />
          <Room3 />
          <Room4 />
        </group>
      </group>
    </Suspense>
  );
};

export default Scene;
