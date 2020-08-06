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

export default {
  get: getTMDBApiUrl
}