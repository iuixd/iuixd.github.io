/**
 * Projects a single world-space point into screen space using a fixed perspective scale
 * (scale = cameraDepth / cameraZ) applied uniformly to X and Y — the standard pseudo-3D
 * road technique: no true 3D geometry, just per-segment trapezoids.
 *
 * @param {{x:number,y:number,z:number}} worldPoint
 * @param {{x:number,y:number,z:number,depth:number}} camera
 * @param {number} viewportWidth
 * @param {number} viewportHeight
 * @param {number} roadWidth
 * @param {{visible:boolean,x:number,y:number,w:number,scale:number}} [out] Reused result
 *   object — the renderer projects hundreds of points per frame and passes one in to avoid
 *   allocating inside the animation loop. Omit it (as the tests do) to get a fresh object.
 * @returns {{visible:boolean,x:number,y:number,w:number,scale:number}}
 */
export function projectPoint(
  worldPoint,
  camera,
  viewportWidth,
  viewportHeight,
  roadWidth,
  out = { visible: false, x: 0, y: 0, w: 0, scale: 0 }
) {
  const cameraX = worldPoint.x - camera.x;
  const cameraY = worldPoint.y - camera.y;
  const cameraZ = worldPoint.z - camera.z;

  if (cameraZ <= 0) {
    out.visible = false;
    out.x = 0;
    out.y = 0;
    out.w = 0;
    out.scale = 0;
    return out;
  }

  const scale = camera.depth / cameraZ;
  out.visible = true;
  out.x = viewportWidth / 2 + scale * cameraX * (viewportWidth / 2);
  out.y = viewportHeight / 2 - scale * cameraY * (viewportHeight / 2);
  out.w = scale * roadWidth * (viewportWidth / 2);
  out.scale = scale;
  return out;
}
