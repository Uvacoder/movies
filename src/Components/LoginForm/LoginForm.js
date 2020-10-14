import React from 'react';
import "./LoginForm.scss"
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Tooltip } from 'antd';

const TOOTLTIP_TEXT = "By continuing as a guest you won't be able to use all of Movie Lounge features.";
const TOOTLTIP_COLOR = '#1890ff';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);

    this.formRef = React.createRef();
  }

  onFinish = values => {
    this.props.login({
      "username": values.username,
      "password": values.password
    }).then(({errors} = {}) => {
      if (errors === false) {
        localStorage.setItem('userName', values.username);
        this.props.history.push('/home');
      } else {
        this.formRef.current.setFields([
          {
            name: 'password',
            errors: ['Wrong password'],
          },
       ]);
      };
    });
  };

  continueAsGuest = () => {
    localStorage.setItem('userName', null);
    localStorage.setItem('token', null);
    this.props.history.push('/home')    
  }

  render() {
    return (
      <div className="login-form">
        <div className="login-form__welcome">Sign In</div>
          <div className="login-form__container">
           <Form
              ref={this.formRef}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              >
              <Form.Item
                label="Username"
                name="username"
                size="large"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item >
                <div className='login-form__container-buttons'>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    className='login-form__container-buttons-login'
                  >
                    Sign In
                  </Button>
                  <Tooltip placement="bottom" title={TOOTLTIP_TEXT} color={TOOTLTIP_COLOR}>
                    <Button 
                      onClick={ () => { this.continueAsGuest()} }
                      className='login-form__container-buttons-guest'
                    >
                      Continue as a Guest
                    </Button>
                  </Tooltip>
                </div>
              </Form.Item>
              <div className="registration-form"> 
                <div  className="registration-form__label" onClick={ this.props.goTo }>Not registered yet? Click here to Sign Up!</div>
              </div>
          </Form>
        </div>
      </div>
    );
  };
};

export default withRouter(LoginForm) ;