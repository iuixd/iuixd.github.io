import { CAMERA_HEIGHT, CAMERA_DEPTH } from "./constants";

/**
 * Camera world position + perspective depth. x/z follow the player once physics lands in
 * Phase 5 (x = playerX * ROAD_WIDTH, z = player's world Z); y tracks camera height plus the
 * current segment's elevation once hills exist (Phase 4).
 */
export function createCamera() {
  return { x: 0, y: CAMERA_HEIGHT, z: 0, depth: CAMERA_DEPTH };
}
