import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface PlaneProps {
  position: [number, number, number];
  planeDepth: number;
  planeWidth: number;
}

// Single plane component
const Plane: React.FC<PlaneProps> = ({ position, planeDepth, planeWidth }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const opacityRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#e0f2ff",
      emissive: "#c9e9ff",
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }, []);

  useEffect(() => {
    if (!meshRef.current || !meshRef.current.material) return;

    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    const targetColor = hovered ? "#e0f2ff" : "#c9e9ff";
    const targetColorObj = new THREE.Color(targetColor);

    gsap.to(material.emissive, {
      r: targetColorObj.r,
      g: targetColorObj.g,
      b: targetColorObj.b,
      duration: 0.15,
    });
  }, [hovered]);

  useFrame(() => {
    if (!meshRef.current || !meshRef.current.material) return;

    const targetOpacity = hovered ? 0.8 : 0;
    const lerpFactor = hovered ? 0.5 : 0.15;

    opacityRef.current = THREE.MathUtils.lerp(
      opacityRef.current,
      targetOpacity,
      lerpFactor
    );
    (meshRef.current.material as THREE.MeshStandardMaterial).opacity =
      opacityRef.current;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[-Math.PI / 2, 0, Math.PI / 4]}
      material={material}
      onPointerMove={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[planeDepth, planeWidth]} />
    </mesh>
  );
};

interface GridPlanesProps {
  position: [number, number, number];
  rows: number;
  columns: number;
  planeWidth: number;
  planeDepth: number;
}

// GridPlanes component
const GridPlanes = React.forwardRef<THREE.Group, GridPlanesProps>(
  ({ position, rows, columns, planeWidth, planeDepth }, ref) => {
    // Compute the effective step (diagonal) to account for rotation
    const rotatedStep = Math.sqrt(planeWidth ** 2 + planeDepth ** 2);

    // Center the grid around origin
    const startX = -((columns - 1) * rotatedStep) / 2;
    const startZ = -((rows - 1) * rotatedStep) / 2;

    const planes = [];

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const x = startX + column * rotatedStep;
        const z = startZ + row * rotatedStep;

        planes.push(
          <Plane
            key={`plane-${row}-${column}`}
            planeDepth={planeDepth}
            planeWidth={planeWidth}
            position={[x, 0, z]}
          />
        );
      }
    }

    const offsetX = rotatedStep / 2;
    const offsetZ = rotatedStep / 2;

    for (let row = 0; row < rows - 1; row++) {
      for (let column = 0; column < columns - 1; column++) {
        const x = startX + column * rotatedStep + offsetX;
        const z = startZ + row * rotatedStep + offsetZ;

        planes.push(
          <Plane
            key={`plane-offset-${row}-${column}`}
            planeDepth={planeDepth}
            planeWidth={planeWidth}
            position={[x, 0, z]}
          />
        );
      }
    }

    return (
      <group position={position} ref={ref}>
        {planes}
      </group>
    );
  }
);

GridPlanes.displayName = "GridPlanes";

export default GridPlanes;
