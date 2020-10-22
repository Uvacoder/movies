import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';
import { getRecentMoviesTypeUrl } from 'actions/RecentMoviesActionsUtil'

export const FETCH_RECENT_MOVIES = 'recent/FETCH_RECENT_MOVIES';
export const FETCH_NEXT_PAGE_OF_RECENT_MOVIES = 'recent/FETCH_NEXT_PAGE_OF_RECENT_MOVIES';

export const fetchRecentMovies = (type) => {
  return async dispatch => {
    try {
      const searched = await Communication.get({
        path: TMDBApi.get(`${getRecentMoviesTypeUrl(type)}`, {
          language:'en-US',
          page: '1',
          region:'US'
        }),
        useLoader: true
      });
  
      await Promise.all(searched.results.map(async item => {
        const searchedDetails = await	Communication.get({
          path: TMDBApi.get(`movie/${item.id}`,{
            append_to_response: 'credits'
          }),
          useLoader: true
        });	
        item.details = searchedDetails; 
      }));
  
      dispatch({ 
        type: FETCH_RECENT_MOVIES,
        recentMovies: searched.results,
        numberOfPages: searched.total_pages
      });
    } catch (error) {
      console.error('TBMD API fetching recent movies', error)
    };
  };  
};

export const fetchNextPageOfRecentMovies = (type, page) => {
  return async dispatch => {
    try {
      const searched = await Communication.get({
        path: TMDBApi.get(`${getRecentMoviesTypeUrl(type)}`, {
          language:'en-US',
          page,
          region:'US'
        }),
        useLoader: false
      });
  
      await Promise.all(searched.results.map(async item => {
          const searchedDetails = await	Communication.get({
            path: TMDBApi.get(`movie/${item.id}`,{
              append_to_response: 'credits'
            }),
            useLoader: false
          });	
          item.details = searchedDetails; 
        }));
  
      dispatch({ 
        type: FETCH_NEXT_PAGE_OF_RECENT_MOVIES,
        recentMovies: searched.results,
      });
    } catch (error) {
      console.error('TBMD API fetching recent movies', error)
    };
  };  
}; 
