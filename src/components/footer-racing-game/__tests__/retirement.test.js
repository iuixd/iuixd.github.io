import { describe, expect, it, vi } from "vitest";
import { GameEngine } from "../engine/GameEngine";
import { GAME_STATES } from "../engine/constants";

describe("race retirement", () => {
  it("immediately pauses when the rider stops beside the track", () => {
    const onSnapshot = vi.fn();
    const onEvent = vi.fn();
    const engine = new GameEngine({ onSnapshot, onEvent });
    engine.state = GAME_STATES.RACING;
    engine.player.x = engine.level.roadEdge + 0.1;
    engine.player.speed = 0;

    engine.update(1 / 60);

    expect(engine.state).toBe(GAME_STATES.PAUSED);
    expect(onSnapshot.mock.calls.at(-1)[0].state).toBe(GAME_STATES.PAUSED);
    expect(onEvent).toHaveBeenCalledWith({ type: "paused", reason: "stopped-off-road" });
  });

  it("records a DNF without completion bonuses or best-result updates", () => {
    const onEvent = vi.fn();
    const engine = new GameEngine({ onEvent });
    engine.audio.silence = vi.fn();
    engine.state = GAME_STATES.PAUSED;
    engine.score = 875;
    engine.bestScore = 2400;
    engine.bestTime = 90000;

    expect(engine.retireRace()).toBe(true);
    expect(engine.state).toBe(GAME_STATES.RETIRED);
    expect(engine.score).toBe(875);
    expect(engine.bestScore).toBe(2400);
    expect(engine.bestTime).toBe(90000);
    expect(engine.getSnapshot()).toMatchObject({
      resultStatus: "dnf",
      resultReason: "retired",
    });
    expect(onEvent).toHaveBeenCalledWith({ type: "retired", reason: "retired" });
    expect(engine.audio.silence).toHaveBeenCalledOnce();
  });

  it("cannot retire outside an active or paused race", () => {
    const engine = new GameEngine();
    expect(engine.state).toBe(GAME_STATES.IDLE);
    expect(engine.retireRace()).toBe(false);
    expect(engine.state).toBe(GAME_STATES.IDLE);
    expect(engine.resultStatus).toBeNull();
  });
});
