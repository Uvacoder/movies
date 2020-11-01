import {
  FETCH_TOP_LIST,
  FETCH_NEXT_PAGE_OF_TOP_LIST,
  CLEAR_TOP_LIST
} from 'actions/TopListActions';

const initialState = {
  results: [],
  numberOfPages: 0
};

export function topListOfMovies (state = initialState, action) {
  switch(action.type) {
  case FETCH_TOP_LIST:
    return Object.assign({}, state, {
      results: action.topRatedMovies,
      numberOfPages: action.numberOfPages
    })
  case FETCH_NEXT_PAGE_OF_TOP_LIST:
    return Object.assign({}, state, {
      results: [...state.results, ...action.topRatedMovies],
    })
  case CLEAR_TOP_LIST:
    return Object.assign({}, state, initialState)
  default:
    return state
  };
};
