import Communication from '../Communication/Communication';

export const REQUEST_TRENDING = 'REQUEST_TRENDING'
export const RECEIVE_TRENDING = 'RECEIVE_TRENDING'
export const REQUEST_UPCOMMING = 'REQUEST_UPCOMMING'
export const RECEIVE_UPCOMMING = 'RECEIVE_UPCOMMING'

const TRENDING_API = 'https://api.themoviedb.org/3/trending/all/day?api_key=87f688d5cb704339968f87fae03f38cd'
const UPCOMMING_API = 'https://api.themoviedb.org/3/movie/upcoming?api_key=87f688d5cb704339968f87fae03f38cd&language=EN&page=1&region=US'

const requestTrending = () => {
    return {
        type: REQUEST_TRENDING,
    };
};

const receiveTrending = (json) => {
    return{ 
        type: RECEIVE_TRENDING,
        items: json.results,
        receivedAt: Date.now()
    };
};

export const fetchTrending = () => {
    return dispatch => {
        dispatch(requestTrending())
        return Communication.get(TRENDING_API)
            .then(json => dispatch(receiveTrending(json)))
    };  
}; 

const requestUpcomming = () => {
    return {
        type: REQUEST_UPCOMMING,
    };
};

const receiveUpcomming = (json) => {
    return{ 
        type: RECEIVE_UPCOMMING,
        items: json.results,
        receivedAt: Date.now()
    };
};

export const fetchUpcomming = () => {
    return dispatch => {
        dispatch(requestUpcomming())
        return Communication.get(UPCOMMING_API)
            .then(json => dispatch(receiveUpcomming(json)))
    };
};