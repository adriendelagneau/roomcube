"use client";

import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useCallback } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useInteractionStore from "@/store/useInteractionStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";

export default function CameraIntroTransition() {
  const camera = useThree((state) => state.camera);
  const { hasEntered, setHasIntroFinished } = useInteractionStore();
  const { isMobile, isTablet } = useResponsiveStore();

  // ✅ useCallback ensures stable function reference for useEffect
  const getTransformForDevice = useCallback(
    (name: string) => {
      const object = interactiveObjects.find((o) => o.name === name);
      if (!object) return null;

      if (isMobile && object.mobile) return object.mobile;
      if (isTablet && object.tablet) return object.tablet;
      return object.desktop; // fallback
    },
    [isMobile, isTablet]
  );

  useEffect(() => {
    if (!hasEntered) return;

    const to = getTransformForDevice("InitialView");
    if (!to) return;

    const toPos = new THREE.Vector3().fromArray(to.targetPosition);
    const toQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(...to.targetQuaternion)
    );

    const tl = gsap.timeline({
      defaults: { duration: 2, ease: "power3.inOut" },
      onComplete: () => setHasIntroFinished(true),
    });

    // Animate camera from current state → InitialView (responsive)
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
  }, [hasEntered, camera, getTransformForDevice, setHasIntroFinished]);

  return null;
}
