// TO DO figure out how to add store outisde react component

// import { store }  from '../../store';
import { changeLoadingStatus } from 'actions/GlobalActions';

function getMethod(type) {
  return async (url,body) => {
    let results;
    const fetchParams = {
      method: type,
      body
    };

    if(url.includes("localhost")) {
      fetchParams.headers = {
        token: null // TO DO USER TOKEN FROM LOCAL STORAGE
      };
    };

    try {
      // window.store.dispatch(changeLoadingStatus()) // TO DO
      const response = await fetch(url, fetchParams);
      results = response.json();
    } catch (err) {
      throw new Error('Failed to fetch', err)
    }
    return results
  };
};

export default {
  get: getMethod('GET'),
  post: getMethod('POST'),
  delete: getMethod('DELETE')
};
