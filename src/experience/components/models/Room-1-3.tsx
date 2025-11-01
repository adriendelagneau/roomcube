"use client";

import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import { MeshStandardMaterial, TextureLoader, VideoTexture } from "three";
import * as THREE from "three";

type GLTFResult = {
  nodes: { [name: string]: THREE.Mesh };
  materials: { [name: string]: MeshStandardMaterial };
};

const Room_1_3: React.FC<React.ComponentProps<"group">> = (props) => {
  const { nodes } = useGLTF("/models/room-1-3.glb") as unknown as GLTFResult;

  // 🧱 Baked texture
  const bakedTexture = useMemo(() => {
    const texture = new TextureLoader().load("/textures/room-3.jpg");
    texture.flipY = false;
    return texture;
  }, []);

  // 🖥 Video texture for PC screen
  const pcVideo = useMemo(() => {
    const video = document.createElement("video");
    video.src = "/textures/matrix-rain.mp4";
    video.loop = true;
    video.muted = true;
    video.play();
    const tex = new VideoTexture(video);
    tex.flipY = false;
    return tex;
  }, []);

  // 💻 Video texture for laptop screen
  const laptopVideo = useMemo(() => {
    const video = document.createElement("video");
    video.src = "/textures/matrix-rain.mp4";
    video.loop = true;
    video.muted = true;
    video.play();
    const tex = new VideoTexture(video);
    tex.flipY = false;
    return tex;
  }, []);

  return (
    <group {...props} dispose={null}>
      {/* 🖱 Mouse + Wheel */}
      {["Mouse_final", "wheel"].map(
        (name) =>
          nodes[name] && (
            <mesh key={name} geometry={nodes[name].geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 💻 Laptop */}
      {nodes["laptop-screen"] && (
        <mesh geometry={nodes["laptop-screen"].geometry}>
          <meshBasicMaterial
            map={laptopVideo}
            toneMapped={false}
            color="#777"
          />
        </mesh>
      )}
      {nodes.Plane && (
        <mesh geometry={nodes.Plane.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🖥 PC + Fans */}
      {[
        "case",
        "case001",
        "caseinside",
        "fan",
        "fan001",
        "fan002",
        "fan003",
        "fan004",
        "Plane004",
      ].map(
        (name) =>
          nodes[name] && (
            <mesh key={name} geometry={nodes[name].geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 🪑 Chair */}
      {[
        "Arm_Rests",
        "Crossbar",
        "Cushion_-Bottom",
        "Cushions_-_Back",
        "Frame",
        "Gas_Strut",
        "Legs&_Wheels#",
        "Legs&_Wheels#001",
        "Legs&_Wheels#002",
        "Legs&_Wheels#003",
        "Legs&_Wheels#004",
        "Supprt_-_V",
        "T_Joint",
      ].map(
        (name) =>
          nodes[name] && (
            <mesh key={name} geometry={nodes[name].geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}

      {/* 🖥 Monitor */}
      {nodes.Monitor && (
        <mesh geometry={nodes.Monitor.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}
      {nodes["pc-screen"] && (
        <mesh geometry={nodes["pc-screen"].geometry}>
          <meshBasicMaterial map={pcVideo} toneMapped={false} color="#777" />
        </mesh>
      )}

      {/* 🪵 Desk */}
      {nodes.Modern_Desk && (
        <mesh geometry={nodes.Modern_Desk.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 💡 Desk Lamp */}
      {nodes.Desk_Lamp && (
        <mesh geometry={nodes.Desk_Lamp.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
      )}

      {/* 🌀 Carpet & Keyboard */}
      {["Circle_Rug", "Blender_keyboard", "Black_circle_round_carpet"].map(
        (name) =>
          nodes[name] && (
            <mesh key={name} geometry={nodes[name].geometry}>
              <meshBasicMaterial map={bakedTexture} />
            </mesh>
          )
      )}
    </group>
  );
};

useGLTF.preload("/models/room-1-3.glb");

export default Room_1_3;
