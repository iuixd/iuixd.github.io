const KEY_TO_FIELD = {
  ArrowUp: "up",
  w: "up",
  W: "up",
  ArrowDown: "down",
  s: "down",
  S: "down",
  ArrowLeft: "left",
  a: "left",
  A: "left",
  ArrowRight: "right",
  d: "right",
  D: "right",
};

export function createInputState() {
  return { up: false, down: false, left: false, right: false };
}

export function isMovementKey(key) {
  return key in KEY_TO_FIELD;
}

export function applyKeyChange(inputState, key, isDown) {
  const field = KEY_TO_FIELD[key];
  if (!field || inputState[field] === isDown) return inputState;
  return { ...inputState, [field]: isDown };
}

export function toGameInput(inputState) {
  return {
    throttle: inputState.up,
    brake: inputState.down,
    steerX: (inputState.right ? 1 : 0) - (inputState.left ? 1 : 0),
  };
}
