import React from 'react';
import "./WelcomePage.scss"
import LoginForm from '../../Components/LoginForm/LoginForm';
import Registration from '../../Components/Registration/Registration'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { register, login } from 'actions/UserActions'
import { Button, Popover } from 'antd';
import { withRouter } from 'react-router-dom'
import UserUtil from 'utils/UserUtil'
import {ReactComponent as MovieReel} from '../../Images/moviereel.svg';
import {ReactComponent as Rate} from '../../Images/rate.svg';
import {ReactComponent as Review} from '../../Images/book.svg';
import {ReactComponent as List} from '../../Images/list.svg';

class WelcomePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loginForm: true
    };
  };

  renderDescription = (descriptionText, imgPath) => {
    return (
      <div className="welcome-page__title-wrapper-description">
        { imgPath }
        <p>{ descriptionText }</p>
      </div>
    );
  };

  logOut = () => {
    UserUtil.logOut();
    this.setState({loginForm: true})
  };

  renderContent = () => {
    if (!localStorage.getItem("token")) {
      if (this.state.loginForm) {
        return <LoginForm login={this.props.login} goToRegistration={this.goToRegistration} />
      } else {
        return <Registration register={this.props.register} goToLogin={this.goToLogin}/>
      };
    } else {
      return (
        <div className="welcome-page__action-form-logged">
          <Button onClick={() => this.props.history.push('/home')}>
            <span>Continue as <b>{localStorage.getItem('userName')}</b></span>
          </Button>
          <Button onClick={ this.logOut }>
            Switch to a diffrent account
          </Button>
        </div>
      );
    };
  };

  goToRegistration = () => {
    this.setState({
      loginForm: false
    });
  };

  goToLogin = () => {
    this.setState({
      loginForm: true
    });
  };

  renderOverlay = () => {
    return (
      <div className="welcome-page__overlay" />
    )
  }

  render() {
    return (
      <div className="welcome-page">
        <div className="welcome-page__action-form">
          {this.renderContent()}
        </div>
        <div className='welcome-page__title-wrapper'>
          <div className='welcome-page__title-wrapper-main'>Movie Lounge</div>
          {this.renderDescription('Discover movies', <MovieReel/>)}
          {this.renderDescription('Rate and comment', <Rate/>)}
          {this.renderDescription('Read reviews', <Review/>)}
          {this.renderDescription('Browse toplists', <List/>)}
        </div>
      </div>
    );
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  register,
  login,
}, dispatch)

export default connect(null, mapDispatchToProps)(withRouter(WelcomePage));