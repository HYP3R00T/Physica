/**
 * Projectile Motion Simulation Component
 *
 * This component demonstrates a physics simulation with:
 * - Real-time physics calculations via Rust WASM
 * - Interactive 2D visualization with zoom controls
 * - Play/pause and reset functionality
 * - Real-time metrics display (position, velocity)
 */

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Button } from "@/components/ui/button";
import GraphCanvas from "@/components/simulations/common/GraphCanvas";
import Particle from "@/components/simulations/common/Particle";
import SimulationLayout from "@/components/simulations/common/SimulationLayout";

import type { ReactElement, RefObject } from "react";
import type { Object3D } from "three";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/** The mutable state of the projectile at any moment in time */
type SimState = {
  x: number;  // Position in meters (horizontal)
  y: number;  // Position in meters (vertical)
  vx: number; // Velocity in m/s (horizontal)
  vy: number; // Velocity in m/s (vertical)
};

/** Type reference to the WASM physics module */
type WasmModule = typeof import("@/wasm/pkg/physica_wasm.js");

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

// Physics parameters - YOU CHANGE THESE TO ADJUST BEHAVIOR
const GRAVITY = -9.81; // Earth's gravity (m/s²)
const MAX_DT_SECONDS = 0.05; // Max time step per frame (prevents instability if FPS drops)

// View/Camera configuration - changes how the graph is displayed
const DEFAULT_ZOOM = 50; // Starting zoom level
const MIN_ZOOM = 10;     // User can't zoom out more than this
const MAX_ZOOM = 150;    // User can't zoom in more than this
const ORIGIN = { x: 0, y: 0 }; // Where (0,0) appears on screen
const ORIGIN_OFFSET_FRACTION = { x: 0.075, y: 0.1 }; // Offset from center for visibility

// Initial conditions - what the projectile starts with
const DEFAULT_STATE: SimState = {
  x: 0,
  y: 0,
  vx: 6,  // 6 m/s to the right
  vy: 8,  // 8 m/s upward
};

/** Format numbers to 2 decimal places for display */
const formatNumber = (value: number): string => value.toFixed(2);

// ============================================================================
// PHYSICS RENDERING COMPONENT (ProjectileBody)
// ============================================================================
/**
 * This component handles the actual physics simulation and 3D rendering.
 * It runs EVERY FRAME and updates position/velocity.
 *
 * "Props" are the inputs it receives from the parent (ProjectileSim)
 */
type ProjectileBodyProps = {
  // References to objects we need to update
  wasmRef: RefObject<WasmModule | null>;      // Access to physics engine
  stateRef: RefObject<SimState>;              // Current state (for fast updates)
  followTargetRef: RefObject<Object3D | null>; // The particle 3D object to move

  // Current state values to display/use
  running: boolean;        // Is the simulation playing?
  ready: boolean;          // Has the WASM module loaded?
  reducedMotion: boolean;  // Should we skip animation? (user accessibility)
  gravity: number;         // Physics constant
  state: SimState;         // Current x, y, vx, vy

  // Functions to update parent state
  onStateChange: (next: SimState) => void;       // Tell parent the state changed
  onRunStateChange: (nextRunning: boolean) => void; // Tell parent to stop when done
};

/**
 * ProjectileBody: The actual physics simulator
 *
 * This uses useFrame (called every animation frame) to:
 * 1. Call the WASM physics function to calculate next position/velocity
 * 2. Stop the particle if it hits the ground (y <= 0)
 * 3. Update the 3D object position so it renders in the right place
 * 4. Notify the parent component of state changes
 */
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
    // Don't simulate if not running, not ready, or user prefers reduced motion
    if (!running || !ready || reducedMotion) {
      return;
    }

    const wasm = wasmRef.current;
    if (!wasm) {
      return;
    }

    // Call the Rust WASM physics function with current state
    // It returns: [newX, newY, newVx, newVy]
    const dt = Math.min(delta, MAX_DT_SECONDS);
    const current = stateRef.current;
    const result = wasm.step_projectile(current.x, current.y, current.vx, current.vy, dt, gravity);
    const [nextX, nextY, nextVx, nextVy] = Array.from(result);

    // If projectile is below ground AND moving downward, stop it
    const nextState =
      nextY <= 0 && nextVy < 0
        ? { x: nextX, y: 0, vx: nextVx, vy: 0 } // Stopped
        : { x: nextX, y: nextY, vx: nextVx, vy: nextVy }; // Still moving

    // Update our local ref (fast) and notify parent (triggers re-render)
    stateRef.current = nextState;
    onStateChange(nextState);

    // Move the visual particle in 3D space
    followTargetRef.current?.position.set(nextState.x, nextState.y, 0);

    // If we've landed and stopped, pause the simulation
    if (nextState.y <= 0 && nextState.vy === 0) {
      onRunStateChange(false);
    }
  });

  // Render a group with the particle at its current position
  return (
    <group ref={followTargetRef} position={[state.x, state.y, 0]}>
      <Particle position={[0, 0, 0]} />
    </group>
  );
};

