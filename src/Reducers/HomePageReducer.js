import {
  FETCH_TRENDING,
  FETCH_UPCOMMING,
  FETCH_RANDOM,
  CLEAR_RANDOM,
  CLEAR_UPCOMMING
} from '../Actions/HomePageActions';

const initialState = {
  trending: {
    items: []
  },
  upcomming: {
    items: []
  },
  random: {}
};

export function homePage (state = initialState,action) {
  switch (action.type) {
  case FETCH_TRENDING:
    return Object.assign({}, state, {
      trending: action.trending,
    })
  case FETCH_UPCOMMING:
    return Object.assign({}, state, {
      upcomming: action.upcomming,
    })
  case FETCH_RANDOM:
    return Object.assign({}, state, {
      random: action.random,
    })
  case CLEAR_RANDOM:
    return Object.assign({}, state, {
      random: initialState.random
    })
  case CLEAR_UPCOMMING:
    return Object.assign({}, state, {
      upcomming: initialState.upcomming
    })
  default:
    return state;
  };
};
