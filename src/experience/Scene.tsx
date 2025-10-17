import { useFrame } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";

import useInput from "@/store/useInput";
import useInteractionStore from "@/store/useInteractionStore";

import GridPlanes from "./components/GridPlanes";
import HitBoxes_Baked from "./components/models/Hit-boxes";
import Room1 from "./components/models/Room-3-1";
import Room2 from "./components/models/Room-3-2";
import Room_3_3_Baked from "./components/models/Room-3-3";
import Room4 from "./components/models/Room-3-4";
import MorphParticles from "./components/morphing/Particles";
import Smoke from "./components/smoke/Smoke";

const Scene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!); // <-- typed as THREE.Group
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const { pointer } = useInput();
  const { clickedObject } = useInteractionStore();
  const gridPlanesRef = useRef(null);

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
          <Room1 />
          <Room2 />
          <Room_3_3_Baked />
          <Room4 />
          <HitBoxes_Baked />

          {/* Coffe Smoke */}
          <Smoke />

          {/* Particles */}
          <MorphParticles />

          {/* EffectComposer */}
          <EffectComposer enableNormalPass={false}>
            {/* <ToneMapping /> */}
            <Outline
              blur
              edgeStrength={5}
              visibleEdgeColor={new THREE.Color("white").getHex()}
              // hiddenEdgeColor={new THREE.Color("transparent").getHex()}
            />
          </EffectComposer>
        </group>
      </group>
    </Suspense>
  );
};

export default Scene;
