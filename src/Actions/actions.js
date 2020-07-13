// import fetch from 'cross-fetch'
import Communication from '../Communication/Communication';

export const REQUEST_TRENDING = 'REQUEST_TRENDING'
export const RECEIVE_TRENDING = 'RECEIVE_TRENDING'

const TRENDING_API = 'https://api.themoviedb.org/3/trending/all/day?api_key=87f688d5cb704339968f87fae03f38cd'

const requestTrending = () => {
    return {
        type: REQUEST_TRENDING,
    }
}

const receiveTrending = (json) => {
    return{ 
        type: RECEIVE_TRENDING,
        items: json.results,
        receivedAt: Date.now()
    }
}

export const fetchTrending = () => {
    return dispatch => {
        dispatch(requestTrending())
        return fetch(TRENDING_API)
            .then(response => response.json())
            .then(json => dispatch(receiveTrending(json)))
    }  
} 