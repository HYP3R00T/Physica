import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import Axes from "@/components/simulations/common/Axes";
import Particle from "@/components/simulations/common/Particle";
import PhysicsScene from "@/components/simulations/common/PhysicsScene";
import SimulationLayout from "@/components/simulations/common/SimulationLayout";

import type { ReactElement, RefObject } from "react";
import type { Object3D, OrthographicCamera as OrthographicCameraType } from "three";

type SimState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type WasmModule = typeof import("@/wasm/pkg/physica_wasm.js");

const GRAVITY = -9.81;
const MAX_DT_SECONDS = 0.05;
const DEFAULT_ZOOM = 50;
const MIN_ZOOM = 10;
const MAX_ZOOM = 150;
const ORIGIN = { x: 0, y: 0 };
const ORIGIN_OFFSET_FRACTION = { x: 0.08, y: 0.08 };
const DEFAULT_STATE: SimState = {
  x: 0,
  y: 0,
  vx: 6,
  vy: 8,
};

const formatNumber = (value: number): string => value.toFixed(2);

const getMarkerInterval = (span: number): number => {
  const targetTicks = 8;
  const raw = Math.max(span / targetTicks, 0.01);
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const normalized = raw / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
};

const getLabelSize = (interval: number): number => {
  if (interval <= 1) return 0.25;
  if (interval <= 2) return 0.3;
  if (interval <= 5) return 0.35;
  return 0.4;
};

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

type ZoomControlsProps = {
  zoom: number;
  origin: { x: number; y: number };
  originOffsetFraction: { x: number; y: number };
  onZoomChange: (zoom: number) => void;
  onViewSizeChange: (size: { width: number; height: number }) => void;
};

const ZoomControls = ({
  zoom,
  origin,
  originOffsetFraction,
  onZoomChange,
  onViewSizeChange,
}: ZoomControlsProps): null => {
  const { camera, gl } = useThree();
  const lastViewSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();
      const delta = event.deltaY;
      const zoomSpeed = 0.1;
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom - delta * zoomSpeed));
      onZoomChange(newZoom);
    };

    const canvas = gl.domElement;
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [zoom, onZoomChange, gl]);

  useFrame(() => {
    if (camera instanceof Object && "zoom" in camera) {
      const orthoCamera = camera as OrthographicCameraType;
      orthoCamera.zoom = zoom;
      orthoCamera.updateProjectionMatrix();

      const viewWidth = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
      const viewHeight = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;

      if (
        Math.abs(viewWidth - lastViewSize.current.width) > 0.001 ||
        Math.abs(viewHeight - lastViewSize.current.height) > 0.001
      ) {
        lastViewSize.current = { width: viewWidth, height: viewHeight };
        onViewSizeChange({ width: viewWidth, height: viewHeight });
      }

      orthoCamera.position.x =
        origin.x + viewWidth / 2 - viewWidth * originOffsetFraction.x;
      orthoCamera.position.y =
        origin.y + viewHeight / 2 - viewHeight * originOffsetFraction.y;
    }
  });

  return null;
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
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [viewSize, setViewSize] = useState({ width: 10, height: 6 });

  const cameraSettings = useMemo(
    () => ({
      position: [5, 3, 10] as [number, number, number],
      zoom: zoom,
      near: 0.1,
      far: 1000,
    }),
    [zoom]
  );

  const markerInterval = useMemo(
    () => getMarkerInterval(Math.max(viewSize.width, viewSize.height)),
    [viewSize]
  );

  const labelSize = useMemo(() => getLabelSize(markerInterval), [markerInterval]);
  const labelScale = useMemo(() => DEFAULT_ZOOM / zoom, [zoom]);

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

  const handleResetView = (): void => {
    setZoom(DEFAULT_ZOOM);
  };

  const handleStateChange = (nextState: SimState): void => {
    stateRef.current = nextState;
    setState(nextState);
  };

  const canvas = (
    <div className="h-125 w-full border border-border">
      <Canvas className="h-full w-full">
        <OrthographicCamera makeDefault {...cameraSettings} />
        <ZoomControls
          zoom={zoom}
          origin={ORIGIN}
          originOffsetFraction={ORIGIN_OFFSET_FRACTION}
          onZoomChange={setZoom}
          onViewSizeChange={setViewSize}
        />
        <PhysicsScene cameraMode="static" followTarget={followTargetRef}>
          <Axes
            sizeX={100}
            sizeY={100}
            showMarkers={true}
            markerInterval={markerInterval}
            labelSize={labelSize}
            labelScale={labelScale}
          />
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
    <div className="grid w-full grid-cols-2 gap-2">
      <Button
        disabled={!ready || reducedMotion}
        onClick={handleToggleRun}
        size="default"
        variant="default"
        className="col-span-2"
      >
        {running ? "Pause" : "Start"}
      </Button>
      <Button onClick={handleReset} size="default" variant="outline">
        Reset
      </Button>
      <Button onClick={handleResetView} size="default" variant="outline">
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
