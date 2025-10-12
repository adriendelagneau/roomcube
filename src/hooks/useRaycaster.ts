"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useInput from "@/store/useInput";
import useInteractionStore from "@/store/useInteractionStore";

const useRaycaster = () => {
  const { scene, camera, gl } = useThree();
  const canvas = gl.domElement;
  const { setHoveredObject, setClickedObject } = useInteractionStore();

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const pointerVec2 = new THREE.Vector2();

    const onPointerMove = () => {
      const pointer = useInput.getState().pointer;
      pointerVec2.set(pointer.x, pointer.y);

      raycaster.setFromCamera(pointerVec2, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const objectName = intersectedObject.name;

        // 🧩 Handle photo group hover
        const isPhoto = objectName.startsWith("photo-");
        const isInteractive =
          isPhoto ||
          interactiveObjects.some((obj) => obj.name === objectName);

        if (isInteractive) {
          setHoveredObject(isPhoto ? "Photos" : objectName);
        } else {
          setHoveredObject(null);
        }
      } else {
        setHoveredObject(null);
      }
    };

    const onClick = () => {
      const pointer = useInput.getState().pointer;
      pointerVec2.set(pointer.x, pointer.y);

      raycaster.setFromCamera(pointerVec2, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const objectName = intersectedObject.name;

        // 🧩 Group all photo-x into "Photos"
        const isPhoto = objectName.startsWith("photo-");
        const isInteractive =
          isPhoto ||
          interactiveObjects.some((obj) => obj.name === objectName);

        if (isInteractive) {
          const targetName = isPhoto ? "Photos" : objectName;
          setClickedObject(targetName);
          console.log("Clicked:", targetName);
        } else {
          setClickedObject(null);
          console.log("Clicked: null");
        }
      } else {
        setClickedObject(null);
        console.log("Clicked: null");
      }
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("click", onClick);

    return () => {
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("click", onClick);
    };
  }, [scene, camera, canvas, setHoveredObject, setClickedObject]);
};

export default useRaycaster;
