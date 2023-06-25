export const SAVE_PLAYER = 'SAVE_PLAYER';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const CLEAR_SCORE = 'CLEAR_SCORE';
const TEN = 10;

export const savePlayer = (name, email) => ({
  type: SAVE_PLAYER,
  name,
  email,
});

export const addScore = (timer, difficulty) => ({
  type: ADD_SCORE,
  payload: TEN + (timer * difficulty),
});

export const addAssertions = () => ({
  type: ADD_ASSERTIONS,
  payload: 1,
});

export const clearScore = () => ({
  type: CLEAR_SCORE,
});
