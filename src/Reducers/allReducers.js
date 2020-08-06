import { combineReducers } from 'redux';
import { homePage } from './HomePageReducer'
import { changeLoading } from './GlobalReducer'
import { movieDetails } from './MovieDetailsReducer'

const allReducers = combineReducers({
    homePage,
    changeLoading,
    movieDetails
})

export default allReducers;