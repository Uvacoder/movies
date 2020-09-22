import React from 'react';
import "./About.scss"
import { Divider } from 'antd'
import { withRouter } from 'react-router-dom'

const About = (props) => {

  return (
    <div className='about'>
      <Divider className='about__divider' orientation='center'>About Movie Lounge</Divider>
      <div className='about__movie-lounge'>
        <span>Movie Lounge is a non profit Single Page Application created in React, made as a portfolio.</span>
        <span>This is a place where you can find information about your favorite movies. </span>
        <span>It uses TMDB (The Movie Database) API to get all the information about movies, aswell pictures and ratings.</span>
        <span>You can check it out by clicking <a href='https://developers.themoviedb.org/3/getting-started'>HERE</a></span>
        <span>This website was created to acquire programming skills.</span>
      </div>
      <Divider className='about__divider' orientation='center'>About Author</Divider>
      <div className='about__author'>
        <span>Hi!</span>
        <span>My name is Patryk Bura, i'm aspiring JavaScript/React Developer.</span>
        <span>This website is my Portfolio. Feel free to contact me via email or Linkedin.</span>
        <span>All contact details are available in Contact tab. Click <a onClick={() => props.history.push('home')}>HERE</a> to see.</span>
        <span>You can check out Movie Lounge source code by clicking <a href='https://bitbucket.org/patrykbura/movielounge'>HERE</a>.</span>
      </div>
      <Divider className='about__divider' orientation='center'>Movie Lounge FAQ</Divider>
      <div className='about__faq'>
        <span>Here you can find some of the answers to questions that may occur when using Movie Lounge.</span>
          <div>
            <span>Q: How does popularity rating work?</span>
            <span>A: Popularity is metric made by TMDB, the model isn't official. Rating changes based on number of votes, views, realease date etc. 
            To make this statistic clearer it's capped in Movie Lounge to 100%. 
            </span>
          </div>
      </div>
    </div>
  );
};

export default withRouter(About)

