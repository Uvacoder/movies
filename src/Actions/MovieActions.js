import Communication from '../Communication/Communication';

export const FETCH_MOVIE_DETAILS = 'movie/FETCH_MOVIE_DETAILS';


// const MOVIE_DETAILS_API = `https://api.themoviedb.org/3/movie/${Id}?api_key=87f688d5cb704339968f87fae03f38cd&append_to_response=videos,images,credits`

const getMovieDetailsURL = (Id) => `https://api.themoviedb.org/3/movie/${Id}?api_key=87f688d5cb704339968f87fae03f38cd&append_to_response=videos,images,credits`

export const fetchMovieDetails = (Id) => {
	return dispatch => {
		Communication.get(getMovieDetailsURL(Id)).then(json => {
			dispatch({ 
				type: FETCH_MOVIE_DETAILS,
				details: json,	
			});
		});
	};  
}; 
