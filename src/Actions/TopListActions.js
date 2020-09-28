import Communication from 'communication/Communication';
import Api from 'utils/Api';
import { getTopListTypeUrl } from 'actions/TopListActionsUtil'

export const FETCH_TOP_LIST = 'toplist/FETCH_TOP_LIST';
export const FETCH_NEXT_PAGE_OF_TOP_LIST = 'toplist/FETCH_NEXT_PAGE_OF_TOP_LIST';

export const fetchTopList = (type) => {

	return async dispatch => {
		const searched = await Communication.get(Api.get(`${getTopListTypeUrl(type)}`, {
			language:'en-US',
			page: '1',
			region: 'US',
		}));

	const items = searched.results

	await Promise.all(items.map(async item => {
		const searchedDetails = await	Communication.get(Api.get(`movie/${item.id}`,{
			append_to_response: 'credits'
		}));	
		item.details = searchedDetails; 
	}));

		dispatch({ 
			type: FETCH_TOP_LIST,
			topRatedMovies: searched.results,
		});
	};  
};

export const fetchNextPageOfTopList = (type, page) => {

	return async dispatch => {
		const searched = await Communication.get(Api.get(`${getTopListTypeUrl(type)}`, {
			language:'en-US',
			page,
			region: 'US',
		}));

	const items = searched.results

	await Promise.all(items.map(async item => {
		const searchedDetails = await	Communication.get(Api.get(`movie/${item.id}`,{
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