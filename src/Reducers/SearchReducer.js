import {
  FETCH_SEARCHED,
  CLEAR_SEARCHED,
  FETCH_NEXT_PAGE_OF_SEARCHED
} from 'actions/SearchActions';

const initialState = {
  results: [],
  phrase: '',
  numberOfPages: 0
}

export function searchResults (state = initialState, action) {
  switch(action.type) {
  case FETCH_SEARCHED:
    return Object.assign({}, state, {
      results: action.searchResults,
      phrase: action.phrase,
      numberOfPages: action.numberOfPages
    })
  case FETCH_NEXT_PAGE_OF_SEARCHED:
    return Object.assign({}, state, {
      results: [...state.results, ...action.searchResults],
    })
  case CLEAR_SEARCHED:
    return Object.assign({}, state, {
      results: action.searchResults,
      phrase: action.phrase,
      numberOfPages: action.numberOfPages
    })
  default:
    return state
  }
}
