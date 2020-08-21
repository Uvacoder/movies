import { push } from 'connected-react-router'

export const routeToMovieDetails = (movieId) => {
  return push(`/movie/${movieId}`)
};
