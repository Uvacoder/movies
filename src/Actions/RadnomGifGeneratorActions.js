import Communication from 'communication/Communication';
import Calculation from 'utils/Calculation';

export const FETCH_RANDOM_GIF = "RGG/FETCH_RANDOM_GIF"
export const CLEAR_RANDOM_GIF = "RGG/CLEAR_RANDOM_GIF"

const RANDOM_WORD_API = "http://api.urbandictionary.com/v0/random" // "https://random-word-api.herokuapp.com/word?number=1" alternative API
const NO_OF_FIRST_WORD_SEARCHED = 1;
const NO_OF_LAST_WORD_SEARCHED = 10;

const getGifApiUrl = (word) => {
  return `http://api.giphy.com/v1/gifs/search?q=${word}&api_key=${process.env.REACT_APP_GIPHY_API_KEY}&limit=1`
}

export const fetchRandomGif = () => {
	return async dispatch => {
		try {
      const wordsList = await Communication.get(RANDOM_WORD_API)
      const randomWord = wordsList.list[Calculation.randomInt(NO_OF_FIRST_WORD_SEARCHED, NO_OF_LAST_WORD_SEARCHED)]
      const gif = await Communication.get(getGifApiUrl(randomWord.word))

			dispatch({ 
				type: FETCH_RANDOM_GIF,
        word: randomWord,
        gif: gif.data[0]
			})
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