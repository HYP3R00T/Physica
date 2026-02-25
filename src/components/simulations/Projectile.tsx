import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import Axes from "@/components/simulations/common/Axes";
import Particle from "@/components/simulations/common/Particle";
import PhysicsScene from "@/components/simulations/common/PhysicsScene";
import SimulationLayout from "@/components/simulations/common/SimulationLayout";

import type { ReactElement, RefObject } from "react";
import type { Object3D } from "three";

type SimState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type WasmModule = typeof import("@/wasm/pkg/physica_wasm.js");

const GRAVITY = -9.81;
const MAX_DT_SECONDS = 0.05;
const DEFAULT_STATE: SimState = {
  x: 0,
  y: 0,
  vx: 6,
  vy: 8,
};

const formatNumber = (value: number): string => value.toFixed(2);

type ProjectileBodyProps = {
  wasmRef: RefObject<WasmModule | null>;
  running: boolean;
  ready: boolean;
  reducedMotion: boolean;
  gravity: number;
  stateRef: RefObject<SimState>;
  state: SimState;
  onStateChange: (next: SimState) => void;
  onRunStateChange: (nextRunning: boolean) => void;
  followTargetRef: RefObject<Object3D | null>;
};

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
}: ProjectileBodyProps): ReactElement => {
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

const ProjectileSim = (): ReactElement => {
  const wasmRef = useRef<WasmModule | null>(null);
  const stateRef = useRef<SimState>(DEFAULT_STATE);
  const followTargetRef = useRef<Object3D | null>(null);

  const [state, setState] = useState<SimState>(DEFAULT_STATE);
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cameraSettings = useMemo(
    () => ({
      position: [5, 3, 10] as [number, number, number],
      zoom: 50,
      near: 0.1,
      far: 1000,
    }),
    []
  );

  useEffect(() => {
    const loadWasm = async (): Promise<void> => {
      try {
        const wasmModule = await import("@/wasm/pkg/physica_wasm.js");
        await wasmModule.default();
        wasmRef.current = wasmModule;
        setReady(true);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load WASM module.");
      }
    };

    void loadWasm();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (): void => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion && running) {
      setRunning(false);
    }
  }, [reducedMotion, running]);

  const handleToggleRun = (): void => {
    if (!ready || reducedMotion) {
      return;
    }

    setRunning((prev) => !prev);
  };

  const handleReset = (): void => {
    const nextState = { ...DEFAULT_STATE };
    stateRef.current = nextState;
    setState(nextState);
    setRunning(false);
  };

  const handleStateChange = (nextState: SimState): void => {
    stateRef.current = nextState;
    setState(nextState);
  };

  const canvas = (
    <div className="h-125 w-full border border-border">
      <Canvas className="h-full w-full">
        <OrthographicCamera makeDefault {...cameraSettings} />
        <PhysicsScene cameraMode="static" followTarget={followTargetRef}>
          <Axes sizeX={100} sizeY={100} />
          <ProjectileBody
            wasmRef={wasmRef}
            running={running}
            ready={ready}
            reducedMotion={reducedMotion}
            gravity={GRAVITY}
            stateRef={stateRef}
            state={state}
            onStateChange={handleStateChange}
            onRunStateChange={setRunning}
            followTargetRef={followTargetRef}
          />
        </PhysicsScene>
      </Canvas>
    </div>
  );

  const controls = (
    <>
      <Button
        disabled={!ready || reducedMotion}
        onClick={handleToggleRun}
        size="default"
        variant="default"
        className="flex-1"
      >
        {running ? "Pause" : "Start"}
      </Button>
      <Button onClick={handleReset} size="default" variant="outline" className="flex-1">
        Reset
      </Button>
    </>
  );

  const metrics = (
    <>
      <div className="border border-border bg-muted px-4 py-3">
        <p className="text-xs uppercase text-muted-foreground">Position</p>
        <p className="mt-2 text-lg font-semibold text-foreground">x: {formatNumber(state.x)} m</p>
        <p className="text-lg font-semibold text-foreground">y: {formatNumber(state.y)} m</p>
      </div>
      <div className="border border-border bg-muted px-4 py-3">
        <p className="text-xs uppercase text-muted-foreground">Velocity</p>
        <p className="mt-2 text-lg font-semibold text-foreground">vx: {formatNumber(state.vx)} m/s</p>
        <p className="text-lg font-semibold text-foreground">vy: {formatNumber(state.vy)} m/s</p>
      </div>
    </>
  );

  const statusMessages =
    error || !ready || reducedMotion ? (
      <>
        {error && <p className="text-destructive">{error}</p>}
        {!error && !ready && <p>Loading WASM module...</p>}
        {reducedMotion && <p>Reduced motion is enabled; use Reset to inspect values.</p>}
      </>
    ) : null;

  return <SimulationLayout canvas={canvas} controls={controls} metrics={metrics} statusMessages={statusMessages} />;
};

export default ProjectileSim;
