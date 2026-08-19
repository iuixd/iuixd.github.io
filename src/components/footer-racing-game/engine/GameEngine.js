import {
  GAME_STATES,
  INTERNAL_WIDTH,
  INTERNAL_HEIGHT,
  MAX_DPR,
  READY_DURATION_MS,
  COUNTDOWN_DURATION_MS,
  SNAPSHOT_INTERVAL_MS,
  DRAW_DISTANCE,
  ROAD_WIDTH,
  LANES,
  SEGMENT_LENGTH,
  CAMERA_HEIGHT,
  ROAD_EDGE,
  OFFROAD_LIMIT,
  OFFROAD_VIBRATION_AMOUNT,
  BIKE_LEAN_MAX_DEGREES,
  CAMERA_COUNTER_ROLL_MAX_DEGREES,
  COLLISION_COOLDOWN_MS,
  COLLISION_SPEED_LOSS_RATIO,
  COLLISION_LATERAL_IMPULSE,
  COLLISION_SHAKE_DURATION_MS,
  COLLISION_STEER_PENALTY,
  SCREEN_SHAKE_INTENSITY,
  SECTOR_COUNT,
  MAX_SPEED,
  DUST_SPAWN_INTERVAL_MS,
  DUST_PARTICLE_LIFETIME_MS,
  DUST_MAX_PARTICLES,
  CRASH_WOBBLE_MAGNITUDE,
  CRASH_WOBBLE_RECOVERY_RATE,
  OPPONENT_HIT_WOBBLE_MAGNITUDE,
} from "./constants";
import { getBestScore, getBestTime, setBestScore, setBestTime } from "./storage";
import { createCamera } from "./camera";
import { findBaseSegmentIndex, getGroundElevation } from "./road";
import { renderBackdrop, renderRoad, renderOpponents, renderCockpit } from "./renderer";
import { spawnDustParticle, updateDustParticles, renderDustParticles } from "./scenery";
import { LEVELS, getLevel } from "../tracks/levels";
import { createPlayer, updatePlayer } from "./player";
import { createOpponents, updateOpponents } from "./opponents";
import { findCollision } from "./collision";
import {
  accumulateDistanceScore,
  applyOvertakeBonus,
  applyCleanSectorBonus,
  applyCollisionPenalty,
  applyFinishBonus,
  rankRacers,
  getPosition,
} from "./scoring";
import { createInputState, applyKeyChange, isMovementKey, toGameInput } from "./controls";
import { clamp, speedToKph } from "./physics";
import { AudioController } from "./audio";

const PLAYER_ID = "player";
const IDLE_SWAY_PERIOD_MS = 2800;
const IDLE_SWAY_AMPLITUDE = 0.06;
const TOTAL_LAPS = 3;

const noop = () => {};

/**
 * Owns the canvas, the requestAnimationFrame loop, and the game state machine.
 * React only ever talks to this through the lifecycle methods below and throttled
 * snapshots via onSnapshot — no per-frame data crosses into React state. `onEvent` fires
 * for the handful of significant, announcement-worthy moments (overtake/collision/finish);
 * it's deliberately separate from onSnapshot so React isn't diffing snapshot fields to
 * infer when something announcement-worthy happened.
 */
