import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';
import Calculation from 'utils/Calculation';

export const FETCH_TRENDING = 'homePage/FETCH_TRENDING';
export const FETCH_UPCOMMING ='homePage/FETCH_UPCOMMING';
export const FETCH_RANDOM ='homePage/FETCH_RANDOM';
export const CLEANUP_RANDOM ='homePage/CLEANUP_RANDOM';

const FIRST_PAGE_TO_DRAW = 1;
const LAST_PAGE_TO_DRAW = 100;
const FIRST_MOVIE_TO_DRAW = 1;
const LAST_MOVIE_TO_DRAW = 20;

export const fetchTrending = () => {
	return async dispatch => {
		try {
			const movies = await Communication.get(TMDBApi.get('trending/all/day'))

			dispatch({ 
				type: FETCH_TRENDING,
				trending: {
					items: movies.results,
				}
			})
		} catch (error) {
			console.error('TBMD API fetching trending', error)
		};
	};  
}; 

export const fetchUpcomming = () => {
	return  async dispatch => {
		try {
			const movies = await Communication.get(TMDBApi.get('movie/upcoming',{
				language: 'en-US',
				page: '1',
				region:'US'
			}));

			dispatch({ 
				type: FETCH_UPCOMMING,
				upcomming: {
					items: movies.results,
				}
			})
		} catch (error) {
			console.error('TBMD API fetching upcomming', error)
		};
	};  
}; 

export const fetchRandom = () => {
	const randomMoviePage = Calculation.randomInt(FIRST_PAGE_TO_DRAW, LAST_PAGE_TO_DRAW);
	const randomMovie = Calculation.randomInt(FIRST_MOVIE_TO_DRAW, LAST_MOVIE_TO_DRAW);

	return async dispatch => {
		try {
			const movies = await Communication.get(TMDBApi.get('discover/movie',{
				language: 'en-US',
				sort_by: 'vote_count.desc',
				include_adult: 'false',
				include_video: 'true',
				page: randomMoviePage
			}));
			const videoKeyResult = await Communication.get(TMDBApi.get(`movie/${movies.results[randomMovie].id}/videos`, {
					language: 'en-US',
				}));	
			const shuffledMovie = movies.results[randomMovie];

			shuffledMovie.videoKey = videoKeyResult.results[0];

			dispatch({ 
				type: FETCH_RANDOM,
				random: shuffledMovie
			});
		} catch (error) {
			console.error('TBMD API random movie', error)
		};
	};  
};
