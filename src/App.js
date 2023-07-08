import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";

function App() {
  return (
    <>
      {/* <div>Outside Canvas</div> */}
      <Canvas>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <Physics>
          <Player />
          <Ground />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
