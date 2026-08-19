const CIRCUIT_LOOPS = {
  1: [[18, 58], [25, 25], [58, 15], [96, 22], [116, 43], [106, 68], [75, 76], [45, 68]],
  2: [[20, 68], [14, 39], [35, 18], [63, 30], [84, 14], [112, 27], [104, 52], [119, 72], [87, 78], [58, 62], [36, 79]],
  3: [[18, 72], [14, 45], [34, 34], [24, 17], [55, 14], [70, 35], [91, 18], [116, 32], [101, 51], [119, 68], [92, 80], [72, 61], [48, 78], [35, 55]],
};

function pointOnLoop(points, progress) {
  const lengths = points.map((point, index) => {
    const next = points[(index + 1) % points.length];
    return Math.hypot(next[0] - point[0], next[1] - point[1]);
  });
  const total = lengths.reduce((sum, length) => sum + length, 0);
  let remaining = Math.min(1, Math.max(0, progress)) * total;

  for (let index = 0; index < points.length; index += 1) {
    if (remaining <= lengths[index]) {
      const start = points[index];
      const end = points[(index + 1) % points.length];
      const ratio = lengths[index] ? remaining / lengths[index] : 0;
      return [start[0] + (end[0] - start[0]) * ratio, start[1] + (end[1] - start[1]) * ratio];
    }
    remaining -= lengths[index];
  }
  return points[0];
}

export default function CircuitMinimap({ styles, snapshot }) {
  const points = CIRCUIT_LOOPS[snapshot.level] ?? CIRCUIT_LOOPS[1];
  const blip = pointOnLoop(points, snapshot.trackProgress ?? 0);
  const path = `${points.map(([x, y], index) => `${index ? "L" : "M"}${x} ${y}`).join(" ")} Z`;
  const [startX, startY] = points[0];

  return (
    <aside className={styles.minimapPanel} aria-label={`${snapshot.circuit} circuit map`}>
      <div className={styles.minimapHeading}>
        <span>{snapshot.circuit}</span>
        <span>L{snapshot.level}</span>
      </div>
      <svg className={styles.minimapSvg} viewBox="0 0 132 92" role="img" aria-label={`${Math.round((snapshot.trackProgress ?? 0) * 100)} percent around the current lap`}>
        <path className={styles.minimapTrackShadow} d={path} />
        <path className={styles.minimapTrack} d={path} />
        <line className={styles.minimapFinish} x1={startX - 5} y1={startY - 2} x2={startX + 5} y2={startY + 2} />
        <circle className={styles.minimapPulse} cx={blip[0]} cy={blip[1]} r="5" />
        <circle className={styles.minimapBlip} cx={blip[0]} cy={blip[1]} r="2.7" />
      </svg>
      <div className={styles.minimapMeta}>
        <span>{snapshot.circuitSectors} SECTORS</span>
        <span>{snapshot.circuitLength}</span>
        <span>{snapshot.circuitTurns} TURNS</span>
      </div>
    </aside>
  );
}
