import Cube from "./Cube";
import { useStore } from "./hooks/useStore";

export const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);
  console.log(cubes);
  // return null;
  return cubes.map(({ key, pos, texture }) => {
    return <Cube key={key} position={pos} texture={texture} />;
  });
};
