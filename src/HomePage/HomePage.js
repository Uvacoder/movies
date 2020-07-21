import React, { useEffect,useState } from 'react';
import "./HomePage.scss"
import { useSelector, useDispatch } from 'react-redux'
import { fetchTrending,fetchUpcomming, fetchRandom, cleanUpFetchRandom } from '../Actions/HomePageActions'
import { Divider } from 'antd';

const NO_OF_TRENDING_ITEMS = 4;
const NO_OF_UPCOMMING_ITEMS = 3;
const NO_OF_FIRST_RANDOM_ITEM = 0;
const NO_OF_LAST_LAST_ITEM = 19; // No more than 19, <- maximum TMDB API table length.

function HomePage () {

  const trendingList = useSelector(state => state.homePage.trending.items);
  const upcommingList = useSelector(state => state.homePage.upcomming.items);
  const randomMovie = useSelector(state => state.homePage.random.items);
  const [randomMovieId, setRandomMovieId] = useState(randomInt(NO_OF_FIRST_RANDOM_ITEM, NO_OF_LAST_LAST_ITEM));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchUpcomming());
    dispatch(fetchRandom());

    return () => {
      setRandomMovieId(null);
      dispatch(cleanUpFetchRandom());
      console.log('cleaned up')
    }
  },[dispatch]);

  function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  const renderTrending = () => {
    const availableMovies = trendingList.filter(movie => movie.title)

    return availableMovies.slice(0, NO_OF_TRENDING_ITEMS).map((item) => {
      return (
      <div className='home-page-container__trending-item'>
        <img 
          className='home-page-container__trending-item-image' 
          src={ `https://image.tmdb.org/t/p/w500${ item?.poster_path }`} 
          alt=''
        />
        <div className='home-page-container__trending-item-title'>{ item?.title }</div>
      </div>
      )
    });
  };

  const renderUpcomming = () => {
    const availableMovies = upcommingList.filter(movie => movie.title || movie.orginal_title)

    return availableMovies.slice(0, NO_OF_UPCOMMING_ITEMS).map((item) => {
      return (
        <div className='home-page-container__upcomming-item'>
          <img 
            className='home-page-container__upcomming-item-image' 
            src={ `https://image.tmdb.org/t/p/w500${item?.poster_path}`} 
            alt=''
          />
          <div className='home-page-container__upcomming-item-text'>
           <div className='home-page-container__upcomming-item-title'>
             { item?.title || item?.orginal_title }
            </div>
            <div className='home-page-container__upcomming-item-title-popularity'>Popularity score: {item?.popularity}</div>
            <div className='home-page-container__upcomming-item-title-date'>Release date: {item?.release_date}</div>
          </div> 
        </div>   
      );
    });
  };



  const renderRandomMovie = () => {

    return (
      <>
        <div className='home-page-container__main-title'> You might want to watch today: </div>
        <div className='home-page-container__main-content'>
          <img className='home-page-container__main-image' src={`https://image.tmdb.org/t/p/w500${randomMovie[randomMovieId]?.poster_path}`}/>
          <div className='home-page-container__main-description'> 
            <div>Title: {randomMovie[randomMovieId]?.title}</div>  
            <div>Release Date: {randomMovie[randomMovieId]?.release_date}</div>
            <div>Overwiev: {randomMovie[randomMovieId]?.overview}</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='home-page-container'>
      <div className='home-page-container__welcome'>Welcome to Movie Lounge!</div>
      {/* <Divider className='home-page-container-divider1' /> */}
      <div className='home-page-container__main'>
        {renderRandomMovie()}
      </div>
      <div className='home-page-container__trending'>
        {renderTrending()}
      </div>
      <div className='home-page-container__upcomming'>
        {renderUpcomming()}
      </div>
    </div>
  );
};

export default HomePage;