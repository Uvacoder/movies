import { combineReducers } from 'redux';
import { trending, upcomming } from './HomePageReducer'

const allReducers = combineReducers({
    trending,
    upcomming
})

export default allReducers;