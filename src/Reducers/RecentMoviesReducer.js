import {
  FETCH_RECENT_MOVIES,
  FETCH_NEXT_PAGE_OF_RECENT_MOVIES,
  CLEAR_RECENT_MOVIES
} from 'actions/RecentMoviesActions';

const initialState = {
  results: [],
  numberOfPages: 0
};

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
  case CLEAR_RECENT_MOVIES:
    return Object.assign({}, state, initialState)
  default:
    return state
  };
};
