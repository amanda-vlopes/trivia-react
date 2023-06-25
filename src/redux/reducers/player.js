import { ADD_ASSERTIONS, ADD_SCORE, CLEAR_SCORE, SAVE_PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  case CLEAR_SCORE:
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default player;
