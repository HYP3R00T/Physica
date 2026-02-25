import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const MAX_DT_SECONDS = 0.05;

const formatNumber = (value: number): string => value.toFixed(2);

const ProjectileSim = (): ReactElement => {
  const wasmRef = useRef<WasmModule | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const stateRef = useRef<SimState>(DEFAULT_STATE);

  const [state, setState] = useState<SimState>(DEFAULT_STATE);
  const [running, setRunning] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

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
    if (!running || !ready || !wasmRef.current) {
      return;
    }

    const tick = (time: number): void => {
      const lastTime = lastTimeRef.current ?? time;
      const dt = Math.min((time - lastTime) / 1000, MAX_DT_SECONDS);
      lastTimeRef.current = time;

      const current = stateRef.current;
      const wasm = wasmRef.current;
      if (!wasm) {
        return;
      }

      const result = wasm.step_projectile(current.x, current.y, current.vx, current.vy, dt, GRAVITY);
      const [nextX, nextY, nextVx, nextVy] = Array.from(result);

      if (nextY <= 0 && nextVy < 0) {
        const landedState = { x: nextX, y: 0, vx: nextVx, vy: 0 };
        stateRef.current = landedState;
        setState(landedState);
        setRunning(false);
        lastTimeRef.current = null;
        return;
      }

      const nextState = { x: nextX, y: nextY, vx: nextVx, vy: nextVy };
      stateRef.current = nextState;
      setState(nextState);

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [ready, running]);

  const handleStart = (): void => {
    if (!ready) {
      return;
    }

    setRunning(true);
  };

  const handlePause = (): void => {
    setRunning(false);
  };

  const handleReset = (): void => {
    const nextState = { ...DEFAULT_STATE };
    stateRef.current = nextState;
    setState(nextState);
    setRunning(false);
    lastTimeRef.current = null;
  };

  return (
    <Card className="mt-10 w-full max-w-2xl border-border">
      <header className="flex flex-wrap items-center justify-between gap-4 px-6 pt-6">
        <div>
          <p className="text-xs uppercase text-muted-foreground">
            Rust WASM
          </p>
          <h2 className="text-2xl font-semibold text-foreground">Projectile Motion</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={!ready || running || reducedMotion}
            onClick={handleStart}
            size="default"
            variant="default"
          >
            Start
          </Button>
          <Button onClick={handlePause} size="default" variant="outline">
            Pause
          </Button>
          <Button onClick={handleReset} size="default" variant="outline">
            Reset
          </Button>
        </div>
      </header>

      <div className="mt-6 grid gap-4 px-6 text-sm text-muted-foreground sm:grid-cols-2">
        <div className="bg-muted p-4">
          <p className="text-xs uppercase text-muted-foreground">
            Position
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">
            x: {formatNumber(state.x)} m
          </p>
          <p className="text-lg font-semibold text-foreground">
            y: {formatNumber(state.y)} m
          </p>
        </div>
        <div className="bg-muted p-4">
          <p className="text-xs uppercase text-muted-foreground">
            Velocity
          </p>
          <p className="mt-2 text-lg font-semibold text-foreground">
            vx: {formatNumber(state.vx)} m/s
          </p>
          <p className="text-lg font-semibold text-foreground">
            vy: {formatNumber(state.vy)} m/s
          </p>
        </div>
      </div>

      <footer className="mt-6 px-6 pb-6 text-xs text-muted-foreground">
        {error && <p className="text-destructive">{error}</p>}
        {!error && !ready && <p>Loading WASM module...</p>}
        {reducedMotion && <p>Reduced motion is enabled; use Reset to inspect values.</p>}
        {ready && !error && !reducedMotion && (
          <p>Running on Rust + wasm-bindgen with gravity {formatNumber(GRAVITY)} m/s^2.</p>
        )}
      </footer>
    </Card>
  );
};

export default ProjectileSim;