export class GameEngine {
  constructor({ onSnapshot = noop, onEvent = noop } = {}) {
    this.canvas = null;
    this.ctx = null;
    this.onSnapshot = onSnapshot;
    this.onEvent = onEvent;
    this.audio = new AudioController();

    this.state = GAME_STATES.IDLE;
    this.reducedMotion = false;
    this.theme = null;

    this.viewportWidth = INTERNAL_WIDTH;
    this.viewportHeight = INTERNAL_HEIGHT;
    this.dpr = 1;

    this.levelIndex = 0;
    this.level = getLevel(this.levelIndex);
    this.track = this.level.buildTrack();
    this.camera = createCamera();
    this.player = createPlayer();
    this.opponents = createOpponents(this.level.ai);

    this.inputState = createInputState();
    this.externalInput = { throttle: false, brake: false, steerX: 0 };
    this.controlsElement = null;
    this.lastInput = { throttle: false, brake: false, steerX: 0 }; // read by the audio update
    this.lastIsOffRoad = false;

    this.score = 0;
    this.bestScore = getBestScore();
    this.bestTime = getBestTime();
    this.speedKph = 0;
    this.position = 1;
    this.previousPosition = 1;
    this.racers = 6;
    this.lap = 1;
    this.totalLaps = TOTAL_LAPS;
    this.elapsedMs = 0;
    this.countdownValue = 3;
    this.sectorIndex = 0;
    this.sectorHadCollision = false;

    this.running = false;
    this.frameId = null;
    this.previousTimestamp = null;
    this.snapshotAccumulatorMs = 0;
    this.readyElapsedMs = 0;
    this.countdownElapsedMs = 0;
    this.idleElapsedMs = 0;
    this.sceneryElapsedMs = 0; // always advances, independent of state — drives cloud drift

    this.dustParticles = [];
    this.dustSpawnAccumulatorMs = 0;

    // Collision/recovery timers, all in ms, all counted down in update().
    this.collisionCooldownMs = 0;
    this.crashRecoveryMs = 0;
    this.steeringPenaltyMs = 0;
    this.shakeRemainingMs = 0;
    this.crashWobble = 0; // extra cockpit tilt on impact, purely visual, decays back to 0

    this.tick = this.tick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  attach(canvas, themeSourceElement, controlsElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.readTheme(themeSourceElement || canvas);
    this.attachControls(controlsElement || canvas);
  }

  /** Keyboard listeners live on the game's own DOM element (not window), so they only ever
   *  fire while it's focused — this is what keeps arrow/space/WASD scoped to "game focused
   *  AND racing" instead of hijacking the whole page. Removed again in destroy(). */
  attachControls(element) {
    this.controlsElement = element;
    element.addEventListener("keydown", this.handleKeyDown);
    element.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyDown(event) {
    if (event.key === "Escape") {
      this.controlsElement?.blur();
      return;
    }
    if (event.key === " ") {
      if (this.state === GAME_STATES.IDLE) {
        event.preventDefault();
        this.start();
      } else if (this.state === GAME_STATES.FINISHED) {
        event.preventDefault();
        this.restart();
      }
      return;
    }
    if (event.key === "p" || event.key === "P") {
      if (this.state === GAME_STATES.RACING) {
        this.pause();
      } else if (this.state === GAME_STATES.PAUSED) {
        this.resume();
      }
      return;
    }
    if (!isMovementKey(event.key)) return;

    this.inputState = applyKeyChange(this.inputState, event.key, true);
    if (this.state === GAME_STATES.RACING || this.state === GAME_STATES.CRASHED) {
      event.preventDefault();
    }
  }

  handleKeyUp(event) {
    if (!isMovementKey(event.key)) return;
    this.inputState = applyKeyChange(this.inputState, event.key, false);
  }

  /** External input source (e.g. mobile touch controls in Phase 8), merged additively with
   *  keyboard input so both can be used at once without conflicting. */
  setInput(input = {}) {
    this.externalInput = {
      throttle: Boolean(input.throttle),
      brake: Boolean(input.brake),
      steerX: typeof input.steerX === "number" ? input.steerX : 0,
    };
  }

  readTheme(sourceElement) {
    if (!sourceElement || typeof window === "undefined") return;
    const styles = window.getComputedStyle(sourceElement);
    const read = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;

    this.theme = {
      bg: read("--retro-gp-bg", "#04191a"),
      sky: read("--retro-gp-sky", "#123336"),
      road: read("--retro-gp-road", "#2c2c34"),
      roadAlt: read("--retro-gp-road-alt", "#34343d"),
      grass: read("--retro-gp-grass", "#173a28"),
      rumbleLight: read("--retro-gp-rumble-light", "#eef0ee"),
      rumbleDark: read("--retro-gp-rumble-dark", "#8f2430"),
      text: read("--retro-gp-text", "#eafaf9"),
      textMuted: read("--retro-gp-text-muted", "#9fd4d1"),
      accent: read("--retro-gp-accent", "#7a4dff"),
      riderAlt: read("--retro-gp-rider-alt", "#4dd0e1"),
      mountain: read("--retro-gp-mountain", "#0e2b2d"),
      cloud: read("--retro-gp-cloud", "rgba(234, 250, 249, 0.35)"),
      cockpitBody: read("--retro-gp-cockpit-body", "#7a1620"),
      cockpitTrim: read("--retro-gp-cockpit-trim", "#e7e7e2"),
      cockpitScreen: read("--retro-gp-cockpit-screen", "rgba(234, 250, 249, 0.16)"),
    };
  }

  resize(cssWidth, cssHeight) {
    if (!this.canvas || !cssWidth || !cssHeight) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const pixelWidth = Math.max(1, Math.round(cssWidth * dpr));
    const pixelHeight = Math.max(1, Math.round(cssHeight * dpr));

    if (this.canvas.width !== pixelWidth) this.canvas.width = pixelWidth;
    if (this.canvas.height !== pixelHeight) this.canvas.height = pixelHeight;

    this.viewportWidth = pixelWidth;
    this.viewportHeight = pixelHeight;
    this.dpr = dpr;

    this.renderFrame();
  }

  setReducedMotion(value) {
    this.reducedMotion = value;
  }

  /** Only ever call this from a real user gesture (the mute button's click handler) — the
   *  AudioContext is created lazily here so it never runs into autoplay restrictions. */
  setMuted(value) {
    this.audio.setMuted(value);
  }

  start() {
    if (this.state === GAME_STATES.READY || this.state === GAME_STATES.COUNTDOWN || this.state === GAME_STATES.RACING) {
      return;
    }
    this.beginCountdown();
  }

  /** "Race Again" — always allowed (typically called from FINISHED), resets everything and
   *  drops straight back into the countdown rather than back to the idle scene. */
  restart() {
    this.beginCountdown();
  }

  advanceLevel() {
    if (this.levelIndex >= LEVELS.length - 1) return false;
    this.levelIndex += 1;
    this.level = getLevel(this.levelIndex);
    this.track = this.level.buildTrack();
    this.beginCountdown();
    return true;
  }

  beginCountdown() {
    this.resetRace();
    this.state = GAME_STATES.READY;
    this.readyElapsedMs = 0;
    this.countdownElapsedMs = 0;
    this.countdownValue = 3;
    this.emitSnapshot(true);
    this.startLoop();
  }

  resetRace() {
    this.player = createPlayer();
    this.camera = createCamera();
    this.opponents = createOpponents(this.level.ai);
    this.dustParticles = [];
    this.dustSpawnAccumulatorMs = 0;
    this.lastInput = { throttle: false, brake: false, steerX: 0 };
    this.lastIsOffRoad = false;

    this.collisionCooldownMs = 0;
    this.crashRecoveryMs = 0;
    this.steeringPenaltyMs = 0;
    this.shakeRemainingMs = 0;

    this.score = 0;
    this.speedKph = 0;
    this.elapsedMs = 0;
    this.position = 1;
    this.previousPosition = 1;
    this.lap = 1;
    this.sectorIndex = 0;
    this.sectorHadCollision = false;
    this.crashWobble = 0;
  }

  /** Pauses gameplay. If a race is in progress it becomes resumable via resume(). */
  pause() {
    if (this.state === GAME_STATES.RACING) {
      this.state = GAME_STATES.PAUSED;
      this.emitSnapshot(true);
    }
    this.stopLoop();
    // Stopping the rAF loop doesn't stop an already-playing Web Audio graph — it runs
    // independently of the JS event loop, so it has to be silenced explicitly here.
    this.audio.silence();
  }

  /** Explicit user-initiated resume from PAUSED back into RACING. */
  resume() {
    if (this.state === GAME_STATES.PAUSED) {
      this.state = GAME_STATES.RACING;
      this.emitSnapshot(true);
    }
    this.startLoop();
  }

  /** Restarts the render loop for non-paused states (e.g. idle ambient scene) without
   *  changing state — used when the game re-enters the viewport. Never resumes a race. */
  resumeAmbient() {
    if (this.state !== GAME_STATES.PAUSED) {
      this.startLoop();
    }
  }

  stop() {
    this.stopLoop();
    this.resetRace();
    this.state = GAME_STATES.IDLE;
    this.emitSnapshot(true);
  }

  startLoop() {
    if (this.running || !this.canvas) return;
    this.running = true;
    this.previousTimestamp = null;
    this.frameId = requestAnimationFrame(this.tick);
  }

  stopLoop() {
    this.running = false;
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  tick(timestamp) {
    if (!this.running) return;

    if (this.previousTimestamp === null) this.previousTimestamp = timestamp;
    const rawDt = (timestamp - this.previousTimestamp) / 1000;
    const dt = Math.min(rawDt, 1 / 30);
    this.previousTimestamp = timestamp;

    this.sceneryElapsedMs += dt * 1000;
    this.update(dt);
    this.renderFrame();

    this.audio.updateEngine({
      speedPercent: clamp(this.player.speed / MAX_SPEED, 0, 1),
      throttle: this.lastInput.throttle,
      braking: this.lastInput.brake,
      offRoad: this.lastIsOffRoad,
      active: this.state === GAME_STATES.RACING || this.state === GAME_STATES.CRASHED,
      dt,
    });

    this.snapshotAccumulatorMs += dt * 1000;
    if (this.snapshotAccumulatorMs >= SNAPSHOT_INTERVAL_MS) {
      this.snapshotAccumulatorMs = 0;
      this.emitSnapshot();
    }

    this.frameId = requestAnimationFrame(this.tick);
  }

  update(dt) {
    if (this.state === GAME_STATES.IDLE) {
      // Drives the subtle idle cockpit sway in renderFrame — the only thing animating
      // while nobody's playing yet.
      this.idleElapsedMs += dt * 1000;
      return;
    }

    if (this.state === GAME_STATES.READY) {
      this.readyElapsedMs += dt * 1000;
      if (this.readyElapsedMs >= READY_DURATION_MS) {
        this.state = GAME_STATES.COUNTDOWN;
        this.countdownElapsedMs = 0;
        this.audio.playCountdownTick();
      }
      return;
    }

    if (this.state === GAME_STATES.COUNTDOWN) {
      const previousCountdownValue = this.countdownValue;
      this.countdownElapsedMs += dt * 1000;
      const remaining = COUNTDOWN_DURATION_MS - this.countdownElapsedMs;
      this.countdownValue = Math.max(0, Math.ceil(remaining / 800));

      if (this.countdownValue !== previousCountdownValue) {
        if (this.countdownValue > 0) this.audio.playCountdownTick();
        else this.audio.playCountdownGo();
      }

      if (this.countdownElapsedMs >= COUNTDOWN_DURATION_MS) {
        this.state = GAME_STATES.RACING;
        this.elapsedMs = 0;
        this.emitSnapshot(true);
      }
      return;
    }

    if (this.state === GAME_STATES.RACING || this.state === GAME_STATES.CRASHED) {
      this.elapsedMs += dt * 1000;
      this.advancePlayer(dt);
      this.advanceOpponents(dt);
      this.updateCollisionTimers(dt);
      this.checkCollisions();
      this.updateRaceProgress(dt);
    }
  }

  advancePlayer(dt) {
    const segments = this.track.segments;
    const segmentCount = segments.length;

    const curve = segments[findBaseSegmentIndex(this.player.z, segmentCount)].curve;

    const keyboardInput = toGameInput(this.inputState);
    const input = {
      throttle: keyboardInput.throttle || this.externalInput.throttle,
      brake: keyboardInput.brake || this.externalInput.brake,
      steerX: clamp(keyboardInput.steerX + this.externalInput.steerX, -1, 1),
    };
    const authorityScale = this.steeringPenaltyMs > 0 ? COLLISION_STEER_PENALTY : 1;

    this.player = updatePlayer(this.player, {
      input,
      curve,
      dt,
      authorityScale: authorityScale * this.level.steeringAuthority,
      roadEdge: this.level.roadEdge,
    });
    this.speedKph = speedToKph(this.player.speed);
    this.lastInput = input; // read by the audio update in tick(), after this frame's physics

    const groundY = getGroundElevation(segments, this.player.z);
    this.camera.x = this.player.x * this.level.roadWidth;
    this.camera.z = this.player.z;
    this.camera.y = CAMERA_HEIGHT + groundY;

    const isOffRoad = Math.abs(this.player.x) > this.level.roadEdge;
    this.lastIsOffRoad = isOffRoad;
    if (isOffRoad && !this.reducedMotion) {
      this.camera.x += (Math.random() - 0.5) * OFFROAD_VIBRATION_AMOUNT;
    }

    this.advanceDustParticles(dt, isOffRoad);
  }

  /** Off-road-only dust kicked up near the wheels — skipped entirely under reduced motion
   *  ("remove rapid motion effects"), but existing particles still fade out normally. */
  advanceDustParticles(dt, isOffRoad) {
    if (isOffRoad && !this.reducedMotion) {
      this.dustSpawnAccumulatorMs += dt * 1000;
      if (this.dustSpawnAccumulatorMs >= DUST_SPAWN_INTERVAL_MS) {
        this.dustSpawnAccumulatorMs = 0;
        spawnDustParticle(this.dustParticles, {
          viewportWidth: this.viewportWidth,
          viewportHeight: this.viewportHeight,
          maxParticles: DUST_MAX_PARTICLES,
        });
      }
    }
    updateDustParticles(this.dustParticles, dt, DUST_PARTICLE_LIFETIME_MS);
  }

  advanceOpponents(dt) {
    const playerRacer = { z: this.player.z, offset: this.player.x };
    this.opponents = updateOpponents(this.opponents, { segments: this.track.segments, dt, playerRacer });
  }

  updateCollisionTimers(dt) {
    const dtMs = dt * 1000;
    this.collisionCooldownMs = Math.max(0, this.collisionCooldownMs - dtMs);
    this.shakeRemainingMs = Math.max(0, this.shakeRemainingMs - dtMs);
    this.steeringPenaltyMs = Math.max(0, this.steeringPenaltyMs - dtMs);
    this.crashWobble *= Math.exp(-CRASH_WOBBLE_RECOVERY_RATE * dt);

    if (this.state === GAME_STATES.CRASHED) {
      this.crashRecoveryMs = Math.max(0, this.crashRecoveryMs - dtMs);
      if (this.crashRecoveryMs <= 0) {
        this.state = GAME_STATES.RACING;
        this.emitSnapshot(true);
      }
    }
  }

  /** On collision: knock the player's speed and line off, trigger a brief steering penalty
   *  and screen shake, and drop into a CRASHED state that auto-recovers — the race never
   *  stops, it just gets harder to control for under a second. */
  checkCollisions() {
    if (this.collisionCooldownMs > 0) return;

    const hit = findCollision(this.player, this.opponents);
    if (!hit) return;

    this.collisionCooldownMs = COLLISION_COOLDOWN_MS;
    this.crashRecoveryMs = COLLISION_COOLDOWN_MS;
    this.steeringPenaltyMs = COLLISION_COOLDOWN_MS;
    this.shakeRemainingMs = this.reducedMotion ? 0 : COLLISION_SHAKE_DURATION_MS;

    this.player.speed *= 1 - COLLISION_SPEED_LOSS_RATIO;

    const impulseSign = this.player.x >= hit.offset ? 1 : -1;
    const impulseMagnitude = this.reducedMotion ? COLLISION_LATERAL_IMPULSE * 0.3 : COLLISION_LATERAL_IMPULSE;
    this.player.x = clamp(this.player.x + impulseSign * impulseMagnitude, -OFFROAD_LIMIT, OFFROAD_LIMIT);

    // Cockpit tilts toward the impact side and recovers smoothly — see updateCollisionTimers.
    this.crashWobble = impulseSign * (this.reducedMotion ? CRASH_WOBBLE_MAGNITUDE * 0.3 : CRASH_WOBBLE_MAGNITUDE);
    // The struck opponent gets pushed away and leans harder before settling back onto its line.
    this.opponents = this.opponents.map((opponent) =>
      opponent.id === hit.id
        ? { ...opponent, hitWobble: -impulseSign * OPPONENT_HIT_WOBBLE_MAGNITUDE }
        : opponent
    );

    this.score = applyCollisionPenalty(this.score);
    this.sectorHadCollision = true;

    this.state = GAME_STATES.CRASHED;
    this.audio.playCollision();
    this.onEvent({ type: "collision" });
    this.emitSnapshot(true);
  }

  /** Distance score, live ranking/position (computed once per tick, not per draw call),
   *  overtake/clean-sector bonuses, and the finish check — all in one pass over this
   *  frame's positions. */
  updateRaceProgress(dt) {
    const speedPercent = clamp(this.player.speed / MAX_SPEED, 0, 1);
    this.score = accumulateDistanceScore(this.score, speedPercent, dt);

    const racers = [
      { id: PLAYER_ID, z: this.player.z },
      ...this.opponents.map((opponent) => ({ id: opponent.id, z: opponent.z })),
    ];
    const ranked = rankRacers(racers, this.track.length);
    this.racers = ranked.length;
    this.position = getPosition(ranked, PLAYER_ID);

    if (this.position < this.previousPosition) {
      this.score = applyOvertakeBonus(this.score);
      this.onEvent({ type: "overtake", position: this.position });
    }
    this.previousPosition = this.position;

    this.lap = Math.min(this.totalLaps, Math.floor(this.player.z / this.track.length) + 1);

    const sectorLength = this.track.length / SECTOR_COUNT;
    const totalSectors = SECTOR_COUNT * this.totalLaps;
    const currentSector = Math.min(totalSectors - 1, Math.floor(this.player.z / sectorLength));
    if (currentSector > this.sectorIndex) {
      if (!this.sectorHadCollision) {
        this.score = applyCleanSectorBonus(this.score);
      }
      this.sectorIndex = currentSector;
      this.sectorHadCollision = false;
    }

    if (this.player.z >= this.track.length * this.totalLaps) {
      this.finishRace();
    }
  }

  finishRace() {
    this.score = applyFinishBonus(this.score, this.position);
    this.state = GAME_STATES.FINISHED;

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      setBestScore(this.bestScore);
    }
    if (this.bestTime === 0 || this.elapsedMs < this.bestTime) {
      this.bestTime = this.elapsedMs;
      setBestTime(this.bestTime);
    }

    this.audio.playFinish();
    this.onEvent({ type: "finish", position: this.position, racers: this.racers });
    this.emitSnapshot(true);
  }

  renderFrame() {
    const ctx = this.ctx;
    if (!ctx || !this.theme || !this.track.segments.length) return;

    const baseSegmentIndex = findBaseSegmentIndex(this.camera.z, this.track.segments.length);
    const leanScale = this.reducedMotion ? 0.25 : 1;

    // The only thing "animating" in the idle scene: a slow, subtle cockpit sway standing
    // in for an idling engine. Reuses the same lean/roll pipeline as gameplay lean, so it's
    // free — no separate render path — and automatically respects reduced motion.
    const effectiveLean =
      this.state === GAME_STATES.IDLE
        ? Math.sin((this.idleElapsedMs / IDLE_SWAY_PERIOD_MS) * Math.PI * 2) * IDLE_SWAY_AMPLITUDE
        : clamp(this.player.lean + this.crashWobble, -1.3, 1.3);

    const renderTheme = { ...this.theme, ...this.level.palette };
    renderBackdrop(ctx, {
      viewportWidth: this.viewportWidth,
      viewportHeight: this.viewportHeight,
      theme: renderTheme,
      camera: this.camera,
      sceneryElapsedMs: this.sceneryElapsedMs,
      speedPercent: clamp(this.player.speed / MAX_SPEED, 0, 1),
    });

    const rollRad = (effectiveLean * CAMERA_COUNTER_ROLL_MAX_DEGREES * leanScale * Math.PI) / 180;
    const cx = this.viewportWidth / 2;
    const cy = this.viewportHeight / 2;

    const shakeProgress = this.shakeRemainingMs / COLLISION_SHAKE_DURATION_MS;
    const shakeAmount = shakeProgress * this.viewportWidth * SCREEN_SHAKE_INTENSITY;
    const shakeX = shakeAmount ? (Math.random() - 0.5) * 2 * shakeAmount : 0;
    const shakeY = shakeAmount ? (Math.random() - 0.5) * 2 * shakeAmount : 0;

    ctx.save();
    ctx.translate(cx + shakeX, cy + shakeY);
    ctx.rotate(rollRad);
    ctx.translate(-cx, -cy);

    renderRoad(ctx, {
      segments: this.track.segments,
      camera: this.camera,
      viewportWidth: this.viewportWidth,
      viewportHeight: this.viewportHeight,
      drawDistance: DRAW_DISTANCE,
      roadWidth: this.level.roadWidth,
      lanes: LANES,
      theme: renderTheme,
      baseSegmentIndex,
      segmentLength: SEGMENT_LENGTH,
      finishZ: this.track.length * this.totalLaps,
    });

    renderOpponents(ctx, {
      opponents: this.opponents,
      camera: this.camera,
      viewportWidth: this.viewportWidth,
      viewportHeight: this.viewportHeight,
      roadWidth: this.level.roadWidth,
      segments: this.track.segments,
      segmentLength: SEGMENT_LENGTH,
    });

    ctx.restore();

    // Screen-space, drawn after restore() like the cockpit — dust is a near-camera overlay
    // effect, not world geometry (see the comment in scenery.js for why).
    if (this.dustParticles.length) {
      renderDustParticles(ctx, {
        particles: this.dustParticles,
        viewportWidth: this.viewportWidth,
        theme: this.theme,
        lifetimeMs: DUST_PARTICLE_LIFETIME_MS,
      });
    }

    renderCockpit(ctx, {
      viewportWidth: this.viewportWidth,
      viewportHeight: this.viewportHeight,
      lean: effectiveLean,
      angleDegrees: BIKE_LEAN_MAX_DEGREES * leanScale,
      theme: this.theme,
    });
  }

  emitSnapshot(force = false) {
    this.onSnapshot(this.getSnapshot(), force);
  }

  getSnapshot() {
    return {
      state: this.state,
      score: this.score,
      bestScore: this.bestScore,
      speedKph: this.speedKph,
      position: this.position,
      racers: this.racers,
      lap: this.lap,
      totalLaps: this.totalLaps,
      level: this.level.number,
      totalLevels: LEVELS.length,
      difficulty: this.level.name,
      circuit: this.level.circuit,
      hasNextLevel: this.levelIndex < LEVELS.length - 1,
      trackProgress:
        this.state === GAME_STATES.FINISHED
          ? 1
          : ((this.player.z % this.track.length) + this.track.length) % this.track.length / this.track.length,
      circuitLength: this.level.lengthLabel,
      circuitTurns: this.level.turnCount,
      circuitSectors: this.level.sectors,
      elapsedMs: this.elapsedMs,
      countdownValue: this.countdownValue,
    };
  }

  destroy() {
    this.stopLoop();
    this.audio.destroy();
    if (this.controlsElement) {
      this.controlsElement.removeEventListener("keydown", this.handleKeyDown);
      this.controlsElement.removeEventListener("keyup", this.handleKeyUp);
      this.controlsElement = null;
    }
    this.canvas = null;
    this.ctx = null;
    this.theme = null;
    this.onSnapshot = noop;
    this.onEvent = noop;
  }
}
