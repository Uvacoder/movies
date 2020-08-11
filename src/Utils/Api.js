const DOMAIN_NAME = 'https://api.themoviedb.org/3/'
const API_KEY = `?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

const getTMDBApiUrl = (url, queryParams) => {
  const mainURL = `${DOMAIN_NAME}${url}${API_KEY}`

  if (queryParams) {
    const params = new URLSearchParams(queryParams);
    
    return `${mainURL}&${params.toString()}`
  } else {
    return mainURL
  }
}

// check available img sizes in API before applying
const getImgPath = (imgWidth) => {
  return `https://image.tmdb.org/t/p/w${imgWidth}`
}

export default {
  get: getTMDBApiUrl,
  imgPath : getImgPath
}