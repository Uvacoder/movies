import {
  FETCH_TOP_LIST,
  FETCH_NEXT_PAGE_OF_TOP_LIST
} from 'actions/TopListActions';

const initialState = {
  results: [],
}

export function topListOfMovies (state = initialState, action) {
  switch(action.type) {
  case FETCH_TOP_LIST:
    return Object.assign({}, state, {
      results: action.topRatedMovies,
    })
  case FETCH_NEXT_PAGE_OF_TOP_LIST:
    return Object.assign({}, state, {
      results: [...state.results, ...action.topRatedMovies],
    })
  default:
    return state
  };
};
