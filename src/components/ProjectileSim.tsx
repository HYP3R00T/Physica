import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProjectileScene from "@/components/simulations/ProjectileScene";

import type { ReactElement } from "react";

type SimState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

type WasmModule = typeof import("@/wasm/pkg/physica_wasm.js");

const GRAVITY = -9.81;
const DEFAULT_STATE: SimState = {
  x: 0,
  y: 0,
  vx: 6,
  vy: 8,
};

const formatNumber = (value: number): string => value.toFixed(2);

const ProjectileSim = (): ReactElement => {
  const wasmRef = useRef<WasmModule | null>(null);
  const stateRef = useRef<SimState>(DEFAULT_STATE);

  const [state, setState] = useState<SimState>(DEFAULT_STATE);
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  return (
    <Card className="mt-10 w-full max-w-3xl border border-border bg-card shadow-none">
      <div className="flex items-center justify-end gap-2 px-6 pt-6">
        <Button
          disabled={!ready || reducedMotion}
          onClick={handleToggleRun}
          size="default"
          variant="default"
        >
          {running ? "Pause" : "Start"}
        </Button>
        <Button onClick={handleReset} size="default" variant="outline">
          Reset
        </Button>
      </div>

      <div className="px-6 pb-8 pt-6">
        <ProjectileScene
          gravity={GRAVITY}
          onRunStateChange={setRunning}
          onStateChange={handleStateChange}
          ready={ready}
          reducedMotion={reducedMotion}
          running={running}
          state={state}
          stateRef={stateRef}
          wasmRef={wasmRef}
        />

        <div className="mt-8 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="border border-border bg-muted px-4 py-3">
            <p className="text-xs uppercase text-muted-foreground">Position</p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              x: {formatNumber(state.x)} m
            </p>
            <p className="text-lg font-semibold text-foreground">
              y: {formatNumber(state.y)} m
            </p>
          </div>
          <div className="border border-border bg-muted px-4 py-3">
            <p className="text-xs uppercase text-muted-foreground">Velocity</p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              vx: {formatNumber(state.vx)} m/s
            </p>
            <p className="text-lg font-semibold text-foreground">
              vy: {formatNumber(state.vy)} m/s
            </p>
          </div>
        </div>

        {(error || !ready || reducedMotion) && (
          <div className="mt-4 text-xs text-muted-foreground">
            {error && <p className="text-destructive">{error}</p>}
            {!error && !ready && <p>Loading WASM module...</p>}
            {reducedMotion && <p>Reduced motion is enabled; use Reset to inspect values.</p>}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectileSim;
