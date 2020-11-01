import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';
import { getRecentMoviesTypeUrl } from 'actions/RecentMoviesActionsUtil'
import { changeLoadingStatus } from 'actions/GlobalActions';

export const FETCH_RECENT_MOVIES = 'recent/FETCH_RECENT_MOVIES';
export const FETCH_NEXT_PAGE_OF_RECENT_MOVIES = 'recent/FETCH_NEXT_PAGE_OF_RECENT_MOVIES';
export const CLEAR_RECENT_MOVIES = 'recent/CLEAR_RECENT_MOVIES';

const RECENT_MOVIES_DOWNLOAD_LANGUAGE = 'en-US';
const RECENT_MOVIES_DOWNLOAD_REGION = 'US';

export const fetchRecentMovies = (type) => {
  return async dispatch => {
    try {
      dispatch(changeLoadingStatus(true));
      const searched = await Communication.get({
        path: TMDBApi.get(`${getRecentMoviesTypeUrl(type)}`, {
          language: RECENT_MOVIES_DOWNLOAD_LANGUAGE,
          page: '1',
          region: RECENT_MOVIES_DOWNLOAD_REGION
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
        type: FETCH_RECENT_MOVIES,
        recentMovies: searched.results,
        numberOfPages: searched.total_pages
      });
      dispatch(changeLoadingStatus(false));
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
          language: RECENT_MOVIES_DOWNLOAD_LANGUAGE,
          page,
          region: RECENT_MOVIES_DOWNLOAD_REGION
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

export const clearRecentMovies = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_RECENT_MOVIES
    });
  };
};