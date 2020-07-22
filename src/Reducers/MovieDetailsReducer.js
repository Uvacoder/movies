import {
    FETCH_MOVIE_DETAILS
  } from '../Actions/MovieActions';
  
  const initialState = {
    details: {},
    lastUpdated: Date.now(),
  }
  
  export function movieDetails (state = initialState,action) {
    switch (action.type) {
    case FETCH_MOVIE_DETAILS:
      return Object.assign({}, state, {
        details: action.details,
      })
    default:
      return state
    }
  }
  