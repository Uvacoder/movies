import Communication from 'communication/Communication';
import Api from 'utils/Api';

export const FETCH_SEARCHED = 'search/FETCH_SEARCHED';

export const fetchSearched = (phrase) => {
	return async dispatch => {
		console.log('phrase', phrase)
		const searched = await Communication.get(Api.get('search/movie', {
			language:'en-US',
			query:`${phrase}`,
      page: '1',
			include_adult: 'false',
		}))

		const items = searched.results
		
		await Promise.all(items.map(async item => {
			const searchedDetails = await 	Communication.get(Api.get(`movie/${item.id}`,{
				append_to_response: 'credits'
			}));	
				item.details = searchedDetails; 
			}));

			dispatch({ 
				type: FETCH_SEARCHED,
				searchResults: searched.results
		});
	};  
}; 



