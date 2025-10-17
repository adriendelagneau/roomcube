/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useGLTF, shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { extend } from "@react-three/fiber";
import gsap from "gsap";
import GUI from "lil-gui";
import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

import particlesFragmentShader from "../../shaders/particles/fragment.glsl";
import particlesVertexShader from "../../shaders/particles/vertex.glsl";

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

// 2️⃣ Component
const MorphParticles: React.FC = () => {
  const { nodes } = useGLTF("/models/particles-models.glb") as unknown as GLTFResult;
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<THREE.Float32BufferAttribute[]>([]);

  // Prepare geometry
  const geometry = useMemo(() => {
    const meshes = Object.values(nodes).filter(
      (n): n is THREE.Mesh =>
        (n as THREE.Mesh).isMesh && !!n.geometry?.attributes?.position
    );

    if (meshes.length < 2)
      throw new Error(
        "At least 2 meshes with position attributes required for morphing"
      );

    // Find max vertex count
    const maxCount = Math.max(
      ...meshes.map(
        (m) => (m.geometry.attributes.position as THREE.BufferAttribute).count
      )
    );

    // Generate equal-length position arrays
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
          const ri = Math.floor(src.count * Math.random()) * 3;
          newArray[i3 + 0] = src.array[ri + 0];
          newArray[i3 + 1] = src.array[ri + 1];
          newArray[i3 + 2] = src.array[ri + 2];
        }
      }

      return new THREE.Float32BufferAttribute(newArray, 3);
    });

    positionsRef.current = positions;

    const geo = new THREE.BufferGeometry();
    const sizes = new Float32Array(maxCount).map(() => Math.random());

    geo.setAttribute("position", positions[0]);
    geo.setAttribute("aPositionTarget", positions[1]);
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    return geo;
  }, [nodes]);

  // GUI controls & morph methods
  useEffect(() => {
    if (!materialRef.current || !positionsRef.current.length) return;

    const gui = new GUI({ width: 340 });
    const params = {
      colorA: "#ff7300",
      colorB: "#0091ff",
      progress: 0,
    };

    gui.addColor(params, "colorA").onChange((v: string) => {
      materialRef.current?.uniforms.uColorA.value.set(v);
    });
    gui.addColor(params, "colorB").onChange((v: string) => {
      materialRef.current?.uniforms.uColorB.value.set(v);
    });
    gui.add(params, "progress", 0, 1, 0.001).onChange((v: string) => {
      if (materialRef.current) materialRef.current.uniforms.uProgress.value = v;
    });

    const morph = (index: number) => {
      if (!meshRef.current) return;
      const geo = meshRef.current.geometry as THREE.BufferGeometry;
      geo.setAttribute("position", positionsRef.current[0]);
      geo.setAttribute("aPositionTarget", positionsRef.current[index]);
      gsap.fromTo(
        materialRef.current!.uniforms.uProgress,
        { value: 0 },
        { value: 1, duration: 3, ease: "linear" }
      );
    };

    gui.add({ morph0: () => morph(0) }, "morph0");
    gui.add({ morph1: () => morph(1) }, "morph1");
    if (positionsRef.current[2]) gui.add({ morph2: () => morph(2) }, "morph2");
    if (positionsRef.current[3]) gui.add({ morph3: () => morph(3) }, "morph3");

    return () => gui.destroy();
  }, []);

  // Update resolution
  useFrame(({ size, viewport }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(
        size.width * viewport.dpr,
        size.height * viewport.dpr
      );
    }
  });

  return (
    <points ref={meshRef} geometry={geometry} frustumCulled={false}>
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

useGLTF.preload("/models/models.glb");
export default MorphParticles;
