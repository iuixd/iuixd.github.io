// Logical rendering resolution the game is tuned for. The canvas backing store is resized to
// the actual displayed size (capped by MAX_DPR) at runtime; these are reference/default values
// used before the first ResizeObserver measurement lands.
export const INTERNAL_WIDTH = 1280;
export const INTERNAL_HEIGHT = 720;

export const MAX_DPR = 2;

// Pseudo-3D road tuning — world units, not pixels. These stay constant regardless of the
// canvas's actual displayed/backing-store size.
export const SEGMENT_LENGTH = 180;
export const ROAD_WIDTH = 1800;
export const DRAW_DISTANCE = 220;
export const LANES = 3;

export const CAMERA_HEIGHT = 950;
export const CAMERA_DEPTH = 0.84;
export const FIELD_OF_VIEW = 100;

// Player physics — world units/sec, not pixels/sec.
export const MAX_SPEED = 12500;
export const ACCELERATION = 5200;
export const BRAKING = 9000;
export const NATURAL_DECELERATION = 1100;

export const OFFROAD_DECELERATION = 5200;
export const CRASH_DECELERATION = 11000; // consumed once collision response lands (Phase 6)
export const OFFROAD_MAX_SPEED_RATIO = 0.56;
export const OFFROAD_STEER_PENALTY = 0.75; // slightly reduced steering authority off-road

export const STEER_SPEED = 2.15;
export const CENTRIFUGAL_FORCE = 0.28;

// playerX is 0 at road centre; ±ROAD_EDGE marks the painted edge, ±OFFROAD_LIMIT is as far
// as the bike can drift onto the grass before being clamped.
export const ROAD_EDGE = 1;
export const OFFROAD_LIMIT = 1.65;
export const OFFROAD_VIBRATION_AMOUNT = 10; // world-unit camera jitter while off-road

export const LEAN_SMOOTHING_RATE = 8; // matches lean = lerp(lean, target, 1 - exp(-8*dt))
export const BIKE_LEAN_MAX_DEGREES = 14; // visible cockpit lean, spec range 12–16°
export const CAMERA_COUNTER_ROLL_MAX_DEGREES = 3; // horizon roll, spec range 2–4°

export const SPEED_KPH_MAX = 280;
export const AUTO_PAUSE_STOP_SPEED = 1; // effectively stationary in world units/sec

// Opponent AI. No pathfinding — each bot just reacts to whoever is directly ahead of it.
export const OPPONENT_COUNT = 5;
export const OPPONENT_MIN_SPEED_RATIO = 0.72;
export const OPPONENT_MAX_SPEED_RATIO = 0.96;
export const OPPONENT_LANE_LIMIT = 1.15;
export const CURVE_SPEED_FACTOR = 0.05; // tuned so HARD curves (curve≈6) hit the 0.28 cap
export const OPPONENT_SKILL_CURVE_REDUCTION = 0.5; // max skill halves the curve penalty
export const AI_SPEED_SMOOTHING_RATE = 3;
export const AI_OFFSET_SMOOTHING_RATE = 2.5; // scaled per-bot by `reaction`
export const AI_LOOKAHEAD_Z = SEGMENT_LENGTH * 6;
export const AI_AVOID_LATERAL_GAP = 0.45; // how far to shift when overtaking/avoiding
export const AI_AVOID_X_THRESHOLD = 0.3; // lateral distance considered "in the way"

// Opponent visual lean (rendering only — never fed back into AI/physics).
// visualLean = clamp(curveInfluence * WEIGHT + lateralVelocity * LATERAL_WEIGHT, -1, 1)
export const OPPONENT_LEAN_CURVE_WEIGHT = 1;
export const OPPONENT_LEAN_LATERAL_WEIGHT = 2.5;
export const OPPONENT_LEAN_SMOOTHING_RATE = 8; // matches the player's LEAN_SMOOTHING_RATE
export const OPPONENT_HIT_WOBBLE_MAGNITUDE = 0.8;
export const OPPONENT_HIT_WOBBLE_DECAY_RATE = 6;
export const OPPONENT_SUSPENSION_FREQUENCY = 2.4; // cycles/sec
export const OPPONENT_SUSPENSION_AMPLITUDE = 0.35; // grid units — a few logical pixels once scaled

// Collision.
export const COLLISION_Z_THRESHOLD = SEGMENT_LENGTH * 0.8;
export const COLLISION_X_THRESHOLD = 0.22;
export const COLLISION_COOLDOWN_MS = 900; // also doubles as the crash recovery duration
export const COLLISION_SPEED_LOSS_RATIO = 0.5; // within the spec's 45–65% range
export const CRASH_WOBBLE_MAGNITUDE = 0.55; // extra player cockpit tilt on impact, decays out
export const CRASH_WOBBLE_RECOVERY_RATE = 4;
export const COLLISION_LATERAL_IMPULSE = 0.18;
export const COLLISION_SHAKE_DURATION_MS = 300;
export const COLLISION_STEER_PENALTY = 0.5; // steering authority scale while recovering
export const SCREEN_SHAKE_INTENSITY = 0.02; // fraction of viewport width, at full shake

// Scoring.
export const DISTANCE_SCORE_RATE = 12; // points/sec at full speed
export const OVERTAKE_BONUS = 500;
export const CLEAN_SECTOR_BONUS = 250;
export const FINISH_BONUS = 2000;
export const COLLISION_PENALTY = 300;
export const SECTOR_COUNT = 4; // track divided into this many "clean sector" bonus zones
export const POSITION_BONUS = { 1: 3000, 2: 2000, 3: 1200, 4: 700, 5: 350, 6: 0 };

// Decorative scenery — purely visual, never affects physics/collision.
export const MOUNTAIN_PARALLAX_FACTOR = 0.015; // fraction of camera.x the silhouette drifts by
export const CLOUD_COUNT = 5;
export const CLOUD_DRIFT_PERIOD_MS = 42000; // one full drift cycle across the sky

// Off-road dust particles.
export const DUST_SPAWN_INTERVAL_MS = 90;
export const DUST_PARTICLE_LIFETIME_MS = 500;
export const DUST_MAX_PARTICLES = 24;

export const GAME_STATES = {
  IDLE: "idle",
  READY: "ready",
  COUNTDOWN: "countdown",
  RACING: "racing",
  CRASHED: "crashed",
  FINISHED: "finished",
  RETIRED: "retired",
  PAUSED: "paused",
};

// Brief beat between "Start Ride" activation and the visible countdown starting.
export const READY_DURATION_MS = 300;
export const COUNTDOWN_DURATION_MS = 3200;

// Three-lap records are not comparable with the original single-lap race records.
export const BEST_SCORE_STORAGE_KEY = "retro-gp-3lap-best-score";
export const BEST_TIME_STORAGE_KEY = "retro-gp-3lap-best-time";

// React-facing snapshot updates are throttled to this interval so the animation loop never
// drives React state at 60fps.
export const SNAPSHOT_INTERVAL_MS = 1000 / 12;
