import { LOADING, LOADING_IMMEDIATE } from '../Actions/GlobalActions'

export function global (state = {isLoading: false},action) {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      })
    case LOADING_IMMEDIATE:
      return Object.assign({}, state, {
        isLoadingImmediate: action.isLoadingImmediate
      })
    default:
      return state   
  };
};