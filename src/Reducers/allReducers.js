import { combineReducers } from 'redux';
import trending from './HomePageReducer'

const allReducers = combineReducers({
    trending
})

export default allReducers;