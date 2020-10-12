import {
  ADD_USER_RATING,
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
  default:
    return state
  };
};
