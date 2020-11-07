import Communication from 'communication/Communication';
import Calculation from 'utils/Calculation';
import { changeLoadingStatus } from 'actions/GlobalActions';

export const FETCH_RANDOM_GIF = "RGG/FETCH_RANDOM_GIF"
export const CLEAR_RANDOM_GIF = "RGG/CLEAR_RANDOM_GIF"

const RANDOM_WORD_API = "https://api.urbandictionary.com/v0/random" // "https://random-word-api.herokuapp.com/word?number=1" alternative API
const NO_OF_FIRST_WORD_SEARCHED = 1;
const NO_OF_LAST_WORD_SEARCHED = 10;

const getGifApiUrl = (word) => {
  return `https://api.giphy.com/v1/gifs/search?q=${word}&api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=1`
};

export const fetchRandomGif = () => {
  return async dispatch => {
    try {
      dispatch(changeLoadingStatus(true));
      const wordsList = await Communication.get({
        path: RANDOM_WORD_API,
        useLoader: false
      })
      const randomWord = wordsList.list[Calculation.randomInt(NO_OF_FIRST_WORD_SEARCHED, NO_OF_LAST_WORD_SEARCHED)]
      const gif = await Communication.get({
        path: getGifApiUrl(randomWord.word),
        useLoader: false
      })
      const gifData = gif.data[0];

      if (gifData) {
        dispatch(changeLoadingStatus(false));
        dispatch({ 
          type: FETCH_RANDOM_GIF,
          word: randomWord,
          gif: gifData
        })
      } else {
        dispatch(fetchRandomGif())
      }
    } catch (error) {
      console.error('random gif generator', error)
    };
  };  
}; 

export const clearRandomGif = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_RANDOM_GIF,
      word: "",
      gif: ""
    });
  };
};