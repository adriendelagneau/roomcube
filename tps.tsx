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
      color: "#e6f7ff", // light bluish-white
      emissive: "#33bbff", // bright blue for bloom
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;

    // Animate emissive color on hover
    const targetEmissive = hovered ? "#88ddff" : "#33bbff";
    const targetColor = new THREE.Color(targetEmissive);

    gsap.to(material.emissive, {
      r: targetColor.r,
      g: targetColor.g,
      b: targetColor.b,
      duration: 0.2,
    });
  }, [hovered]);

  useFrame(() => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.MeshStandardMaterial;

    const targetOpacity = hovered ? 1.0 : 0.3;
    const lerpFactor = hovered ? 0.3 : 0.1;

    opacityRef.current = THREE.MathUtils.lerp(
      opacityRef.current,
      targetOpacity,
      lerpFactor
    );
    material.opacity = opacityRef.current;

    // Slightly pulse emissive intensity when hovered
    // material.emissiveIntensity = hovered
    //   ? 1.5 + Math.sin(performance.now() * 0.005) * 0.3
    //   : 0.8;
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
    const rotatedStep = Math.sqrt(planeWidth ** 2 + planeDepth ** 2);
    const startX = -((columns - 1) * rotatedStep) / 2;
    const startZ = -((rows - 1) * rotatedStep) / 2;
    const planes = [];

    // Main grid
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

    // Offset grid for diagonal overlay
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