// ============================================================================
// MAIN SIMULATION COMPONENT (ProjectileSim)
// ============================================================================
/**
 * ProjectileSim: Orchestrates the entire simulation
 *
 * Responsibilities:
 * 1. Load the WASM physics engine
 * 2. Manage simulation state (running, paused, reset)
 * 3. Handle user input (buttons, zoom)
 * 4. Respect accessibility preferences (prefers-reduced-motion)
 * 5. Assemble UI: graph canvas, controls, metrics display
 * 6. Coordinate between ProjectileBody and the UI
 */
const ProjectileSim = (): ReactElement => {
  // ========== REFS (updated without re-rendering) ==========
  const wasmRef = useRef<WasmModule | null>(null); // The physics engine
  const stateRef = useRef<SimState>(DEFAULT_STATE); // Current x,y,vx,vy (fast access)
  const followTargetRef = useRef<Object3D | null>(null); // The particle 3D object

  // ========== STATE (changes trigger re-renders) ==========
  const [state, setState] = useState<SimState>(DEFAULT_STATE);
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false); // Has WASM loaded?
  const [error, setError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false); // User accessibility
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  // ========== EFFECT: Load WASM Physics Engine (runs once on mount) ==========
  useEffect(() => {
    const loadWasm = async (): Promise<void> => {
      try {
        const wasmModule = await import("@/wasm/pkg/physica_wasm.js");
        await wasmModule.default(); // Initialize the WASM module
        wasmRef.current = wasmModule;
        setReady(true); // Now we're ready to simulate!
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load WASM module.");
      }
    };

    void loadWasm();
  }, []);

  // ========== EFFECT: Check user accessibility preference ==========
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Listen for "prefers-reduced-motion" system setting
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = (): void => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  // ========== EFFECT: Auto-pause if reduced-motion enabled ==========
  useEffect(() => {
    if (reducedMotion && running) {
      setRunning(false);
    }
  }, [reducedMotion, running]);

  // ========== EVENT HANDLERS ==========

  /** Toggle between playing and paused */
  const handleToggleRun = (): void => {
    if (!ready || reducedMotion) {
      return;
    }
    setRunning((prev) => !prev);
  };

  /** Reset to initial conditions and stop */
  const handleReset = (): void => {
    const nextState = { ...DEFAULT_STATE };
    stateRef.current = nextState;
    setState(nextState);
    setRunning(false);
  };

  /** Reset zoom to default level */
  const handleResetView = (): void => {
    setZoom(DEFAULT_ZOOM);
  };

  /** Sync state updates from ProjectileBody to React state */
  const handleStateChange = (nextState: SimState): void => {
    stateRef.current = nextState;
    setState(nextState);
  };

  // ========== BUILD UI COMPONENTS ==========

  // The 3D graph canvas with the simulation
  const canvas = (
    <GraphCanvas
      heightClass="h-125"
      border={true}
      origin={ORIGIN}
      originOffsetFraction={ORIGIN_OFFSET_FRACTION}
      zoom={zoom}
      onZoomChange={setZoom}
      baseZoom={DEFAULT_ZOOM}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      axisSize={{ x: 100, y: 100 }}
      showAxes={true}
      showMarkers={true}
      cameraMode="static"
      followTargetRef={followTargetRef}
    >
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
    </GraphCanvas>
  );

  // Control buttons
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

  // Real-time metrics display
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

  // Error messages and loading states
  const statusMessages =
    error || !ready || reducedMotion ? (
      <>
        {error && <p className="text-destructive">{error}</p>}
        {!error && !ready && <p>Loading WASM module...</p>}
        {reducedMotion && <p>Reduced motion is enabled; use Reset to inspect values.</p>}
      </>
    ) : null;

  // ========== RENDER ==========
  // SimulationLayout provides the two-column layout: canvas on left, controls/metrics on right
  return <SimulationLayout canvas={canvas} controls={controls} metrics={metrics} statusMessages={statusMessages} />;
};

export default ProjectileSim;
