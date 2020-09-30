import {
  FETCH_RECENT_MOVIES,
} from 'actions/RecentMoviesActions';

const initialState = {
  results: [],
}

export function recentMovies (state = initialState, action) {
  switch(action.type) {
  case FETCH_RECENT_MOVIES:
    return Object.assign({}, state, {
      results: action.recentMovies,
    })
  default:
    return state
  };
};
