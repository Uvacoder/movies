// TO DO figure out how to add store outisde react component

// import { store }  from '../../store';
import { changeLoadingStatus } from 'actions/GlobalActions';
import { notification } from 'antd';

class ApiError extends Error {
  constructor(message, text) {
    super(message);
    this.name = "ApiError";
    this.text = text;
  };
};

function getMethod(type) {
  return async (url,body) => {
    const fetchParams = {
      method: type,
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    if(url.includes("localhost") || url.includes("movielounge")) {
      fetchParams.headers.token =  localStorage.getItem('token');
    };

    try {
      // window.store.dispatch(changeLoadingStatus()) // TO DO
      const response = await fetch(url, fetchParams);

      return response.json().then(json => {
        if (response.status >= 400) {
          throw new ApiError(response.statusText, json);
        }
        return json;
      });
    } catch (err) {
      if (!(err instanceof ApiError)) {
        notification.error({
          message: "Ups! Something went wrong :(",
          description: "Please, try again later.",
          placement: "topRight",
          duration: 5,
        });
      }
      throw err;
    };
  };
};

export default {
  get: getMethod('GET'),
  post: getMethod('POST'),
  delete: getMethod('DELETE')
};
