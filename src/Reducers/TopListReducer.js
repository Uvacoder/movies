import {
  FETCH_TOP_RATED,
  CLEAR_TOPLIST,
} from 'actions/TopListActions';

const initialState = {
  results: [],
}

export function topRatedMovies (state = initialState, action) {
  switch(action.type) {
  case FETCH_TOP_RATED:
    return Object.assign({}, state, {
      results: action.topRatedMovies,
    })
  case CLEAR_TOPLIST:
    return Object.assign({}, state, {
      results: action.topRatedMovies,
    })
  default:
    return state
  }
}
