export const LOADING = 'global/LOADING'

export const changeLoadingStatus = (status) => {
  return dispatch => { 
    debugger;
    dispatch({
      type: LOADING,
      isLoading: status
    });
  };
};