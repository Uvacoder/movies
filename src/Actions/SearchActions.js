import Communication from 'communication/Communication';
import TMDBApi from 'utils/TMDBApi';
import { changeLoadingStatus } from 'actions/GlobalActions';

export const FETCH_SEARCHED = 'search/FETCH_SEARCHED';
export const CLEAR_SEARCHED = 'search/CLEAR_SEARCHED';
export const FETCH_NEXT_PAGE_OF_SEARCHED = 'search/FETCH_NEXT_PAGE_OF_SEARCHED';

const MOVIE_DOWNLOAD_LANGUAGE = 'en-US';
const MOVIE_INCLUDE_ADULT_MOVIES = 'false';
const MOVIE_ADDITIONAL_INFORMATIONS = 'credits';

export const fetchSearched = (phrase) => {
  return async dispatch => {
    try {
      dispatch(changeLoadingStatus(true));
      const searched = await Communication.get({
        path: TMDBApi.get('search/movie', {
          language: MOVIE_DOWNLOAD_LANGUAGE,
          query:`${phrase}`,
          page: 1,
          include_adult: MOVIE_INCLUDE_ADULT_MOVIES,
        }),
        useLoader: false
      })
      const items = searched.results
  
      await Promise.all(items.map(async item => {
        const searchedDetails = await	Communication.get({
          path: TMDBApi.get(`movie/${item.id}`,{
            append_to_response: MOVIE_ADDITIONAL_INFORMATIONS
          }),
          useLoader: false
        });	
        item.details = searchedDetails; 
      }));
  
      dispatch({ 
        type: FETCH_SEARCHED,
        searchResults: searched.results,
        phrase,
        numberOfPages: searched.total_pages
      });
      dispatch(changeLoadingStatus(false));
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
          language: MOVIE_DOWNLOAD_LANGUAGE,
          query:`${phrase}`,
          page,
          include_adult: MOVIE_INCLUDE_ADULT_MOVIES,
        }),
        useLoader: false
      })
      const items = searched.results
  
      await Promise.all(items.map(async item => {
        const searchedDetails = await Communication.get({
          path: TMDBApi.get(`movie/${item.id}`,{
            append_to_response: MOVIE_ADDITIONAL_INFORMATIONS
          }),
          useLoader: false
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
    });
  };
};