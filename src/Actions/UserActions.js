import Communication from 'communication/Communication';
import DomainApi from 'utils/DomainAPI';
import { notification } from 'antd';

export const register = (body) => {
	return async () => {
    try {
      await Communication.post(DomainApi.get('user/signup'),body)

      return {
        errors: false
      }
    } catch(error) {
      if (error.text) {
        notification.warn({
          message: error.text.msg,
          placement: "topRight",
          duration: 8,
        });
      };

      return {
        errors: true,
        userAlreadyExists: error?.text?.msg === "User Already Exists"
      };
    };
	};  
};

export const login = (body) => {
	return async () => {
    try {

      const response = await Communication.post(DomainApi.get('user/login'),body)
      localStorage.setItem('token', response.token);
      console.log(response.token)
      return {
        errors: false
      }
    } catch(error) {
      notification.warn({
        message: "Wrong password!",
        placement: "topRight",
        duration: 8,
      });
      // console.log(error.text)
      // if (error.text) {
      //   notification.warn({
      //     message: error.text.msg,
      //     placement: "topRight",
      //     duration: 8,
      //   });
      // };
      return {
        errors: true,
      };
    };
	};  
}; 