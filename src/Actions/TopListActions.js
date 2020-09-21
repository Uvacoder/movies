import Communication from 'communication/Communication';
import Api from 'utils/Api';

export const FETCH_TOP_RATED = 'toplist/FETCH_TOP_RATED';
export const CLEAR_TOPLIST = 'toplist/CLEAR_TOPLIST';

export const fetchTopList = (type) => {
	let toplistType = ''
	switch (type) {
		case 'top_rated':
			toplistType = 'movie/top_rated'
			break;
		case 'trending_daily':
			toplistType = 'trending/movie/day'
			break;
		case 'trending_weekly':
			toplistType = 'trending/movie/week'
			break;
	}
	return async dispatch => {
		const searched = await Communication.get(Api.get(`${toplistType}`, {
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

// export const clearTopList = () => {
// 	return dispatch => {
// 		dispatch({
// 			type: CLEAR_TOPLIST,
// 			topRatedMovies: [],
// 		});
// 	};
// };

