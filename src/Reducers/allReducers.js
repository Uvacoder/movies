import { combineReducers } from 'redux';
import { homePage } from './HomePageReducer'
import { global } from './GlobalReducer'
import { movieDetails } from './MovieDetailsReducer'
import { searchResults } from './SearchReducer'
import { topListOfMovies } from './TopListReducer'
import { recentMovies } from './RecentMoviesReducer'
import { userRating } from './UserReducer'
import { randomGifGenerator } from './RandomGifGeneratorReducer'
import { connectRouter } from 'connected-react-router'

const allReducers = (history) => combineReducers({
	homePage,
	global,
	movieDetails,
	searchResults,
	topListOfMovies,
	recentMovies,
	randomGifGenerator,
	userRating,
	router: connectRouter(history),
});

export default allReducers;