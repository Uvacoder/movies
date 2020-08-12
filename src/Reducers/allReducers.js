import { combineReducers } from 'redux';
import { homePage } from './HomePageReducer'
import { changeLoading } from './GlobalReducer'
import { movieDetails } from './MovieDetailsReducer'
import { searchResults } from './SearchReducer'

const allReducers = combineReducers({
    homePage,
    changeLoading,
    movieDetails,
    searchResults
})

export default allReducers;