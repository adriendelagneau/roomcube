"use client";

import gsap from "gsap";
import { useEffect } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useCamera from "@/store/useCamera";
import useInteractionStore from "@/store/useInteractionStore";
import { useResponsiveStore } from "@/store/useResponsiveStore";

const useCameraManager = ({
  camera,
}: {
  camera: React.RefObject<THREE.OrthographicCamera | null>;
}) => {
  const { clickedObject, isEntered } = useInteractionStore();
  const { setCameraTarget, targetPosition, targetQuaternion, zoom } = useCamera();
  const { isMobile, isTablet } = useResponsiveStore();

  // Helper to get correct transform based on device type
  const getTransformForDevice = (objectName: string) => {
    const object = interactiveObjects.find((obj) => obj.name === objectName);
    if (!object) return null;

    if (isMobile && object.mobile) return object.mobile;
    if (isTablet && object.tablet) return object.tablet;
    return object.desktop; // fallback
  };

  // Update camera target when interaction or device changes
  useEffect(() => {
    let targetConfig;

    if (isEntered) {
      // Default view after entering
      targetConfig = getTransformForDevice("InitialView");

      // If user clicked a specific object, override target
      if (clickedObject) {
        const clickedConfig = getTransformForDevice(clickedObject);
        if (clickedConfig) targetConfig = clickedConfig;
      }
    } else {
      // Before entering scene
      targetConfig = getTransformForDevice("IntroView");
    }

    if (targetConfig) {
      const { targetPosition, targetQuaternion, zoom } = targetConfig;

      const position = new THREE.Vector3().fromArray(targetPosition);
      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(...targetQuaternion)
      );

      setCameraTarget(position, quaternion, zoom);
    }
  }, [clickedObject, isEntered, isMobile, isTablet, setCameraTarget]);

  // Animate camera movement whenever target changes
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
