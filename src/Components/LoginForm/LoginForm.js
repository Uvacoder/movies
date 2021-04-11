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

const TOOTLTIP_COLOR = '#f5f5f5';

class LoginForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showLoginTooltip: false
    }

    this.formRef = React.createRef();
  };

  componentDidMount() {
    if (!this.getWelcomePageTootlipVisited()) {
      setTimeout(() => {
        this.setState({ showLoginTooltip: true })
      }, 1500)
    }
  }

  getWelcomePageTootlipVisited = () => {
    return JSON.parse(localStorage.getItem('welcomePageTooltipVisited'))
  }

  onFinish = values => {
    this.props.login({
      "username": values.username,
      "password": values.password
    }).then(({errors} = {}) => {
      if (errors === false) {
        localStorage.setItem('userName', values.username);
        localStorage.setItem('welcomePageTooltipVisited', true);
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
    localStorage.setItem('welcomePageTooltipVisited', true);
  };

  renderTooltipText = () => {
    return (
      <div 
        className="login-form__tooltip-text" 
        onClick={() => this.setState({showLoginTooltip: false})}
      >
        <p>First time here?</p>
        <p>Try out as Guest!</p>
      </div>
    );
  };

  renderWithTooltip = (component) => {
    return (
      <Tooltip 
        placement="rightTop"
        title={this.renderTooltipText} 
        color={TOOTLTIP_COLOR}
        visible="true"
        overlayClassName="login-form__tooltip-overlay"
      >
        { component }
      </Tooltip>
    )
  }

  renderGuestButton() {
    const button = (
      <Button 
        onClick={ this.continueAsGuest } 
        className='login-form__container-buttons-guest'
      >
        Continue as a Guest
      </Button>
    )
    if (!this.state.showLoginTooltip || this.getWelcomePageTootlipVisited()) {
      return button;
    } else {
      return this.renderWithTooltip(button);
    }
  }

  render() {
    return (
      <div className="login-form" >
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