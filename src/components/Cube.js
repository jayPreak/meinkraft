import { useBox } from "@react-three/cannon";
import React from "react";
import * as textures from "../images/textures";

export default function Cube({ position, texture }) {
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));
  const activeTexture = textures[texture + "Texture"];
  console.log(activeTexture);
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={activeTexture} />
    </mesh>
  );
}
