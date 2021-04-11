import React from 'react';
import "./Contact.scss"
import { withRouter } from 'react-router-dom'
import {ReactComponent as Mail} from '../../Images/mail.svg';
import {ReactComponent as Linkedin} from '../../Images/linkedin.svg';
import {ReactComponent as Github} from '../../Images/github-name.svg';

const CONTACT_MAIL_ADRESS = 'patrykbura@gmail.com'
const CONTACT_LINKEDIN_ADRESS = 'https://www.linkedin.com/in/patryk-bura-901107177'
const CONTACT_GITHUB_ADRESS = 'https://github.com/patrykbura'

const Contact = () => {
  return (
    <div className='contact'>
      <div className='contact__content'>
        <span>Contact me via:</span>
        <div className='contact__content-items'>
          <div className='contact__content-items-item'>
            <a href={`mailto:${CONTACT_MAIL_ADRESS}`}>
              <Mail />
            </a>
          </div>
          <div className='contact__content-items-item'>
            <a href={CONTACT_LINKEDIN_ADRESS}>
              <Linkedin />
            </a>
          </div>
        </div>
        <div className='contact__content-github'>
          <span>Check out my code:</span>
          <div className='contact__content-github-img'>
            <a href={CONTACT_GITHUB_ADRESS}>
              <Github />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Contact)