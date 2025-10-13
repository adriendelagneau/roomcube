import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import holographicVertexShader from '../../shaders/holographic/vertex.glsl'
import holographicFragmentShader from '../../shaders/holographic/fragment.glsl'
import random2DGlsl from '../../shaders/includes/random2D.glsl'

const finalVertexShader = holographicVertexShader.replace(
  '// #include random2D',
  random2DGlsl
)

export const HolographicMaterial = ({ color = '#70c1ff' }) => {
  const materialRef = useRef()

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={finalVertexShader}
      fragmentShader={holographicFragmentShader}
      uniforms={{
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
      }}
      transparent
      side={THREE.DoubleSide}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  )
}
