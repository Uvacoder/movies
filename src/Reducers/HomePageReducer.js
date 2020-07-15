import {
  FETCH_TRENDING,
  FETCH_UPCOMMING,
} from '../Actions/HomePageActions';

const initialState = {
  isFetching: false,
    items: [], 
  trending: {
    items: []
  },
  upcomming: {
    items: []
  },
  lastUpdated: Date.now()
}



export function homePage (state = initialState,action) {
  switch (action.type) {
  case FETCH_TRENDING:
    return Object.assign({}, state, {
      trending: action.trending,
    })
  case FETCH_UPCOMMING:
    return Object.assign({}, state, {
      upcomming: action.upcomming,
    })
  default:
    return state
  }
}
