import {
  FETCH_SEARCHED
} from 'actions/SearchActions';

const initialState = {
  results: {}
}

export function searchResults (state = initialState, action) {
  switch(action.type) {
  case FETCH_SEARCHED:
    return Object.assign({}, state, {
      results: action.searchResults,
    })
  default:
    return state
  }
}
