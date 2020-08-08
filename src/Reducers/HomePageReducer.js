import {
  FETCH_TRENDING,
  FETCH_UPCOMMING,
  FETCH_RANDOM,
  // CLEANUP_RANDOM,
} from '../Actions/HomePageActions';

const initialState = {
  trending: {
    items: []
  },
  upcomming: {
    items: []
  },
  random: {
    items: [],
    videoKey: []
  }
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
  default:
    return state;
  }
}
