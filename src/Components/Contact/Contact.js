import React from 'react';
import "./Contact.scss"
import { withRouter } from 'react-router-dom'
import Mail from '../../Images/mail.svg'
import Linkedin from '../../Images/linkedin.svg'
import Bitbucket from '../../Images/bitbucket.svg'

const Contact = (props) => {

  return (
    <div className='contact'>
      <div className='contact__content'>
        <span>Contact me via:</span>
        <div className='contact__content-items'>
          <div className='contact__content-items-item'>
            <a href='mailto:patrykbura@gmail.com'>
              <img src={Mail} />
            </a>
          </div>
          <div className='contact__content-items-item'>
            <a href='https://www.linkedin.com/in/patryk-bura-901107177'>
              <img src={Linkedin} />
            </a>
          </div>
        </div>
        <div className='contact__content-bitbucket'>
          <span>Check out my code:</span>
          <div className='contact__content-bitbucket-img'>
            <a href='https://bitbucket.org/patrykbura/'>
              <img src={Bitbucket} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Contact)

