declare module "@/wasm/pkg/physica_wasm.js" {
  export default function init(moduleOrPath?: RequestInfo | URL): Promise<unknown>;
  export function step_projectile(
    x: number,
    y: number,
    vx: number,
    vy: number,
    dt: number,
    gravity: number
  ): Float64Array;
}
