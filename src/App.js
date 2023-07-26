import { Physics } from "@react-three/cannon";
import { PointerLockControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { FirstPerson } from "./components/FirstPerson";
import { Cubes } from "./components/Cubes";

function App() {
  return (
    <>
      {/* <div>Outside Canvas</div> */}
      <Canvas>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        {/* <FirstPerson /> */}
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
        <PointerLockControls />
      </Canvas>
      <div className="dot" />
    </>
  );
}

export default App;
