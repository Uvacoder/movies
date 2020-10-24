import { changeLoadingStatus } from 'actions/GlobalActions';
import storeRegistry from '../../Store/storeRegistry';
import { notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const COMMUNICATION_ERROR_MESSAGE = "Ups! Something went wrong :(";
const COMMUNICATION_ERROR_DESCRIPTION = "Please, try again later.";
const COMMUNICATION_ERROR_PLACEMENT = "topRight";
const COMMUNICATION_ERROR_DURATION = 3.2;
const COMMUNICATION_LOCAL_HOSTNAME = "localhost";
const COMMUNICATION_WEB_PAGE_HOSTNAME = "movielounge.com";
const ApiRequestIdTable = [];

class ApiError extends Error {
  constructor(message, text) {
    super(message);
    this.name = "ApiError";
    this.text = text;
  };
};

function getMethod(type) {
  return async ({path, useLoader, body}) => {
    const fetchParams = {
      method: type,
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };  
    const URLObject = new URL('', path)
    let requestId = null

    if (URLObject.hostname === COMMUNICATION_LOCAL_HOSTNAME || URLObject.hostname === COMMUNICATION_WEB_PAGE_HOSTNAME) {  
      fetchParams.headers.token = localStorage.getItem('token');
    };

    try {
      if (useLoader) { 
        storeRegistry.getStore().dispatch(changeLoadingStatus(true)) 
        console.log('loading-TRUE', path, body)
        requestId = uuidv4()
        ApiRequestIdTable.push(requestId)
      }
      
      const response = await fetch(path, fetchParams);

      return response.json().then(json => {
        if (response.status >= 400) {
          throw new ApiError(response.statusText, json);
        }
        return json;
      });
    } catch (err) {
      if (!(err instanceof ApiError)) {
        notification.error({
          message: COMMUNICATION_ERROR_MESSAGE,
          description: COMMUNICATION_ERROR_DESCRIPTION,
          placement: COMMUNICATION_ERROR_PLACEMENT,
          duration: COMMUNICATION_ERROR_DURATION,
        });
      }
      throw err;
    } finally {
      if (useLoader) {
        const index = ApiRequestIdTable.indexOf(requestId)
        ApiRequestIdTable.splice(index, 1)
        if (ApiRequestIdTable.length === 0) {
          storeRegistry.getStore().dispatch(changeLoadingStatus(false))
          console.log('loading-FALSE', path, body)
        };
        console.log(storeRegistry.getStore().getState().global.isLoading)
      };
    };
  };
};

export default {
  get: getMethod('GET'),
  post: getMethod('POST'),
  delete: getMethod('DELETE')
};