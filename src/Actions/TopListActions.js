import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';
import { getTopListTypeUrl } from 'actions/TopListActionsUtil'
import { changeLoadingStatus } from 'actions/GlobalActions';

export const FETCH_TOP_LIST = 'toplist/FETCH_TOP_LIST';
export const FETCH_NEXT_PAGE_OF_TOP_LIST = 'toplist/FETCH_NEXT_PAGE_OF_TOP_LIST';
export const CLEAR_TOP_LIST = 'toplist/CLEAR_TOP_LIST';

const MOVIE_DOWNLOAD_LANGUAGE = 'en-US';
const MOVIE_DOWNLOAD_REGION = 'US';
const MOVIE_ADDITIONAL_INFORMATIONS = 'credits';

export const fetchTopList = (type) => {
  return async dispatch => {
    try {
      dispatch(changeLoadingStatus(true));
      const searched = await Communication.get({
        path: TMDBApi.get(`${getTopListTypeUrl(type)}`, {
          language: MOVIE_DOWNLOAD_LANGUAGE,
          page: '1',
          region: MOVIE_DOWNLOAD_REGION,
        }),
        useLoader: false
      });

      await Promise.all(searched.results.map(async item => {
        const searchedDetails = await	Communication.get({
          path: TMDBApi.get(`movie/${item.id}`,{
            append_to_response: MOVIE_ADDITIONAL_INFORMATIONS
          }),
          useLoader: true
        });	
        item.details = searchedDetails; 
      }));

      dispatch({ 
        type: FETCH_TOP_LIST,
        topRatedMovies: searched.results,
        numberOfPages: searched.total_pages
      });
    } catch (error) {
      console.error("TMDB API - fetching top list", error)
    }
  };  
};

export const fetchNextPageOfTopList = (type, page) => {
  return async dispatch => {
    try {
      const searched = await Communication.get({
        path: TMDBApi.get(`${getTopListTypeUrl(type)}`, {
          language: MOVIE_DOWNLOAD_LANGUAGE,
          page,
          region: MOVIE_DOWNLOAD_REGION,
        }),
        useLoader: false
      });
  
      await Promise.all(searched.results.map(async item => {
        const searchedDetails = await	Communication.get({
          path: TMDBApi.get(`movie/${item.id}`,{
            append_to_response: MOVIE_ADDITIONAL_INFORMATIONS
          }),
          useLoader: false
        });	
        item.details = searchedDetails; 
      }));
  
      dispatch({ 
        type: FETCH_NEXT_PAGE_OF_TOP_LIST,
        topRatedMovies: searched.results,
      });
    } catch (error) {
      console.error("TMDB API - fetching top list", error)
    };
  };  
}; 

export const clearTopList = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_TOP_LIST
    });
  };
};