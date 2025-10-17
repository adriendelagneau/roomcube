import { useFrame, useLoader, useThree } from "@react-three/fiber";
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

  // 🔹 Animate smoke + make it follow the mug
  // Use useEffect for side effects

  useEffect(() => {
    const smoke = smokeRef.current;
    if (smoke) {
      // smoke.material.uniforms.uTime.value = clock.getElapsedTime();

      // Find mug in scene
      const mug = scene.getObjectByName("coffe-smoke");
      if (mug) {
        smoke.position.copy(mug.position);
        smoke.geometry.translate(0, 0.3, 0);
      }
    }
  }, [scene]);

  // Load texture
  const perlinTexture = useLoader(THREE.TextureLoader, "/noise/perlin.png");
  perlinTexture.wrapS = THREE.RepeatWrapping;
  perlinTexture.wrapT = THREE.RepeatWrapping;

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPerlinTexture: { value: perlinTexture },
    }),
    [perlinTexture]
  );


    // Animate smoke + follow mug
    useFrame(() => {
      if (smokeRef.current) {
        smokeRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
  
      
      }
    });

  // 💠 Glowing corners material
  // const cornersMaterial = useMemo(
  //   () =>
  //     new MeshBasicMaterial({
  //       color: "#5394fc",
  //       wireframe: true,
  //     }),
  //   []
  // );

  return (
    <mesh
      ref={smokeRef}
      position={[0, 0, 0]}
      scale={[0.09, 0.4, 0.5]}
      rotation-y={Math.PI/8}
      // material={cornersMaterial}
    >
      <planeGeometry args={[1, 1, 8, 64]} />

      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
