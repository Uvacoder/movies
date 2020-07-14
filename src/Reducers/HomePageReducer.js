import {
    REQUEST_TRENDING,
    RECEIVE_TRENDING,  
    REQUEST_UPCOMMING,
    RECEIVE_UPCOMMING, 
} from '../Actions/actions';


export function trending (
    state = {
      isFetching: false,
      items: [],
      lastUpdated: Date.now()
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
          lastUpdated: action.receivedAt
        })
      default:
        return state
    }
}

export function upcomming (
  state = {
    isFetching: false,
    items: [],
    lastUpdated: Date.now()
  },
  action
) {
  switch (action.type) {
    case REQUEST_UPCOMMING:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_UPCOMMING:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}