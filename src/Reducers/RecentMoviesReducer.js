import {
  FETCH_RECENT_MOVIES,
  FETCH_NEXT_PAGE_OF_RECENT_MOVIES
} from 'actions/RecentMoviesActions';

const initialState = {
  results: [],
}

export function recentMovies (state = initialState, action) {
  switch(action.type) {
  case FETCH_RECENT_MOVIES:
    return Object.assign({}, state, {
      results: action.recentMovies,
      numberOfPages: action.numberOfPages
    })
  case FETCH_NEXT_PAGE_OF_RECENT_MOVIES:
    return Object.assign({}, state, {
      results: [...state.results, ...action.recentMovies]
    })
  default:
    return state
  };
};
