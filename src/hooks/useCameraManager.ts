"use client";

import gsap from "gsap";
import { useEffect } from "react";
import * as THREE from "three";

import useCamera from "@/store/useCamera";
import useInteractionStore from "@/store/useInteractionStore";

import { interactiveObjects } from "@/data/interactiveObjects";


const useCameraManager = ({ camera }: {  camera: React.RefObject<THREE.OrthographicCamera | null>;  }) => {
  const { clickedObject, isEntered } = useInteractionStore();
  const { setCameraTarget } = useCamera();

  useEffect(() => {
    let target;
    if (isEntered) {
      target = interactiveObjects.find((obj) => obj.name === "InitialView");
      if (clickedObject) {
        const foundObject = interactiveObjects.find(
          (obj) => obj.name === clickedObject
        );
        if (foundObject) {
          target = foundObject;
        }
      }
    } else {
      target = interactiveObjects.find((obj) => obj.name === "IntroView");
    }

    if (target) {
      const { targetPosition, targetQuaternion, zoom } = target;
      const position = new THREE.Vector3().fromArray(targetPosition);
      const quaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(...targetQuaternion)
      );
      setCameraTarget(position, quaternion, zoom);
    }
  }, [clickedObject, isEntered, setCameraTarget]);

  const { targetPosition, targetQuaternion, zoom } = useCamera();

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
    zoom: zoom,
    ease: "power3.inOut",
    onUpdate: () => cam.updateProjectionMatrix(),
  });
}, [targetPosition, targetQuaternion, zoom, camera]);
};

export default useCameraManager;
