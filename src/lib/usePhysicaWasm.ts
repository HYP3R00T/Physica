import { useEffect, useState } from "react";

export type PhysicaWasm = typeof import("@/wasm/pkg/physica_wasm.js");

type WasmState = {
  wasm: PhysicaWasm | null;
  ready: boolean;
  error: string | null;
};

export const usePhysicaWasm = (): WasmState => {
  const [wasm, setWasm] = useState<PhysicaWasm | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async (): Promise<void> => {
      try {
        const module = await import("@/wasm/pkg/physica_wasm.js");
        await module.default();
        if (!active) {
          return;
        }
        setWasm(module);
        setReady(true);
      } catch (loadError) {
        if (!active) {
          return;
        }
        setError(loadError instanceof Error ? loadError.message : "Failed to load WASM module.");
      }
    };

    void load();
    return () => {
      active = false;
    };
  }, []);

  return { wasm, ready, error };
};
