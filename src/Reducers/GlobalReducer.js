import { LOADING } from '../Actions/GlobalActions'

export function changeLoading (state = {isLoading: false},action) {
  switch (action.type) {
    case LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      })
    default:
      return state   
  };
};