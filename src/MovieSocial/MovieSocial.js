import React from 'react';
import "./MovieSocial.scss"
import Homepage from '../Images/homepage.svg'
import Facebook from '../Images/facebook.svg'
import Instagram from '../Images/instagram.svg'
import Twitter from '../Images/twitter.svg'
import IMDB from '../Images/IMDB.svg'

const MovieSocial = (props) => {
  const {
    movieHomePage,
    facebookPage,
    InstagramPage,
    TwitterPage,
    IMDBPage
  } = props;


  const renderSocialTag = (propName, imgPath) => {
    return (
      <a href={propName}>
        <img 
          className={ !propName && 'img-disabled' } 
          src={ imgPath } 
          alt={`${ imgPath }`} 
        />
      </a>
    )
  }

  return (
    <div className='movie-social'>
      { renderSocialTag(movieHomePage, Homepage) }
      { renderSocialTag(IMDBPage, IMDB) }
      { renderSocialTag(facebookPage, Facebook) }
      { renderSocialTag(InstagramPage, Instagram) }
      { renderSocialTag(TwitterPage, Twitter) }
    </div>
  );
};

MovieSocial.defaultProps = {
    movieHomePage: '',
    facebookPage: '',
    InstagramPage: '',
    TwitterPage: '',
    IMDBPage: ''
}

export default MovieSocial