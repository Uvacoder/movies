import React from 'react';
import "./LoginForm.scss"
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';

class LoginForm extends React.Component {

  onFinish = values => {
    console.log('Success:', values);
    this.props.history.push('/home')
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  validatePassword = (rule, value, callback) => {
    if (value !== "admin") {
      callback("Wrong password!");
    } else {
      callback();
    }
  };

  render() {
    return (
      <div className="login-form">
        <div className="login-form__welcome">Sign In</div>
          <div className="login-form__container">
           <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
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
                { 
                  validator: this.validatePassword,
                },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
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
                  <Button 
                    onClick={ () => this.props.history.push('/home') }
                    className='login-form__container-buttons-guest'
                  >
                    Continue as a Guest
                  </Button>
                </div>
              </Form.Item>
              <div className="registration-form"> 
                <div  className="registration-form__label" onClick={ this.props.goTo }>Not registered yet? Click here to Sign Up!</div>
              </div>
          </Form>
        </div>
      </div>
    )
  }
};

export default withRouter(LoginForm) ;