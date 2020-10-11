import Communication from 'communication/Communication';
import DomainApi from 'utils/DomainAPI';
import TMDBApi from 'utils/TMDBApi';

export const ADD_USER_RATING = 'user/ADD_USER_RATING';
export const ADD_ALL_USER_RATINGS = 'user/ADD_ALL_USER_RATINGS';
export const EDIT_USER_RATING = 'user/EDIT_USER_RATING';

export const register = (body) => {
	return async () => {
    try {
      await Communication.post(DomainApi.get('user/signup'),body)

      return {
        errors: false
      }
    } catch(error) {
      return {
        errors: true,
        userAlreadyExists: error?.text?.msg === "User Already Exists"
      };
    };
  };  
};

export const login = (body) => {
	return async () => {
    try {
      const response = await Communication.post(DomainApi.get('user/login'),body)
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
        const results = await Communication.get(DomainApi.get(`user/vote?movieId=${movieID}`))
  
        dispatch({ 
          type: ADD_USER_RATING,
          movieRate: {...results, movieId: Number(movieID)}
        });
        return {
          errors: false
        }
      } catch(error) {
          console.error('getting user vote error:', error)
        };
        
      return {
        errors: true,
      };
    }
  };
};  

export const saveUserRating = (body) => {
	return async (dispatch, getState) => {
    try {
      const movieExists = getState().userRating.movies.some(item => item.movieId === Number(body.movieId))
      if (movieExists) {
        await Communication.post(DomainApi.get(`user/vote`), body)
        dispatch({ 
          type: EDIT_USER_RATING,
          movieRate: body,
          movieId: Number(body.movieId)
        });
      } else {
        await Communication.post(DomainApi.get(`user/vote`), body)

        dispatch({ 
          type: ADD_USER_RATING,
          movieRate: body
        });
      }
      return {
        errors: false
      }
    } catch(error) {
        console.error('posting user vote error:', error)
      };

    return {
      errors: true,
    };
  };
};  

export const deleteUserAccount = () => {
	return async () => {
    try {
      await Communication.delete(DomainApi.get('user'))
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
      const results = await Communication.get(DomainApi.get(`user/myRates`))

      await Promise.all(results.map(async item => {
        const movieDetails = await	Communication.get(TMDBApi.get(`movie/${item.movieId}`,{
          append_to_response: 'credits'
        }));	
        item.details = movieDetails; 
      }));

      dispatch({ 
        type: ADD_ALL_USER_RATINGS,
        movieRates: [...results]
      });
      return {
        errors: false
      }
    } catch(error) {
        console.error('getting user votes error:', error)
      };
        
    return {
      errors: true,
    };
  } 
};  
