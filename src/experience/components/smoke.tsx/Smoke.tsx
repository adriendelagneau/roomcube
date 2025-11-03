import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import fragmentShader from "@/experience/shaders/coffeeSmoke/fragment.glsl";
import vertexShader from "@/experience/shaders/coffeeSmoke/vertex.glsl";

export default function Smoke() {
  // 🔹 Reference to the smoke mesh
  const smokeRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null);

  // 🔹 Get scene and clock from R3F
  const { scene, clock } = useThree();

  // 🔹 Load and configure Perlin noise texture safely (no immutability violation)
  const perlinTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load("/noise/perlin.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  // 🔹 Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPerlinTexture: { value: perlinTexture },
    }),
    [perlinTexture]
  );

  // 🔹 Keep smoke following the mug
  useEffect(() => {
    const smoke = smokeRef.current;
    if (!smoke) return;

    // Find mug in scene
    const mug = scene.getObjectByName("coffe-smoke");
    if (mug) {
      // Position smoke slightly above mug
      smoke.position.copy(mug.position);
      smoke.position.y += 0.2;
    }
  }, [scene]);

  // 🔹 Animate smoke time uniform
  useFrame(() => {
    const smoke = smokeRef.current;
    if (smoke) {
      smoke.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  // 🔹 Render smoke plane
  return (
    <mesh ref={smokeRef} scale={[0.13, 0.4, 0.5]} rotation-y={Math.PI / 16}>
      <planeGeometry args={[1, 1, 8, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
        wireframe
      />
    </mesh>
  );
}
