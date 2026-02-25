import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import GraphCanvas from "@/components/simulations/common/GraphCanvas";
import Particle from "@/components/simulations/common/Particle";
import SimulationLayout from "@/components/simulations/common/SimulationLayout";
import { usePhysicaWasm } from "@/lib/usePhysicaWasm";
import { useReducedMotion } from "@/lib/useReducedMotion";

import type { ReactElement } from "react";
import type { Object3D } from "three";

type SimState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const GRAVITY = -9.81;
const MAX_DT_SECONDS = 0.05;
const DEFAULT_ZOOM = 50;

const DEFAULT_STATE: SimState = {
  x: 0,
  y: 0,
  vx: 6,
  vy: 8,
};

const formatNumber = (value: number): string => value.toFixed(2);

const ProjectileSim = (): ReactElement => {
  const followTargetRef = useRef<Object3D | null>(null);
  const { wasm, ready, error } = usePhysicaWasm();
  const reducedMotion = useReducedMotion();

  const [state, setState] = useState<SimState>(DEFAULT_STATE);
  const [running, setRunning] = useState(false);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  useEffect(() => {
    if (reducedMotion && running) {
      setRunning(false);
    }
  }, [reducedMotion, running]);

  const resetState = (): void => {
    setState(DEFAULT_STATE);
    setRunning(false);
  };

  const resetView = (): void => setZoom(DEFAULT_ZOOM);
  const toggleRunning = (): void => {
    if (!ready || reducedMotion) {
      return;
    }
    setRunning((prev) => !prev);
  };

  const ProjectileBody = (): ReactElement => {
    useFrame((_state, delta) => {
      if (!running || !ready || reducedMotion) {
        return;
      }

      if (!wasm) {
        return;
      }

      const dt = Math.min(delta, MAX_DT_SECONDS);
      const result = wasm.step_projectile(state.x, state.y, state.vx, state.vy, dt, GRAVITY);
      const [nextX, nextY, nextVx, nextVy] = Array.from(result);
      const landed = nextY <= 0;
      const nextState = {
        x: nextX,
        y: landed ? 0 : nextY,
        vx: nextVx,
        vy: landed ? 0 : nextVy,
      };

      setState(nextState);
      followTargetRef.current?.position.set(nextState.x, nextState.y, 0);
      if (landed) {
        setRunning(false);
      }
    });

    return (
      <group ref={followTargetRef} position={[state.x, state.y, 0]}>
        <Particle position={[0, 0, 0]} />
      </group>
    );
  };

  const canvas = (
    <GraphCanvas
      heightClass="h-125"
      border={true}
      origin={{ x: 0, y: 0 }}
      originOffsetFraction={{ x: 0.075, y: 0.1 }}
      zoom={zoom}
      onZoomChange={setZoom}
      baseZoom={DEFAULT_ZOOM}
      minZoom={10}
      maxZoom={150}
      axisSize={{ x: 100, y: 100 }}
      showAxes={true}
      showMarkers={true}
      cameraMode="static"
      followTargetRef={followTargetRef}
    >
      <ProjectileBody />
    </GraphCanvas>
  );

  const controlsDisabled = !ready || reducedMotion;
  const controls = (
    <div className="grid w-full grid-cols-2 gap-2">
      <Button
        disabled={controlsDisabled}
        onClick={toggleRunning}
        size="default"
        variant="default"
        className="col-span-2"
      >
        {running ? "Pause" : "Start"}
      </Button>
      <Button onClick={resetState} size="default" variant="outline">
        Reset
      </Button>
      <Button onClick={resetView} size="default" variant="outline">
        Reset View
      </Button>
    </div>
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
