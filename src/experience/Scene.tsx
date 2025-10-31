import { Suspense } from "react";

import Room_1_1 from "./models/Room-1-1";
import Room_1_2 from "./models/Room-1-2";
import Room_1_3 from "./models/Room-1-3";
import Room_1_4 from "./models/Room-1-4";

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <group
        rotation={[Math.PI / 14, 0, 0]}
        position={[0, -4.6, 0]}
        scale={1.7}
      >
        <group>
          {/* Room */}
          <Room_1_1 />
          <Room_1_2 />
          <Room_1_3 />
          <Room_1_4 />
        </group>
      </group>
    </Suspense>
  );
}
