/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useGLTF, shaderMaterial } from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import gsap from "gsap";
import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

import { useMorphStore } from "@/store/useMorphStore";

import particlesFragmentShader from "../../shaders/monkey/fragment.glsl";
import particlesVertexShader from "../../shaders/monkey/vertex.glsl";

type GLTFResult = {
  nodes: { [name: string]: THREE.Mesh };
};

// 1️⃣ Define the shader material
const MorphParticlesMaterial = shaderMaterial(
  {
    uSize: 0.04,
    uResolution: new THREE.Vector2(1, 1),
    uProgress: 0,
    uColorA: new THREE.Color("#ff7300"),
    uColorB: new THREE.Color("#0091ff"),
  },
  particlesVertexShader,
  particlesFragmentShader
);

extend({ MorphParticlesMaterial });

// 2️⃣ Stable random seed array (outside React render)
const RANDOM_SEEDS = Float32Array.from({ length: 100_000 }, () =>
  Math.random()
);

// 3️⃣ Component
const MorphParticles: React.FC = () => {
  const { nodes } = useGLTF(
    "/models/particles-models.glb"
  ) as unknown as GLTFResult;

  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<THREE.Float32BufferAttribute[]>([]);
  const currentIndex = useRef(0);

  const targetIndex = useMorphStore((state) => state.targetIndex);

  // Prepare geometry and positions (pure)
  const geometryData = useMemo(() => {
    const meshes = Object.values(nodes).filter(
      (n): n is THREE.Mesh =>
        (n as THREE.Mesh).isMesh && !!n.geometry?.attributes?.position
    );

    if (meshes.length < 2)
      throw new Error(
        "At least 2 meshes with position attributes are required for morphing"
      );

    const maxCount = Math.max(
      ...meshes.map(
        (m) => (m.geometry.attributes.position as THREE.BufferAttribute).count
      )
    );

    const positions: THREE.Float32BufferAttribute[] = meshes.map((m) => {
      const src = m.geometry.attributes.position as THREE.BufferAttribute;
      const newArray = new Float32Array(maxCount * 3);

      for (let i = 0; i < maxCount; i++) {
        const i3 = i * 3;
        if (i3 < src.array.length) {
          newArray[i3 + 0] = src.array[i3 + 0];
          newArray[i3 + 1] = src.array[i3 + 1];
          newArray[i3 + 2] = src.array[i3 + 2];
        } else {
          // use stable random seed
          const ri =
            Math.floor(src.count * RANDOM_SEEDS[i % RANDOM_SEEDS.length]) * 3;
          newArray[i3 + 0] = src.array[ri + 0];
          newArray[i3 + 1] = src.array[ri + 1];
          newArray[i3 + 2] = src.array[ri + 2];
        }
      }

      return new THREE.Float32BufferAttribute(newArray, 3);
    });

    const geo = new THREE.BufferGeometry();
    const sizes = Float32Array.from(
      { length: maxCount },
      (_, i) => RANDOM_SEEDS[i % RANDOM_SEEDS.length]
    );

    geo.setAttribute("position", positions[0]);
    geo.setAttribute("aPositionTarget", positions[1]);
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    return { geo, positions };
  }, [nodes]);

  // ✅ Assign ref AFTER render (safe)
  useEffect(() => {
    positionsRef.current = geometryData.positions;
  }, [geometryData.positions]);

  // Morph animation function
  const morph = (index: number) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry as THREE.BufferGeometry;

    geo.setAttribute("position", positionsRef.current[currentIndex.current]);
    geo.setAttribute("aPositionTarget", positionsRef.current[index]);

    gsap.fromTo(
      materialRef.current!.uniforms.uProgress,
      { value: 0 },
      { value: 1, duration: 3, ease: "linear" }
    );

    currentIndex.current = index;
  };

  // Listen for targetIndex changes from Zustand
  useEffect(() => {
    if (targetIndex !== currentIndex.current) {
      morph(targetIndex);
    }
  }, [targetIndex]);

  // Update resolution each frame
  useFrame(({ size, viewport }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(
        size.width * viewport.dpr,
        size.height * viewport.dpr
      );
    }
  });

  return (
    <points ref={meshRef} geometry={geometryData.geo} frustumCulled={false}>
      {/* @ts-ignore */}
      <morphParticlesMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

useGLTF.preload("/models/particles-models.glb");

export default MorphParticles;
