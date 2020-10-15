import { combineReducers } from 'redux';
import { homePage } from './HomePageReducer'
import { changeLoading } from './GlobalReducer'
import { movieDetails } from './MovieDetailsReducer'
import { searchResults } from './SearchReducer'
import { topListOfMovies } from './TopListReducer'
import { recentMovies } from './RecentMoviesReducer'
import { userRating } from './UserReducer'
import { randomGifGenerator } from './RandomGifGeneratorReducer'
import { connectRouter } from 'connected-react-router'

const allReducers = (history) => combineReducers({
	homePage,
	changeLoading,
	movieDetails,
	searchResults,
	topListOfMovies,
	recentMovies,
	randomGifGenerator,
	userRating,
	router: connectRouter(history),
})

export default allReducers;