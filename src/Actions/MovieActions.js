import Communication from '../Communication/Communication';

export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';


const getMovieDetailsURL = (Id) => `https://api.themoviedb.org/3/movie/${Id}?api_key=87f688d5cb704339968f87fae03f38cd&append_to_response=videos,images,credits`
const getSimilarMovieURL = (Id) => `https://api.themoviedb.org/3/movie/${Id}/recommendations?api_key=87f688d5cb704339968f87fae03f38cd&language=en-US&page=1`
const getCommentsURL = (Id) => `https://api.themoviedb.org/3/movie/${Id}/reviews?api_key=87f688d5cb704339968f87fae03f38cd&language=en-US&page=1`
const getExternalIds = (Id) => `https://api.themoviedb.org/3/movie/${Id}/external_ids?api_key=87f688d5cb704339968f87fae03f38cd`

export const fetchMovieDetails = (Id) => {
	return async dispatch => {
		const movieDetails = await Communication.get(getMovieDetailsURL(Id))
		const similarMovies = await Communication.get(getSimilarMovieURL(Id))
		const movieReviews = await Communication.get(getCommentsURL(Id))
		const externalIds = await Communication.get(getExternalIds(Id))

			dispatch({ 
				type: FETCH_MOVIE_DETAILS,
				details: movieDetails,
				similarMovies,
				movieReviews,
				externalIds
			});
		
	};  
}; 
