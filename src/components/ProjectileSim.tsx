import { useEffect, useRef, useState } from "react";

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

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
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
    <section className="mt-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-lg shadow-slate-200/60">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rust WASM</p>
          <h2 className="text-2xl font-semibold text-slate-900">Projectile Motion</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={!ready || running || reducedMotion}
            onClick={handleStart}
            type="button"
          >
            Start
          </button>
          <button
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            onClick={handlePause}
            type="button"
          >
            Pause
          </button>
          <button
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
        </div>
      </header>

      <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Position</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            x: {formatNumber(state.x)} m
          </p>
          <p className="text-lg font-semibold text-slate-900">
            y: {formatNumber(state.y)} m
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Velocity</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">
            vx: {formatNumber(state.vx)} m/s
          </p>
          <p className="text-lg font-semibold text-slate-900">
            vy: {formatNumber(state.vy)} m/s
          </p>
        </div>
      </div>

      <footer className="mt-6 text-xs text-slate-500">
        {error && <p className="text-red-600">{error}</p>}
        {!error && !ready && <p>Loading WASM module...</p>}
        {reducedMotion && <p>Reduced motion is enabled; use Reset to inspect values.</p>}
        {ready && !error && !reducedMotion && (
          <p>Running on Rust + wasm-bindgen with gravity {formatNumber(GRAVITY)} m/s^2.</p>
        )}
      </footer>
    </section>
  );
};

export default ProjectileSim;
