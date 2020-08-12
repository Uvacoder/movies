export const LOADING = 'global/LOADING'

export const changeLoadingStatus = () => {
  return dispatch => { 
    dispatch({
      type: LOADING,
      isLoading: true
    });
  };
};