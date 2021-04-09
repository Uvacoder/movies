import React from 'react';
import "./LoginForm.scss"
import { withRouter } from 'react-router-dom'
import { 
  Form, 
  Input, 
  Button, 
  Tooltip,
} from 'antd';
import UserUtil from 'utils/UserUtil'

// const TOOTLTIP_TEXT = () =><> <p>First time?</p><p>Click here!</p></>;
const TOOTLTIP_COLOR = '#1890ff';
// const content = (
//   <div>
//     <p>Content</p>
//     <p>Content</p>
//   </div>
// );

class LoginForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showLoginTooltip: false
    }

    this.formRef = React.createRef();
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showLoginTooltip: true })
    }, 3000)
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
    UserUtil.logOut()
    this.props.history.push('/home')    
  };

  renderTooltipText = () => {
    return (
      <div>
        <p>First time?</p>
        <p>Try out as Guest!</p>
      </div>
    );
  };

  renderWithTooltip = (component) => {
    return (
      <Tooltip 
        placement="right"
        title={this.renderTooltipText} 
        color={TOOTLTIP_COLOR}
        visible="true"
        mouseEnterDelay="511"
        arrowPointAtCenter="true"
      >
        { component }
      </Tooltip>
    )
  }

  // renderGuestButton = () => {
  //   return this.renderTooltip(
  //     <Button 
  //       onClick={ this.continueAsGuest } 
  //       className='login-form__container-buttons-guest'
  //     >
  //       Continue as a Guest
  //     </Button>
  //   )
  // }

  renderGuestButton() {
    const button = (
      <Button 
        onClick={ this.continueAsGuest } 
        className='login-form__container-buttons-guest'
      >
        Continue as a Guest
      </Button>
    )

    if (!this.state.showLoginTooltip) {
      return button;
    } else {
      return this.renderWithTooltip(button);
    }
  }

  render

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
                  {/* <Tooltip 
                    placement="right"
                    title={this.renderTooltipText} 
                    color={TOOTLTIP_COLOR}
                    visible="true"
                    mouseEnterDelay="511"
                    arrowPointAtCenter="true"
                  >
                    <Button 
                      onClick={ this.continueAsGuest } 
                      className='login-form__container-buttons-guest'
                    >
                      Continue as a Guest
                    </Button>
                  </Tooltip> */}
                  { this.renderGuestButton() }
                </div>
              </Form.Item>
              <div className="registration-form"> 
                <div className="registration-form__label" onClick={ this.props.goToRegistration }>
                  Not registered yet? Click here to Sign Up!
                </div>
              </div>
          </Form>
        </div>
      </div>
    );
  };
};

export default withRouter(LoginForm);