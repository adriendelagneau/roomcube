"use client";

import React, { RefObject } from "react";
import * as THREE from "three";

import useCameraManager from "@/hooks/useCameraManager";

interface CameraManagerProps {
  camera: RefObject<THREE.OrthographicCamera | null>; // allow null
}

const CameraManager: React.FC<CameraManagerProps> = ({ camera }) => {
  useCameraManager({ camera });

  return null;
};

export default CameraManager;
