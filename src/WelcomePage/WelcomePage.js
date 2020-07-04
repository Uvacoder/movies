import React from 'react';
import Particles from 'particles.js'; // to do -> move to app js
import "./WelcomePage.scss"
import LoginForm from '../LoginForm/LoginForm';
import Registration from '../Registration/Registration'

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
            return (<LoginForm goTo={this.goToRegistration}/>)
        } else {
           return <Registration />
        }
    }

    goToRegistration = () => {
        this.setState({
            loginForm: false
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

export default WelcomePage;