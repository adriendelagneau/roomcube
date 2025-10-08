"use client";

import { useMemo } from "react";
import * as THREE from "three";


const useEulerToQuaternion = (
  rotation: [number, number, number] | number[],
  order: THREE.EulerOrder = "XYZ"
): THREE.Quaternion => {
  return useMemo(() => {
    if (!rotation || rotation.length < 3) return new THREE.Quaternion();
    const euler = new THREE.Euler(rotation[0], rotation[1], rotation[2], order);
    return new THREE.Quaternion().setFromEuler(euler);
  }, [rotation, order]);
};

export default useEulerToQuaternion;

