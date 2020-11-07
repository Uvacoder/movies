import {
  ADD_USER_RATING,
  FETCH_ALL_USER_RATINGS,
  EDIT_USER_RATING
} from 'actions/UserActions';

const initialState = {
  movies: [],
  moviesFetched: false
};

export function userRating (state = initialState, action) {
  switch(action.type) {
  case ADD_USER_RATING:
    return Object.assign({}, state, {
      movies: [...state.movies, action.movieRate]
    })
  case EDIT_USER_RATING:
    const oldVote = state.movies.find(i => i.movieId === action.movieId)
    const movieIndex = state.movies.findIndex(i => i.movieId === action.movieId)
    const newVote = Object.assign( {}, oldVote, {
      movieId: action.movieId,
      rateValue: action.movieRate.rateValue,
      comment: action.movieRate.comment
    })
    const newMovies = [...state.movies];
    newMovies[movieIndex] = newVote;

    return Object.assign({}, state, {
      movies: newMovies
    })
  case FETCH_ALL_USER_RATINGS:
    return Object.assign({}, state, {
      movies: action.movieRates,
      moviesFetched: true
    })
  default:
    return state
  };
};
