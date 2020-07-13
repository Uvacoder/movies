import {
    REQUEST_TRENDING,
    RECEIVE_TRENDING,   
} from '../Actions/actions';


export default function trending(
    state = {
      isFetching: false,
      items: []
    },
    action
  ) {
    switch (action.type) {
      case REQUEST_TRENDING:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case RECEIVE_TRENDING:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.items,
        //   lastUpdated: action.receivedAt
        })
      default:
        return state
    }
}