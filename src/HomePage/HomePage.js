import React, { useEffect,useState } from 'react';
import "./HomePage.scss"
import { useSelector, useDispatch } from 'react-redux'
import { fetchTrending,fetchUpcomming, fetchRandom, cleanUpFetchRandom } from '../Actions/HomePageActions'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Divider } from 'antd'
import { PieChart } from 'react-minimal-pie-chart';
import DoughnutChart from '../DoughnutChart/DoughnutChart'

const NO_OF_TRENDING_ITEMS = 20; // No more than 20, <- maximum TMDB API table length.
const NO_OF_UPCOMMING_ITEMS = 3;
const NO_OF_FIRST_RANDOM_ITEM = 0;
const NO_OF_LAST_LAST_ITEM = 20; // No more than 20, <- maximum TMDB API table length.


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

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 5
    }
  };  

  function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

  const renderTrendingMovieBlock = (item) => {
    return (
      <div className='home-page-container__trending-item' onClick={() => console.log(item)}>
        <img 
          className='home-page-container__trending-item-image' 
          src={ `https://image.tmdb.org/t/p/w500${ item?.poster_path }`} 
          alt=''
        />
        <div className='home-page-container__trending-item-title'>{ item?.title || item?.orginal_title || item?.original_name}</div>
      </div>
      )
  }

  const renderTrending = () => {
    const availableMovies = trendingList.filter(movie => movie.title || movie.orginal_title || movie.original_name)

    return (
      <div style={{width: '100%'}}>
        <Carousel 
          responsive={responsive}
          infinite={true}
          autoPlay={true}
        >
          {availableMovies.slice(0, NO_OF_TRENDING_ITEMS).map((item) => renderTrendingMovieBlock(item))}
        </Carousel>
      </div>   
    )
  };

  const renderUpcomming = () => {
    const availableMovies = upcommingList.filter(movie => movie.title || movie.orginal_title )

    return availableMovies.slice(0, NO_OF_UPCOMMING_ITEMS).map((item) => {
      return (
        <div className='home-page-container__upcomming-item'>
          <img 
            className='home-page-container__upcomming-item-image' 
            src={ `https://image.tmdb.org/t/p/w500${ item?.poster_path }`} 
            alt=''
          />
          <div className='home-page-container__upcomming-item-text'>
           <div className='home-page-container__upcomming-item-title'>
             { item?.title || item?.orginal_title }
            </div>
            <div className='home-page-container__upcomming-item-title-date'>Release date: {item?.release_date}</div>
            <div className='home-page-container__upcomming-item-title-popularity'>
              Popularity score:
              <DoughnutChart data={Math.floor(item?.popularity)}/>  
            </div>
          </div> 
        </div>   
      );
    });
  };



  const renderRandomMovie = () => {

    return (
      <>
        <Divider className='home-page-container__main-title' orientation='center'>Don't know what to watch? Consider this title:</Divider>
        <div className='home-page-container__main-content'>
          <img className='home-page-container__main-image' src={`https://image.tmdb.org/t/p/w500${randomMovie[randomMovieId]?.poster_path}`}/>
          <div className='home-page-container__main-description'> 
            <div className='home-page-container__main-description-title'>{randomMovie[randomMovieId]?.title}</div>  
            <div className='home-page-container__main-description-overwiev'>Overwiev: {randomMovie[randomMovieId]?.overview}</div>
            <div className='home-page-container__main-description-date'>Release Date: {randomMovie[randomMovieId]?.release_date}</div>
            <div className='home-page-container__main-description-vote-wrapper'>
              <div className='home-page-container__main-description-popularity'>
                <div>Popularity:</div>
                <DoughnutChart data={Math.floor(randomMovie[randomMovieId]?.popularity)}/>
              </div>
              <div className='home-page-container__main-description-vote'>
                <div>Vote average:</div>
                <DoughnutChart data={randomMovie[randomMovieId]?.vote_average} maxValue={10} percent={false}/>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  return (
    <div className='home-page-container'>
      <div className='home-page-container__main'>
        {renderRandomMovie()}
      </div> 
      <div className='home-page-container__trending' > 
        <Divider className='home-page-container-trending-title' orientation='left'>Trending today</Divider>
        { renderTrending() }
      </div>
      <div className='home-page-container__upcomming'>
        <Divider className='home-page-container__upcomming-title' orientation='center'>Upcomming</Divider>
        {renderUpcomming()}
      </div>
    </div>
  );
};

export default HomePage;