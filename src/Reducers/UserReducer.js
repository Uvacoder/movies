import {
  ADD_USER_RATING,
  ADD_ALL_USER_RATINGS
} from 'actions/UserActions';

const initialState = {
  movies: []
}

export function userRating (state = initialState, action) {
  switch(action.type) {
  case ADD_USER_RATING:
    return Object.assign({}, state, {
      movies: [...state.movies, action.movieRate]
    })
  case ADD_ALL_USER_RATINGS: // fetchalluser ratings
    return Object.assign({}, state, {
      movies: action.movieRates
    })
  default:
    return state
  };
};
