export const LOADING = 'global/LOADING'
export const LOADING_IMMEDIATE = 'global/LOADING_IMMEDIATE'

let displayLoadingDelayTimer;
const LOADING_DISPLAY_DELAY = 800;

export const changeLoadingStatus = (status) => {
  return dispatch => { 
    debugger;
    const dispatchLoadingStatus = () => {
      dispatch({
        type: LOADING,
        isLoading: status
      });
    };

    dispatch({
      type: LOADING_IMMEDIATE,
      isLoadingImmediate: status
    });

    if (status) {
      clearTimeout(displayLoadingDelayTimer);
      displayLoadingDelayTimer = setTimeout(() => dispatchLoadingStatus(), LOADING_DISPLAY_DELAY)
    } else {
      clearTimeout(displayLoadingDelayTimer);
      dispatchLoadingStatus()
    };
  };
};