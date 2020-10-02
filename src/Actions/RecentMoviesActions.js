import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';
import { getRecentMoviesTypeUrl } from 'actions/RecentMoviesActionsUtil'

export const FETCH_RECENT_MOVIES = 'recent/FETCH_RECENT_MOVIES';
export const FETCH_NEXT_PAGE_OF_RECENT_MOVIES = 'recent/FETCH_NEXT_PAGE_OF_RECENT_MOVIES';

export const fetchRecentMovies = (type) => {
	return async dispatch => {
		const searched = await Communication.get(TMDBApi.get(`${getRecentMoviesTypeUrl(type)}`, {
			language:'en-US',
			page: '1',
			region:'US'
		}));

		await Promise.all(searched.results.map(async item => {
			const searchedDetails = await	Communication.get(TMDBApi.get(`movie/${item.id}`,{
				append_to_response: 'credits'
			}));	
			item.details = searchedDetails; 
		}));

		dispatch({ 
			type: FETCH_RECENT_MOVIES,
			recentMovies: searched.results,
			numberOfPages: searched.total_pages
		});
	};  
};

export const fetchNextPageOfRecentMovies = (type, page) => {
	return async dispatch => {
		const searched = await Communication.get(TMDBApi.get(`${getRecentMoviesTypeUrl(type)}`, {
			language:'en-US',
			page,
			region:'US'
		}));

		await Promise.all(searched.results.map(async item => {
			const searchedDetails = await	Communication.get(TMDBApi.get(`movie/${item.id}`,{
				append_to_response: 'credits'
			}));	
			item.details = searchedDetails; 
		}));

		dispatch({ 
			type: FETCH_NEXT_PAGE_OF_RECENT_MOVIES,
			recentMovies: searched.results,
		});
	};  
}; 
