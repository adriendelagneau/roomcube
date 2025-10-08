"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

import useInput from "@/store/useInput";
import useInteractionStore from "@/store/useInteractionStore";

import { interactiveObjects } from "@/data/interactiveObjects";

const useRaycaster = () => {
  const { scene, camera, gl } = useThree();
  const canvas = gl.domElement;
  const { setHoveredObject, setClickedObject } = useInteractionStore();

  useEffect(() => {
    const onPointerMove = () => {
      const pointer = useInput.getState().pointer;
      const pointerVec2 = new THREE.Vector2(pointer.x, pointer.y);

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointerVec2, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const isInteractive = interactiveObjects.some(
          (obj) => obj.name === intersectedObject.name
        );

        if (isInteractive) {
          setHoveredObject(intersectedObject.name);
        } else {
          setHoveredObject(null);
        }
      } else {
        setHoveredObject(null);
      }
    };

    const onClick = (event: MouseEvent | PointerEvent) => {
      const pointer = useInput.getState().pointer;
      const pointerVec2 = new THREE.Vector2(pointer.x, pointer.y);

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointerVec2, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const isInteractive = interactiveObjects.some(
          (obj) => obj.name === intersectedObject.name
        );

        if (isInteractive) {
          setClickedObject(intersectedObject.name);
          console.log("Clicked:", intersectedObject.name);
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
  }, [scene, camera, setHoveredObject, setClickedObject, canvas]);
};

export default useRaycaster;
