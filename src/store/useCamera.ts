import * as THREE from "three";
import { create } from "zustand";

interface CameraState {
  targetPosition: THREE.Vector3;
  targetQuaternion: THREE.Quaternion;
  zoom: number;

  setCameraTarget: (
    position: THREE.Vector3,
    quaternion: THREE.Quaternion,
    zoom?: number
  ) => void;
}

const useCamera = create<CameraState>((set) => ({
  targetPosition: new THREE.Vector3(),
  targetQuaternion: new THREE.Quaternion(),
  zoom: 160,

  setCameraTarget: (position, quaternion, zoom) =>
    set({
      targetPosition: position,
      targetQuaternion: quaternion,
      zoom: zoom ?? 160, // fallback default
    }),
}));

export default useCamera;
