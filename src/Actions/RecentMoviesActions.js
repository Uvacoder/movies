import Communication from 'communication/Communication';
import Api from 'utils/Api';

export const FETCH_RECENT_MOVIES = 'recent/FETCH_RECENT_MOVIES';

export const fetchRecentMovies = (type) => {
	let toplistType = '';
	
	switch (type) {
		case 'upcomming':
			toplistType = 'movie/upcoming'
			break;
		case 'now_playing':
			toplistType = 'movie/now_playing'
			break;
	};

	return async dispatch => {
		const searched = await Communication.get(Api.get(`${toplistType}`, {
			language:'en-US',
			page: '1',
			region:'US'
		}));

	const items = searched.results

	await Promise.all(items.map(async item => {
		const searchedDetails = await	Communication.get(Api.get(`movie/${item.id}`,{
			append_to_response: 'credits'
		}));	
		item.details = searchedDetails; 
	}));

		dispatch({ 
			type: FETCH_RECENT_MOVIES,
			recentMovies: searched.results,
		});
	};  
}; 
