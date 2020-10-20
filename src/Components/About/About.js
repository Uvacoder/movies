import React from 'react';
import "./About.scss"
import { Divider } from 'antd'
import { withRouter } from 'react-router-dom'

const About = (props) => {
  return (
    <div className='about'>
      <Divider className='about__divider' orientation='center'>About Movie Lounge</Divider>
      <div className='about__movie-lounge'>
        <span>The puprose of this website is to help you find information about your favorite movies.</span>
        <span>Movie Lounge is a non profit Single Page Application made to be a portfolio.</span>
        <span>It uses <a href='https://developers.themoviedb.org/3/getting-started'>TMDB (The Movie Database) </a> API to get all the information about movies, aswell pictures and ratings.</span>
        <span>This website was created to acquire programming skills and it's using:</span>
        <div className='about__movie-lounge-list'>
          <ul>
            <li>React</li>
            <li>Redux</li>
            <li>Ant Design</li>
          </ul>
        </div>
        <span><b>Backend</b> created by helpful friend, in Express.js with MongoDB.</span>
        <span>You can check out Movie Lounge source code by clicking <a href='https://bitbucket.org/patrykbura/movielounge'>HERE</a>.</span>
      </div>
      <Divider className='about__divider' orientation='center'>About Author</Divider>
      <div className='about__author'>
        <span>My name is Patryk Bura, i'm aspiring JavaScript/React Developer.</span>
        <span>This website is my Portfolio. Feel free to contact me via email or Linkedin.</span>
        <span>All contact details are available in contact tab. Click <a onClick={() => props.history.push('contact')}>HERE</a> to see.</span>
      </div>
      <Divider className='about__divider' orientation='center'>Movie Lounge FAQ</Divider>
      <div className='about__faq'>
        <span className='about__faq-header'>Here you can find some of the answers to questions, that may occur when using Movie Lounge.</span>
          <div className='about__faq-question'>
            <span>Q: How does popularity rating work?</span>
            <span>A: Popularity is metric made by TMDB, the model isn't official. Rating changes based on number of votes, views, realease date etc. 
            To make this statistic clearer it's capped in Movie Lounge to 100%. 
            </span>
          </div>
          <div className='about__faq-question'>
            <span>Q: Why there are no TV shows?</span>
            <span>A: TV shows feature is not developed yet, but it might be added in the future.</span>
          </div>
          <div className='about__faq-question'>
            <span>Q: What database are you using?</span>
            <span>A: TMDB (The Movie Database). You can check it out by clicking <a href='https://developers.themoviedb.org/3/getting-started'>HERE</a>.</span>
          </div>
      </div>
    </div>
  );
};

export default withRouter(About)

