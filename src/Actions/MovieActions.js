import Communication from '../Communication/Communication';
import Api from '../Utils/Api';

export const FETCH_MOVIE_DETAILS = 'movie/FETCH_MOVIE_DETAILS';

const getMovieDetailsURL = (Id) => Api.get(`movie/${Id}`,{
	append_to_response: 'videos,images,credits'
})

export const fetchMovieDetails = (Id) => {
	return async dispatch => {
		const movie = await Communication.get(getMovieDetailsURL(Id))
		
			dispatch({ 
				type: FETCH_MOVIE_DETAILS,
				details: movie,	
			});
	};  
}; 