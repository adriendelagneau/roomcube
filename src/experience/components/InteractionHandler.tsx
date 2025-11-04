"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { interactiveObjects } from "@/data/interactiveObjects";
import useInteractionStore from "@/store/useInteractionStore";

const InteractionHandler = () => {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());

  const { setHoveredObject, setClickedObject } = useInteractionStore();
  const interactiveNames = interactiveObjects.map((o) => o.name.toLowerCase());

  // Track pointer for hover + clicks
  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Hover detection every frame
  useFrame(() => {
    const isUIHovered = useInteractionStore.getState().isUIHovered;
    if (isUIHovered) {
      document.body.style.cursor = "auto";
      return;
    }
    raycaster.current.setFromCamera(pointer.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    const hit = intersects.find((i) =>
      interactiveNames.includes(i.object.name.toLowerCase())
    );

    setHoveredObject(hit ? hit.object.name : null);
    document.body.style.cursor = hit ? "pointer" : "auto";
  });

  useEffect(() => {
    const handleClick = () => {
      const { hoveredObject, clickedObject } = useInteractionStore.getState();
      if (hoveredObject && hoveredObject !== clickedObject) {
        setClickedObject(hoveredObject);
      } else if (!hoveredObject) {
        setClickedObject(null);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [setClickedObject]);

  return null;
};

export default InteractionHandler;
