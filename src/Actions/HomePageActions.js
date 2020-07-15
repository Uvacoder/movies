import Communication from '../Communication/Communication';

export const FETCH_TRENDING = 'FETCH_TRENDING';
export const FETCH_UPCOMMING ='FETCH_UPCOMMING'

const TRENDING_API = 'https://api.themoviedb.org/3/trending/all/day?api_key=87f688d5cb704339968f87fae03f38cd'
const UPCOMMING_API = 'https://api.themoviedb.org/3/movie/upcoming?api_key=87f688d5cb704339968f87fae03f38cd&language=EN&page=1&region=US'

export const fetchTrending = () => {
	return dispatch => {
		Communication.get(TRENDING_API,dispatch).then(json => {
			dispatch({ 
				type: FETCH_TRENDING,
				trending: {
					items: json.results,
				}
			})
		})
	};  
}; 

export const fetchUpcomming = () => {
	return dispatch => {
			Communication.get(UPCOMMING_API).then(json => {
				dispatch({ 
					type: FETCH_UPCOMMING,
					upcomming: {
						items: json.results,
					}
				})
			})
	};  
}; 
