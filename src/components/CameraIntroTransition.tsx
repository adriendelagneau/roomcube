"use client";

import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useInteractionStore from "@/store/useInteractionStore";

export default function CameraIntroTransition() {
  const camera = useThree((state) => state.camera);
  const { hasEntered, setHasIntroFinished } = useInteractionStore();

  useEffect(() => {
    if (!hasEntered) return;
    const to = interactiveObjects.find((o) => o.name == "InitialView");
    if (!to) return;
    console.log("return");

    const toPos = new THREE.Vector3().fromArray(to.targetPosition);
    const toQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...to.targetQuaternion)
    );

    const tl = gsap.timeline({
      defaults: { duration: 2, ease: "power3.inOut" },
      onComplete: () => setHasIntroFinished(true),
    });

    // 🎬 Animate only to InitialView — starting from the camera’s current state
    tl.to(camera.position, {
      x: toPos.x,
      y: toPos.y,
      z: toPos.z,
    })
      .to(
        camera.quaternion,
        {
          x: toQuat.x,
          y: toQuat.y,
          z: toQuat.z,
          w: toQuat.w,
        },
        "<"
      )
      .to(
        camera,
        {
          zoom: to.zoom,
          onUpdate: () => camera.updateProjectionMatrix(),
        },
        "<"
      );
  }, [hasEntered, camera, setHasIntroFinished]);

  return null;
}
