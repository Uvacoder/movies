import Communication from '../Communication/Communication';

export const FETCH_TRENDING = 'homePage/FETCH_TRENDING';
export const FETCH_UPCOMMING ='homePage/FETCH_UPCOMMING';
export const FETCH_RANDOM ='homePage/FETCH_RANDOM';
export const CLEANUP_RANDOM ='homePage/CLEANUP_RANDOM';

let randomMoviePage = randomInt(1, 100);
const TRENDING_API = 'https://api.themoviedb.org/3/trending/all/day?api_key=87f688d5cb704339968f87fae03f38cd'
const UPCOMMING_API = 'https://api.themoviedb.org/3/movie/upcoming?api_key=87f688d5cb704339968f87fae03f38cd&language=EN&page=1&region=US'
const RANDOM_API = `https://api.themoviedb.org/3/discover/movie?api_key=87f688d5cb704339968f87fae03f38cd&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=${randomMoviePage}`;

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

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


export const fetchRandom = (randomMovieId) => {
	return async dispatch => {

		const movies = await Communication.get(RANDOM_API);
		const items = movies.results;

		await Promise.all(items.map(async item => {
			const videoKeyResult = await Communication.get(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=87f688d5cb704339968f87fae03f38cd&language=en-US`)
			
			item.videoKey = videoKeyResult.results; 
		}));

		dispatch({ 
			type: FETCH_RANDOM,
			random: {
				items: movies.results,
			}
		})
	};  
};

// export const cleanUpFetchRandom = () => {
// 	return {
// 		type: CLEANUP_RANDOM,
// 		random: {
// 			items: null,
// 		}
// 	};  
// }; 
