import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';
import { getTopListTypeUrl } from 'actions/TopListActionsUtil'

export const FETCH_TOP_LIST = 'toplist/FETCH_TOP_LIST';
export const FETCH_NEXT_PAGE_OF_TOP_LIST = 'toplist/FETCH_NEXT_PAGE_OF_TOP_LIST';

export const fetchTopList = (type) => {
	return async dispatch => {
		const searched = await Communication.get(TMDBApi.get(`${getTopListTypeUrl(type)}`, {
			language:'en-US',
			page: '1',
			region: 'US',
		}));

		await Promise.all(searched.results.map(async item => {
			const searchedDetails = await	Communication.get(TMDBApi.get(`movie/${item.id}`,{
				append_to_response: 'credits'
			}));	
			item.details = searchedDetails; 
		}));

		dispatch({ 
			type: FETCH_TOP_LIST,
			topRatedMovies: searched.results,
			numberOfPages: searched.total_pages
		});
	};  
};

export const fetchNextPageOfTopList = (type, page) => {
	return async dispatch => {
		const searched = await Communication.get(TMDBApi.get(`${getTopListTypeUrl(type)}`, {
			language:'en-US',
			page,
			region: 'US',
		}));

		await Promise.all(searched.results.map(async item => {
			const searchedDetails = await	Communication.get(TMDBApi.get(`movie/${item.id}`,{
				append_to_response: 'credits'
			}));	
			item.details = searchedDetails; 
		}));

		dispatch({ 
			type: FETCH_NEXT_PAGE_OF_TOP_LIST,
			topRatedMovies: searched.results,
		});
	};  
}; 