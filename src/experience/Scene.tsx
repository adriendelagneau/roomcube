import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

import useInteractionStore from "@/store/useInteractionStore";

import GridPlanes from "./components/GridPlanes";
import HitBoxes from "./components/models/Hit-boxes";
import Room_1_1 from "./components/models/Room-1-1";
import Room_1_2 from "./components/models/Room-1-2";
import Room_1_3 from "./components/models/Room-1-3";
import Room_1_4 from "./components/models/Room-1-4";

const Scene = ({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const gridPlanesRef = useRef(null);
  const { clickedObject } = useInteractionStore();

  useFrame(() => {
    if (!groupRef.current) return;
    if (!clickedObject) {
      const targetX = pointer.current.y * Math.PI * 0.01;
      const targetY = pointer.current.x * Math.PI * 0.02;

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
        position={[0, -4.6, 0]}
        scale={1.7}
      >
        <group ref={groupRef}>
          {/* GridPlanes */}
          <GridPlanes
            ref={gridPlanesRef}
            position={[-1, -1, -15]}
            rows={20}
            columns={20}
            planeWidth={2.5}
            planeDepth={2.5}
          />
          {/* Room */}
          <Room_1_1 />
          <Room_1_2 />
          <Room_1_3 />
          <Room_1_4 />
          {/* Hit-boxes */}
          <HitBoxes />
        </group>
      </group>
    </Suspense>
  );
};

export default Scene;
