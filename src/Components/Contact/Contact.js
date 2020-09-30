import React from 'react';
import "./Contact.scss"
import { withRouter } from 'react-router-dom'
import Mail from '../../Images/mail.svg'
import Linkedin from '../../Images/linkedin.svg'
import Bitbucket from '../../Images/bitbucket.svg'

const CONTACT_MAIL_ADRESS = 'patrykbura@gmail.com'
const CONTACT_LINKEDIN_ADRESS = 'https://www.linkedin.com/in/patryk-bura-901107177'
const CONTACT_BITBUCKET_ADRESS = 'https://bitbucket.org/patrykbura'

const Contact = (props) => {
  return (
    <div className='contact'>
      <div className='contact__content'>
        <span>Contact me via:</span>
        <div className='contact__content-items'>
          <div className='contact__content-items-item'>
            <a href={`mailto:${CONTACT_MAIL_ADRESS}`}>
              <img src={Mail} />
            </a>
          </div>
          <div className='contact__content-items-item'>
            <a href={CONTACT_LINKEDIN_ADRESS}>
              <img src={Linkedin} />
            </a>
          </div>
        </div>
        <div className='contact__content-bitbucket'>
          <span>Check out my code:</span>
          <div className='contact__content-bitbucket-img'>
            <a href={CONTACT_BITBUCKET_ADRESS}>
              <img src={Bitbucket} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Contact)

