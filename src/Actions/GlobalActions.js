export const LOADING = 'global/LOADING'

let displayLoadingDelayTimer;
const LOADING_DISPLAY_DELAY = 800;

export const changeLoadingStatus = (status) => {
  return dispatch => { 
    const dispatchLoadingStatus = () => {
      dispatch({
        type: LOADING,
        isLoading: status
      });
    };

    if (status) {
      clearTimeout(displayLoadingDelayTimer);
      displayLoadingDelayTimer = setTimeout(() => dispatchLoadingStatus(), LOADING_DISPLAY_DELAY)
    } else {
      clearTimeout(displayLoadingDelayTimer);
      dispatchLoadingStatus()
    };
  };
};