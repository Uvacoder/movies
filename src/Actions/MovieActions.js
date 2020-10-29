import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';

export const FETCH_MOVIE_DETAILS = 'movie/FETCH_MOVIE_DETAILS';
export const CLEAR_MOVIE_DETAILS = 'movie/CLEAR_MOVIE_DETAILS';

const MOVIE_DETAILS_LANGUAGE = 'en-US';
const MOVIE_DETAILS_PAGE = "1";

export function fetchMovieDetails(Id) {
  return async dispatch => {
    try {
      const movieDetailsPromise = Communication.get({
        path: TMDBApi.get(`movie/${Id}`,{
          append_to_response: 'videos,images,credits'
        }),
        useLoader: true
      });
      const similarMoviesPromise = Communication.get({
        path: TMDBApi.get(`movie/${Id}/recommendations`,{
          language: MOVIE_DETAILS_LANGUAGE,
          page: MOVIE_DETAILS_PAGE
        }),
        useLoader: true
      });
      const movieReviewsPromise = Communication.get({
        path: TMDBApi.get(`movie/${Id}/reviews`,{
          language: MOVIE_DETAILS_LANGUAGE,
          page: MOVIE_DETAILS_PAGE
        }),
        useLoader: true
      });
      const externalIdsPromise = Communication.get({
        path: TMDBApi.get(`movie/${Id}/external_ids`),
        useLoader: true
      });
      const [
        movieDetails, 
        similarMovies, 
        movieReviews, 
        externalIds
      ] = await Promise.all([movieDetailsPromise, similarMoviesPromise, movieReviewsPromise, externalIdsPromise]);

      return dispatch({ 
        type: FETCH_MOVIE_DETAILS,
        details: movieDetails,
        similarMovies,
        movieReviews,
        externalIds
      });	
    } catch (error) {
      console.error('TBMD API fetching movie details', error)
    };
  };   
};

export function clearMovieDetails() {
  return dispatch => {
    dispatch({ 
      type: CLEAR_MOVIE_DETAILS,
    });	
  };
};