import { combineReducers } from 'redux';
import { homePage } from './HomePageReducer'
import { changeLoading } from './GlobalReducer'
import { movieDetails } from './MovieDetailsReducer'
import { searchResults } from './SearchReducer'
import { topListOfMovies } from './TopListReducer'
import { connectRouter } from 'connected-react-router'

const allReducers = (history) => combineReducers({
	homePage,
	changeLoading,
	movieDetails,
	searchResults,
	topListOfMovies,
	router: connectRouter(history),
})

export default allReducers;