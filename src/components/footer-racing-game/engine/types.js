/**
 * @typedef {"idle"|"ready"|"countdown"|"racing"|"crashed"|"finished"|"paused"} GameState
 */

/**
 * Throttled, React-facing view of engine state. Never updated per animation frame.
 * @typedef {Object} GameSnapshot
 * @property {GameState} state
 * @property {number} score
 * @property {number} bestScore
 * @property {number} speedKph
 * @property {number} position
 * @property {number} racers
 * @property {number} lap
 * @property {number} totalLaps
 * @property {number} elapsedMs
 * @property {number} countdownValue
 */

/**
 * @typedef {Object} RoadPoint
 * @property {number} x
 * @property {number} y
 * @property {number} z
 */

/**
 * @typedef {Object} TrackSprite
 * @property {string} type
 * @property {number} offset
 */

/**
 * @typedef {Object} RoadSegment
 * @property {number} index
 * @property {number} worldZ
 * @property {number} curve
 * @property {number} elevation
 * @property {RoadPoint} p1
 * @property {RoadPoint} p2
 * @property {TrackSprite[]} sprites
 */

export {};
