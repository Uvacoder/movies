import { combineReducers } from 'redux';
import { homePage } from './HomePageReducer'
import { changeLoading } from './GlobalReducer'

const allReducers = combineReducers({
    homePage,
    changeLoading
})

export default allReducers;