export const LOADING = 'global/LOADING'

export const changeLoadingStatus = (status) => {
  return dispatch => { 
    dispatch({
      type: LOADING,
      isLoading: status
    });
  };
};