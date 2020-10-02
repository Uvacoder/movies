import Communication from 'communication/Communication';
import DomainApi from 'utils/DomainAPI';
import { notification } from 'antd';

export const register = (body) => {
	return async () => {
    try {
      await Communication.post(DomainApi.get('user/signup'),body)
    } catch(error) {
      notification.error({
        message: "ERROR!",
        description: "An error has occured, please try again.",
        placement: "topRight"
      });
    };
	};  
}; 