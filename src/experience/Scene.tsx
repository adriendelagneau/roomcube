import React, { Suspense } from "react";

const Scene = () => {
  return (
    <Suspense fallback={null}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="royalblue" />
      </mesh>
    </Suspense>
  );
};

export default Scene;
