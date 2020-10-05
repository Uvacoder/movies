import Communication from 'communication/Communication';
import DomainApi from 'utils/DomainAPI';
import { notification } from 'antd';

export const  ADD_USER_RATING = 'user/ADD_USER_RATING';

export const register = (body) => {
	return async () => {
    try {
      await Communication.post(DomainApi.get('user/signup'),body)

      return {
        errors: false
      }
    } catch(error) {
      if (error.text) {
        notification.warn({
          message: error.text.msg,
          placement: "topRight",
          duration: 8,
        });
      };

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
      notification.warn({
        message: "Wrong password!",
        placement: "topRight",
        duration: 8,
      });
      return {
        errors: true,
      };
    };
	};  
}; 

export const getUserRating = (movieId) => {
	return async dispatch => {
    try {
      const results = await Communication.get(DomainApi.get(`user/vote?movieId=${movieId}`))

      dispatch({ 
        type: ADD_USER_RATING,
        movieRate: {...results, movieId: Number(movieId)}
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
  };
};  

export const saveUserRating = (body) => {
	return async dispatch => {
    try {
      await Communication.post(DomainApi.get(`user/vote`), body)
      dispatch({ 
        type: ADD_USER_RATING,
        movieRate: {...body}
      });

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