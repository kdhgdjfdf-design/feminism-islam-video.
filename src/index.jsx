import React from "react";
import { Composition, registerRoot } from "remotion";
import { Video } from "./Video";

const Root = () => (
  <Composition
    id="Main"
    component={Video}
    durationInFrames={2700}
    fps={30}
    width={1080}
    height={1920}
  />
);

registerRoot(Root);
