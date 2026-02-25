use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn step_projectile(
    x: f64,
    y: f64,
    vx: f64,
    vy: f64,
    dt: f64,
    gravity: f64,
) -> Box<[f64]> {
    let next_x = x + vx * dt;
    let next_y = y + vy * dt + 0.5 * gravity * dt * dt;
    let next_vx = vx;
    let next_vy = vy + gravity * dt;

    vec![next_x, next_y, next_vx, next_vy].into_boxed_slice()
}
