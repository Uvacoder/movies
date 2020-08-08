import {
    FETCH_MOVIE_DETAILS
  } from '../Actions/MovieActions';
  
  const initialState = {
    details: {},
    similarMovies: [],
    reviews: [],
    externalIds: []
  }
  
  export function movieDetails (state = initialState, action) {
    switch(action.type) {
    case FETCH_MOVIE_DETAILS:
      return Object.assign({}, state, {
        details: action.details,
        similarMovies: action.similarMovies.results,
        reviews: action.movieReviews.results,
        externalIds: action.externalIds
      })
    default:
      return state
    }
  }
  