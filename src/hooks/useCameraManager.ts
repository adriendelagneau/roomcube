"use client";

import gsap from "gsap";
import { useEffect, useCallback } from "react";
import * as THREE from "three";

import { introSettings, interactiveObjects } from "@/data/interactiveObjects";
import useCamera from "@/store/useCamera";
import useInteractionStore from "@/store/useInteractionStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";

const useCameraManager = ({
  camera,
}: {
  camera: React.RefObject<THREE.OrthographicCamera | null>;
}) => {
  const { clickedObject, isEntered } = useInteractionStore();
  const { setCameraTarget, targetPosition, targetQuaternion, zoom } =
    useCamera();
  const { isMobile, isTablet } = useResponsiveStore();

  /**
   * ✅ Get transform configuration by object name and device type
   * - Checks `interactiveObjects` first
   * - Falls back to `introSettings`
   * - Prioritizes device-specific config (mobile > tablet > desktop)
   */
  const getTransformForDevice = useCallback(
    (objectName: string) => {
      const source =
        interactiveObjects.find((obj) => obj.name === objectName) ??
        introSettings.find((obj) => obj.name === objectName);

      if (!source) return null;

      if (isMobile && source.mobile) return source.mobile;
      if (isTablet && source.tablet) return source.tablet;
      return source.desktop ?? null;
    },
    [isMobile, isTablet]
  );

  /**
   * ✅ Update camera target whenever interaction or device state changes
   */
  useEffect(() => {
    let targetConfig = null;

    if (isEntered) {
      targetConfig = getTransformForDevice("InitialView");

      if (clickedObject) {
        const clickedConfig = getTransformForDevice(clickedObject);
        if (clickedConfig) targetConfig = clickedConfig;
      }
    } else {
      targetConfig = getTransformForDevice("IntroView");
    }

    if (targetConfig) {
      const { targetPosition, targetRotation, zoom } = targetConfig;

      const position = new THREE.Vector3().fromArray(targetPosition);
      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(...targetRotation)
      );

      setCameraTarget(position, quaternion, zoom);
    }
  }, [
    clickedObject,
    isEntered,
    getTransformForDevice,
    setCameraTarget,
    isMobile,
    isTablet,
  ]);

  /**
   * ✅ Animate camera movement whenever target changes
   */
  useEffect(() => {
    const cam = camera.current;
    if (!cam) return;

    gsap.to(cam.position, {
      duration: 1.5,
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      ease: "power3.inOut",
    });

    gsap.to(cam.quaternion, {
      duration: 1.5,
      x: targetQuaternion.x,
      y: targetQuaternion.y,
      z: targetQuaternion.z,
      w: targetQuaternion.w,
      ease: "power3.inOut",
    });

    gsap.to(cam, {
      duration: 1.5,
      zoom,
      ease: "power3.inOut",
      onUpdate: () => cam.updateProjectionMatrix(),
    });
  }, [targetPosition, targetQuaternion, zoom, camera]);
};

export default useCameraManager;
