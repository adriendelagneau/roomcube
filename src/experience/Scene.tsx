import React, { Suspense } from "react";

import Room1 from "./models/Room-3-1";
import  Room2  from "./models/Room-3-2";
import  Room3  from "./models/Room-3-3";
import  Room4  from "./models/Room-3-4";


const Scene = () => {
  return (
    <Suspense fallback={null}>
      <group rotation={[ Math.PI/16, -Math.PI / 4, 0]}>

      <Room1 />
      <Room2 />
      <Room3 />
      <Room4 />
      </group>



    </Suspense>
  );
};

export default Scene;
