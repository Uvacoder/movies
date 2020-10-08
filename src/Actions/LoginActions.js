export const SET_LOGIN_TYPE = 'login/SET_LOGIN_TYPE';

export const setLoginType = (loginType) => {
  return dispatch => { 
    dispatch({ 
      type: SET_LOGIN_TYPE,
      loginType
    });
  }
};  