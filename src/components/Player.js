import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "./hooks/useKeyboard";

const JUMP = 3.2;
const GRAVITY = -9.8;

export const Player = () => {
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump, sprint } =
    useKeyboard();

  // console.log(
  //   "actions",
  //   // actions
  //   Object.entries(actions).filter(([k, v]) => v)
  // );
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));
  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);
  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame(() => {
    // console.log("camera.position", camera.position);
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
    // api.velocity.set(0, 1, 1)

    const direction = new Vector3();
    const forwardVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    let SPEED = 3;
    if (sprint) {
      SPEED = 5;
    }
    if (!sprint) {
      SPEED = 3;
    }

    direction
      .subVectors(forwardVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, vel.current[1], direction.z);
    // if (moveForward) {
    //   api.velocity.set(vel.current[0], vel.current[1], -3);
    // }
    // if (moveBackward) {
    //   api.velocity.set(vel.current[0], vel.current[1], 3);
    // }
    // if (moveLeft) {
    //   api.velocity.set(-3, vel.current[1], vel.current[2]);
    // }
    // if (moveRight) {
    //   api.velocity.set(3, vel.current[1], vel.current[2]);
    // }
    if (jump && Math.abs(vel.current[1]) < 0.005) {
      api.velocity.set(vel.current[0], JUMP, vel.current[2]);
    }
  });

  return <mesh ref={ref}></mesh>;
};
