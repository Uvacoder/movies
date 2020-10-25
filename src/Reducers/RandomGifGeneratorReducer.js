import {
  FETCH_RANDOM_GIF,
  CLEAR_RANDOM_GIF
} from '../Actions/RadnomGifGeneratorActions';

const initialState = {
  word: undefined,
  gif: undefined
};

export function randomGifGenerator (state = initialState, action) {
  switch (action.type) {
  case FETCH_RANDOM_GIF:
    return Object.assign({}, state, {
      word: action.word,
      gif: action.gif
    })
  case CLEAR_RANDOM_GIF:
    return Object.assign({}, state, {
      word: action.word,
      gif: action.gif
    })
  default:
    return state;
  };
};
