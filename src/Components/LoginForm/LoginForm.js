import React from 'react';
import "./LoginForm.scss"
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      isPasswordValid: false
    }

    this.formRef = React.createRef();

    this._acceptPassword = null;
    this._rejectPassword = null;
    this.passPasswordPromise = new Promise((resolve, reject) => {
      this._acceptPassword = resolve;
      this._rejectPassword = reject;
    });
    this.passwordHasBeenEntered = false;
    window.LF = this;
  }

  onFinish = values => {
    this.props.login({
      "username": values.username,
      "password": values.password
    }).then(({errors} = {}) => {
      this.passwordHasBeenEntered = true;

      if (errors === false) {
        this._acceptPassword();
        this.props.history.push('/home');
        // this.setState({isPasswordValid: true})
      } else {
        this._rejectPassword("INVALID PASSWORD")
        // this.setState({isPasswordValid: false})
        // this.displayPasswordError('Invalid password')
      }
    })
  };

  onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo);
  };

  validatePassword = (rule, value, callback) => {
    // this.displayPasswordError = callback;
    // window.x = callback

    // if (this.passwordHasBeenEntered && !this.state.isPasswordValid) {
    //   callback("Invalid password")
    // } else {
    //   callback();
    // }

    if (this.passwordHasBeenEntered) {
      return this.passPasswordPromise; //todo bug - when pass is not entered but signin is clcked
    } else {
      return Promise.resolve();
    }

    // return Promise.reject('The two passwords that you entered do not match! XXX');
    // return this.passPasswordPromise;


    // if (this.state.isPasswordValid === false) {
    //   callback("Wrong password!");
    // } 
      // callback();
    // if (value !== "admin") {
    //   callback("Wrong password!");
    // } else {
    //   callback();
    // }
  };

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
              // submit={() => {
              //   debugger;
              // }}
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
                // { 
                //   validator: this.validatePassword,
                // },
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
                    // onClick={() => {
                    //   debugger;
                    //   this.passwordHasBeenEntered = true;
                    // }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={ () => {
                      this.props.history.push('/home')
                      localStorage.setItem('token', null);
                    }
                    }
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