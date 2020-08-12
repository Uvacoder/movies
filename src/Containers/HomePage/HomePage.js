import React, { useEffect } from 'react';
import "./HomePage.scss"
import { useSelector, useDispatch } from 'react-redux'
import { fetchTrending,fetchUpcomming } from 'actions/HomePageActions'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Divider } from 'antd'
import RandomMovie from '../RandomMovie/RandomMovie'
import UpcommingMovies from 'components/UpcommingMovies/UpcommingMovies'

const NO_OF_TRENDING_ITEMS = 20; // No more than 20, <- maximum TMDB API table length.
const NO_OF_UPCOMMING_ITEMS = 3;
const NO_OF_ITEMS_TRENDING_CAROUSEL = 5;
const IMG_URL = 'https://image.tmdb.org/t/p/w500'

function HomePage () {
  const trendingList = useSelector(state => state.homePage.trending.items);
  const upcommingList = useSelector(state => state.homePage.upcomming.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchUpcomming());
  },[dispatch]);

  const trendingCarouselResponsive = {
    all: {
      breakpoint: { max: Infinity, min: 0 },
      items: NO_OF_ITEMS_TRENDING_CAROUSEL
    }
  };  

  const renderTrendingMovieBlock = (item) => {
    return (
      <div className='home-page-container__trending-item' onClick={() => console.log(item)}>
        <img 
          className='home-page-container__trending-item-image' 
          src={ `${IMG_URL}${ item?.poster_path }`} 
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
          responsive={trendingCarouselResponsive}
          infinite={true}
          autoPlay={true}
        >
          { availableMovies.slice(0, NO_OF_TRENDING_ITEMS).map((item) => renderTrendingMovieBlock(item)) }
        </Carousel>
      </div>   
    )
  };

  const renderUpcomming = () => {
    const availableMovies = upcommingList.filter(movie => movie.poster_path && (movie.title || movie.orginal_title) )

    return availableMovies.slice(0, NO_OF_UPCOMMING_ITEMS).map((item) => {
      return (
        <UpcommingMovies item={item} /> 
      );
    });
  };
  
  return (
    <div className='home-page-container'>
      <div className='home-page-container__random'>
        <Divider className='home-page-container__main-title' orientation='left'>Don't know what to watch? Consider this title:</Divider>
        <RandomMovie />
      </div> 
      <div className='home-page-container__trending' > 
        <Divider className='home-page-container-trending-title' orientation='left'>Trending today</Divider>
        { renderTrending() }
      </div>
      <div className='home-page-container__upcomming'>
        <Divider className='home-page-container__upcomming-title' orientation='center'>Upcomming</Divider>
        { renderUpcomming() }
      </div>
    </div>
  );
};

export default HomePage;