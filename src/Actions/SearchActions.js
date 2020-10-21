import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';

export const FETCH_SEARCHED = 'search/FETCH_SEARCHED';
export const CLEAR_SEARCHED = 'search/CLEAR_SEARCHED';
export const FETCH_NEXT_PAGE_OF_SEARCHED = 'search/FETCH_NEXT_PAGE_OF_SEARCHED';

export const fetchSearched = (phrase) => {
  return async dispatch => {
    try {
      const searched = await Communication.get({
        path: TMDBApi.get('search/movie', {
          language:'en-US',
          query:`${phrase}`,
          page: 1,
          include_adult: 'false',
        }),
        useLoader: true
      })
      const items = searched.results
  
      await Promise.all(items.map(async item => {
        const searchedDetails = await	Communication.get({
          path: TMDBApi.get(`movie/${item.id}`,{
            append_to_response: 'credits'
          }),
          useLoader: true
        });	
        item.details = searchedDetails; 
      }));
  
      dispatch({ 
        type: FETCH_SEARCHED,
        searchResults: searched.results,
        phrase,
        numberOfPages: searched.total_pages
      });
    } catch (error) {
      console.error('TMBD API fetching searched', error)
    };
  };  
}; 

export const fetchNextPageOfSearched = (phrase, page) => {
  return async dispatch => {
    try {
      const searched = await Communication.get({
        path: TMDBApi.get('search/movie', {
          language:'en-US',
          query:`${phrase}`,
          page,
          include_adult: 'false',
        }),
        useLoader: true
      })
      const items = searched.results
  
      await Promise.all(items.map(async item => {
        const searchedDetails = await Communication.get({
          path: TMDBApi.get(`movie/${item.id}`,{
            append_to_response: 'credits'
          }),
          useLoader: true
        });	
        item.details = searchedDetails; 
      }));
  
      dispatch({ 
        type: FETCH_NEXT_PAGE_OF_SEARCHED,
        searchResults: searched.results,
      });
    } catch (error) {
      console.error('TMBD API fetching searched', error)
    };
  };  
}; 

export const clearSearched = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_SEARCHED,
      searchResults: [],
      phrase: '',
      numberOfPages: 0
    });
  };
};


