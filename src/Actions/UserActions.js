import Communication from 'communication/Communication';
import DomainApi from 'utils/DomainAPI';
import TMDBApi from 'utils/TMDBApi';
import { changeLoadingStatus } from 'actions/GlobalActions';

export const ADD_USER_RATING = 'user/ADD_USER_RATING';
export const FETCH_ALL_USER_RATINGS = 'user/FETCH_ALL_USER_RATINGS';
export const EDIT_USER_RATING = 'user/EDIT_USER_RATING';

const USER_EXISTS_IN_DATABASE_ERROR = "User Already Exists"

export const register = (body) => {
	return async () => {
    try {
      await Communication.post({
        path: DomainApi.get('user/signup'),
        useLoader: true,
        body
      });

      return {
        errors: false
      }
    } catch(error) {
      return {
        errors: true,
        userAlreadyExists: error.text?.msg === USER_EXISTS_IN_DATABASE_ERROR
      };
    };
  };  
};

export const login = (body) => {
	return async () => {
    try {
      const response = await Communication.post({
        path: DomainApi.get('user/login'),
        useLoader: true,
        body
      })
      localStorage.setItem('token', response.token);

      return {
        errors: false
      }
    } catch(error) {
      return {
        errors: true,
      };
    };
  };  
}; 

export const getUserRating = (movieID) => {
	return async (dispatch, getState) => {
    const movieExists = getState().userRating.movies.some(item => item.movieId === Number(movieID))
    if(!movieExists) {
      try {
        const results = await Communication.get({
          path: DomainApi.get(`user/vote?movieId=${movieID}`),
          useLoader: true
        })
  
        dispatch({ 
          type: ADD_USER_RATING,
          movieRate: {
            ...results, 
            movieId: Number(movieID)
          }
        });
        return {
          errors: false
        }
      } catch(error) {
        return {
          errors: true
        };
      };
    };
  };
};

export const saveUserRating = (body) => {
	return async (dispatch, getState) => {
    try {
      const movieExists = getState().userRating.movies.some(item => item.movieId === Number(body.movieId))
      if (movieExists) {
        await Communication.post({
          path: DomainApi.get(`user/vote`),
          useLoader: true,
          body
        })

        dispatch({ 
          type: EDIT_USER_RATING,
          movieRate: body,
          movieId: Number(body.movieId)
        });
      } else {
        await Communication.post({
          path: DomainApi.get(`user/vote`),
          useLoader: true,
          body
        })

        dispatch({ 
          type: ADD_USER_RATING,
          movieRate: body
        });
      }
      return {
        errors: false
      }
    } catch(error) {
      console.error('posting user vote error', error)

      return {
        errors: true,
      };
    }; 
  };
};

export const deleteUserAccount = () => {
	return async () => {
    try {
      await Communication.delete({
        path: DomainApi.get('user'),
        useLoader: true
      })
      
      return {
        errors: false
      }
    } catch(error) {
      return {
        errors: true,
      };
    };
  };  
};

export const getAllUserRatings = () => {
	return async (dispatch) => {
    try {
      dispatch(changeLoadingStatus(true));
      const results = await Communication.get({
        path: DomainApi.get(`user/myRates`),
        useLoader: false
      })

      await Promise.allSettled(results.map(async item => {
        const movieDetails = await Communication.get({
          path: TMDBApi.get(`movie/${item.movieId}`,{
            append_to_response: 'credits'
          }),
          useLoader: false
        });	
        item.details = movieDetails;
      }));

      dispatch({ 
        type: FETCH_ALL_USER_RATINGS,
        movieRates: [...results]
      });
      dispatch(changeLoadingStatus(false));
      return {
        errors: false
      }
    } catch(error) {
        console.error('getting user votes error', error)
        dispatch(changeLoadingStatus(false));
      };
        
    return {
      errors: true,
    };
  };
};