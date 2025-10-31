import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import Room_1_1 from "./models/Room-1-1";
import Room_1_2 from "./models/Room-1-2";
import Room_1_3 from "./models/Room-1-3";
import Room_1_4 from "./models/Room-1-4";

const Scene = ({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  // Animate scene rotation based on pointer position
  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = pointer.current.y * Math.PI * 0.01;
    const targetY = pointer.current.x * Math.PI * 0.02;

    rotationX.current = THREE.MathUtils.lerp(rotationX.current, targetX, 0.1);
    rotationY.current = THREE.MathUtils.lerp(rotationY.current, targetY, 0.1);

    groupRef.current.rotation.x = rotationX.current;
    groupRef.current.rotation.y = rotationY.current;
  });

  return (
    <Suspense fallback={null}>
      <group
        rotation={[Math.PI / 14, 0, 0]}
        position={[0, -4.6, 0]}
        scale={1.7}
      >
        <group ref={groupRef}>
          {/* Room */}
          <Room_1_1 />
          <Room_1_2 />
          <Room_1_3 />
          <Room_1_4 />
        </group>
      </group>
    </Suspense>
  );
};

export default Scene;
