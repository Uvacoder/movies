import React from 'react';
import Particles from 'particles.js'; // to do -> move to app js
import "./WelcomePage.scss"
import LoginForm from '../../Components/LoginForm/LoginForm';
import Registration from '../../Components/Registration/Registration'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { register, login } from 'actions/UserActions'

class WelcomePage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loginForm: true
    }
  }

  componentDidMount() {
    window.particlesJS.load('particles-js', './particles.json');
  }
  renderContent = () => {
    if (this.state.loginForm) {
      return <LoginForm login={this.props.login} goTo={this.goToRegistration}/>
    } else {
      return <Registration register={this.props.register} goToLogin={this.goToLogin}/>
    }
  }

  goToRegistration = () => {
    this.setState({
      loginForm: false
    })
  }

  goToLogin = () => {
    this.setState({
      loginForm: true
    })
  }

  render() {
    return (
      <div className="welcome-page">
        <div id="particles-js"></div>
          <div className="welcome-page__action-form">
            {this.renderContent()}
          </div>
        <div className='welcome-page__title-wrapper'>
          <div className='welcome-page__title-wrapper-main'>Movie Lounge</div>
          <div className='welcome-page__title-wrapper-quote'>"The true formula to happines is binge watching movies" ~ Albert Einstein</div>
        </div>    
        <div className="welcome-page__footer">Created by Patryk Bura</div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  register,
  login,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);