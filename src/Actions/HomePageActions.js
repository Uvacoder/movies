import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';
import Calculation from 'utils/Calculation';

export const FETCH_TRENDING = 'homePage/FETCH_TRENDING';
export const FETCH_UPCOMMING ='homePage/FETCH_UPCOMMING';
export const FETCH_RANDOM ='homePage/FETCH_RANDOM';
export const CLEANUP_RANDOM ='homePage/CLEANUP_RANDOM';

const randomMoviePage = Calculation.randomInt(1, 100);

export const fetchTrending = () => {
	return async dispatch => {
		const movies = await Communication.get(TMDBApi.get('trending/all/day'))

			dispatch({ 
				type: FETCH_TRENDING,
				trending: {
					items: movies.results,
				}
		})
	};  
}; 

export const fetchUpcomming = () => {
	return  async dispatch => {
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
	};  
}; 

export const fetchRandom = (randomMovieId) => {
	return async dispatch => {
		const movies = await Communication.get(TMDBApi.get('discover/movie',{
				language: 'en-US',
				sort_by: 'vote_count.desc',
				include_adult: 'false',
				include_video: 'true',
				page: randomMoviePage
			}));
		const items = movies.results;

		await Promise.all(items.map(async item => {
		const videoKeyResult = await Communication.get(TMDBApi.get(`movie/${item.id}/videos`,{
				language: 'en-US',
			}));	
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
