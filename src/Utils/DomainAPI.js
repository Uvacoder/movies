const getDomainType = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:9000/api/'
  } else {
    return 'http://www.movielounge.pl/api/'
  };
};

const getDomainApiUrl = (url, queryParams) => {
  const mainURL = `${getDomainType()}${url}`

  if (queryParams) {
    const params = new URLSearchParams(queryParams);
    
    return `${mainURL}&${params.toString()}`
  } else {
    return mainURL
  };
};

export default {
  get: getDomainApiUrl,
};