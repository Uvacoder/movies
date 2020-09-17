import Communication from 'communication/Communication';
import Api from 'utils/Api';

export const FETCH_TOP_RATED = 'toplist/FETCH_TOP_RATED';

export const fetchTopList = (type) => {
	return async dispatch => {
		const searched = await Communication.get(Api.get(`movie/${type}`, {
			language:'en-US',
      page: '1',
      region: 'US',
		}))

	const items = searched.results

	await Promise.all(items.map(async item => {
		const searchedDetails = await	Communication.get(Api.get(`movie/${item.id}`,{
			append_to_response: 'credits'
		}));	
		item.details = searchedDetails; 
	}));

		dispatch({ 
			type: FETCH_TOP_RATED,
			topRatedMovies: searched.results,
		});
	};  
}; 

