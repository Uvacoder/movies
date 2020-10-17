import React, { useEffect } from 'react';
import "./HomePage.scss"
import { useSelector, useDispatch } from 'react-redux'
import { fetchTrending, fetchUpcomming, fetchRandom } from 'actions/HomePageActions'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Divider } from 'antd'
import RandomMovie from '../RandomMovie/RandomMovie'
import UpcommingMovies from 'components/UpcommingMovies/UpcommingMovies'
import { routeToMovieDetails } from 'utils/Routing/Routing'
import Calculation from 'utils/Calculation';
import TMDBApi from 'utils/TMDBApi';

const NO_OF_TRENDING_ITEMS = 20; // No more than 20, <- maximum TMDB API table length.
const NO_OF_UPCOMMING_ITEMS = 3;
const NO_OF_ITEMS_TRENDING_CAROUSEL = 5;
const IMG_SIZE = 500;
const CAROUSEL_SLIDES_TO_SLIDE = 2
const CAROUSEL_AUTOPLAY_DURATION = 5000;

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
      <div 
        className='home-page-container__trending-item routed-image-carousel' 
        onClick={() => dispatch(routeToMovieDetails(item.id))} 
        key={ item.id }
      >
        <img 
          className='home-page-container__trending-item-image' 
          src={ `${TMDBApi.getImgURL(IMG_SIZE)}${ item.poster_path }`} 
          alt=''  
        />
        <div 
          className='home-page-container__trending-item-title routed-text'>
          { item?.title || item?.orginal_title || item?.original_name}
        </div>
      </div>
      )
  }

  const renderTrending = () => {
    const availableMovies = trendingList.filter(movie => movie.title || movie.orginal_title)
    return (
      <div className="home-page-container__trending-carousel">
        <Carousel 
          responsive={trendingCarouselResponsive}
          infinite={true}
          autoPlay={true}
          slidesToSlide={CAROUSEL_SLIDES_TO_SLIDE}
          autoPlaySpeed={CAROUSEL_AUTOPLAY_DURATION}
        >
          { availableMovies.slice(0, NO_OF_TRENDING_ITEMS).map((item) => renderTrendingMovieBlock(item)) }
        </Carousel>
      </div> 
    )
  };

  const renderUpcomming = () => {
    const availableMovies = upcommingList.filter(movie => movie.poster_path && (movie.title || movie.orginal_title))
    const shuffledArray = Calculation.shuffleArray(availableMovies)

    return shuffledArray.slice(0, NO_OF_UPCOMMING_ITEMS).map((item, idx) => {
      return (
        <UpcommingMovies 
          item={item} 
          routeToMovieDetails={() => dispatch(routeToMovieDetails(item.id))}
          key={idx}
        /> 
      );
    });
  };
  
  return (
    <div className='home-page-container'>
      <div className='home-page-container__random'>
        <Divider className='home-page-container__main-title' orientation='center'>
          Consider this movie or draw <a onClick={ () => dispatch(fetchRandom()) }>another one</a>
        </Divider>
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