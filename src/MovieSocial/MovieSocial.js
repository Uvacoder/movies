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


    return (
        <div className='movie-social'>
            <a href={movieHomePage}>
                <img className={ !movieHomePage && 'img-disabled' } src={Homepage} />
            </a>
            <a href={IMDBPage}>
                <img className={ !IMDBPage && 'img-disabled' } src={IMDB} />
            </a>  
            <a href={facebookPage}>
                <img className={ !facebookPage && 'img-disabled' } src={Facebook} />
            </a>
            <a href={InstagramPage}>
                <img className={ !InstagramPage && 'img-disabled' } src={Instagram} />
            </a>
            <a href={TwitterPage}>
                <img className={ !TwitterPage && 'img-disabled' } src={Twitter} />
            </a>        
        </div>
    );
};

MovieSocial.defaultProps = {
    movieHomePage: null,
    facebookPage: null,
    InstagramPage: null,
    TwitterPage: null,
    IMDBPage: null
}

export default MovieSocial

