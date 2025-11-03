"use client";

import { GUI } from "lil-gui";
import { useEffect } from "react";
import React, { RefObject } from "react";
import * as THREE from "three";

interface CameraGUIProps {
  cameraRef: RefObject<THREE.OrthographicCamera | null>; // allow null
}

const CameraGUI: React.FC<CameraGUIProps> = ({ cameraRef }) => {
  useEffect(() => {
    if (cameraRef.current && process.env.NODE_ENV !== "production") {
      const gui = new GUI();
      gui.domElement.style.zIndex = "9999";

      const cameraFolder = gui.addFolder("Camera");
      cameraFolder
        .add(cameraRef.current.position, "x", -10, 10, 0.01)
        .name("Position X");
      cameraFolder
        .add(cameraRef.current.position, "y", -10, 10, 0.01)
        .name("Position Y");
      cameraFolder
        .add(cameraRef.current.position, "z", -10, 10, 0.01)
        .name("Position Z");
      cameraFolder
        .add(cameraRef.current, "zoom", 10, 400, 1)
        .name("Zoom")
        .onChange(() => {
          if (cameraRef.current) {
            cameraRef.current.updateProjectionMatrix();
          }
        });

      // For rotation, OrthographicCamera doesn't have direct rotation props like PerspectiveCamera.
      // If rotation is needed, it's usually applied to a parent group or handled by controls.

      const rotationFolder = gui.addFolder("Rotation (Euler)");
      rotationFolder
        .add(cameraRef.current.rotation, "x", -Math.PI, Math.PI, 0.01)
        .name("Rotation X");
      rotationFolder
        .add(cameraRef.current.rotation, "y", -Math.PI, Math.PI, 0.01)
        .name("Rotation Y");
      rotationFolder
        .add(cameraRef.current.rotation, "z", -Math.PI, Math.PI, 0.01)
        .name("Rotation Z");

      return () => {
        gui.destroy();
      };
    }
  }, [cameraRef]);

  return null;
};

export default CameraGUI;
