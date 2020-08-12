import Communication from 'communication/Communication';
import Api from 'utils/Api';

export const FETCH_MOVIE_DETAILS = 'movie/FETCH_MOVIE_DETAILS';

export function fetchMovieDetails(Id) {
	return async dispatch => {
		const [
			movieDetails, 
			similarMovies, 
			movieReviews, 
			externalIds
		] = await Promise.all([
			Communication.get(Api.get(`movie/${Id}`,{
				append_to_response: 'videos,images,credits'
			})),
			Communication.get(Api.get(`movie/${Id}/recommendations`,{
				language: 'en-US',
				page: '1'
			})),
			Communication.get(Api.get(`movie/${Id}/reviews`,{
				language: 'en-US',
				page: '1'
			})),
			Communication.get(Api.get(`movie/${Id}/external_ids`))
		]);

		return dispatch({ 
			type: FETCH_MOVIE_DETAILS,
			details: movieDetails,
			similarMovies,
			movieReviews,
			externalIds
		});	
	};   
};