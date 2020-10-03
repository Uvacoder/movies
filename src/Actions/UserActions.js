import Communication from 'communication/Communication';
import DomainApi from 'utils/DomainAPI';
import { notification } from 'antd';

export const register = (body) => {
	return async () => {

    // var prom = Communication.post(DomainApi.get('user/signup'), body).then(res => {
    //   debugger;
    // })
    // debugger;
    // Communication.post(DomainApi.get('user/signup'), body).then(result => {
    //   console.log('ok')
    // }).catch(err => console.error(err))

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