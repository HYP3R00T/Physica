import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";

import Axes from "@/components/simulations/Axes";
import Grid from "@/components/simulations/Grid";
import Particle from "@/components/simulations/Particle";
import PhysicsScene from "@/components/simulations/PhysicsScene";

import type { ReactElement, RefObject } from "react";
import type { Object3D } from "three";

type SimState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type WasmModule = typeof import("@/wasm/pkg/physica_wasm.js");

type ProjectileSceneProps = {
  wasmRef: RefObject<WasmModule | null>;
  running: boolean;
  ready: boolean;
  reducedMotion: boolean;
  gravity: number;
  stateRef: RefObject<SimState>;
  state: SimState;
  onStateChange: (next: SimState) => void;
  onRunStateChange: (nextRunning: boolean) => void;
};

const MAX_DT_SECONDS = 0.05;

const ProjectileBody = ({
  wasmRef,
  running,
  ready,
  reducedMotion,
  gravity,
  stateRef,
  state,
  onStateChange,
  onRunStateChange,
  followTargetRef,
}: ProjectileSceneProps & { followTargetRef: RefObject<Object3D | null> }): ReactElement => {
  useFrame((_state, delta) => {
    if (!running || !ready || reducedMotion) {
      return;
    }

    const wasm = wasmRef.current;
    if (!wasm) {
      return;
    }

    const dt = Math.min(delta, MAX_DT_SECONDS);
    const current = stateRef.current;
    const result = wasm.step_projectile(current.x, current.y, current.vx, current.vy, dt, gravity);
    const [nextX, nextY, nextVx, nextVy] = Array.from(result);

    const nextState =
      nextY <= 0 && nextVy < 0
        ? { x: nextX, y: 0, vx: nextVx, vy: 0 }
        : { x: nextX, y: nextY, vx: nextVx, vy: nextVy };

    stateRef.current = nextState;
    onStateChange(nextState);
    followTargetRef.current?.position.set(nextState.x, nextState.y, 0);

    if (nextState.y <= 0 && nextState.vy === 0) {
      onRunStateChange(false);
    }
  });

  return (
    <group ref={followTargetRef} position={[state.x, state.y, 0]}>
      <Particle position={[0, 0, 0]} />
    </group>
  );
};

const ProjectileScene = (props: ProjectileSceneProps): ReactElement => {
  const followTargetRef = useRef<Object3D | null>(null);

  const cameraSettings = useMemo(
    () => ({
      position: [0, 0, 10] as [number, number, number],
      zoom: 50,
      near: 0.1,
      far: 1000,
    }),
    []
  );

  return (
    <div className="h-125 w-full">
      <Canvas className="h-full w-full">
        <OrthographicCamera makeDefault {...cameraSettings} />
        <PhysicsScene cameraMode="static" followTarget={followTargetRef}>
          <Grid sizeX={10} sizeY={6} divisionsX={10} divisionsY={6} />
          <Axes sizeX={10} sizeY={6} />
          <ProjectileBody {...props} followTargetRef={followTargetRef} />
        </PhysicsScene>
      </Canvas>
    </div>
  );
};

export default ProjectileScene;
