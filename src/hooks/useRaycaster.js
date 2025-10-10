"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useInput from "@/store/useInput";
import useInteractionStore from "@/store/useInteractionStore";


const useRaycaster = () => {
  const { scene, camera } = useThree();
  const { setHoveredObject, setClickedObject } = useInteractionStore();
  const { gl } = useThree();
  const canvas = gl.domElement; // this is the actual <canvas> element

  
  useEffect(() => {
    const onPointerMove = (event) => {
      const pointer = useInput.getState().pointer;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const isInteractive = interactiveObjects.some(
          (obj) => obj.name === intersectedObject.name
        );

        if (isInteractive) {
          setHoveredObject(intersectedObject.name);
          // console.log('Hovered:', intersectedObject.name);
        } else {
          setHoveredObject(null);
          // console.log('Hovered: null');
        }
      } else {
        setHoveredObject(null);
        // console.log('Hovered: null');
      }
    };

    const onClick = (event) => {
      const canvas = gl.domElement;
      if (!canvas) return;
      
      const pointer = useInput.getState().pointer;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);
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
  }, [scene, camera, setHoveredObject, setClickedObject, canvas, gl.domElement]);
};

export default useRaycaster;
