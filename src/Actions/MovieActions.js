import Communication from 'communication/Communication';
import Api from 'utils/Api';

export const FETCH_MOVIE_DETAILS = 'movie/FETCH_MOVIE_DETAILS';

export const fetchMovieDetails = (Id) => {
	return async dispatch => {
		const movieDetails = await Communication.get(Api.get(`movie/${Id}`,{
			append_to_response: 'videos,images,credits'
		}))
		const similarMovies = await Communication.get(Api.get(`movie/${Id}/recommendations`,{
			language: 'en-US',
			page: '1'
		}))
		const movieReviews = await Communication.get(Api.get(`movie/${Id}/reviews`,{
			language: 'en-US',
			page: '1'
		}))
		const externalIds = await Communication.get(Api.get(`movie/${Id}/external_ids`))

		dispatch({ 
			type: FETCH_MOVIE_DETAILS,
			details: movieDetails,
			similarMovies,
			movieReviews,
			externalIds
		});	
	};  
}; 