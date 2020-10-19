import React from 'react';
import "./MovieSimilar.scss"
import Carousel from 'react-multi-carousel';
import TMDBApi from 'utils/TMDBApi';

const NO_OF_ITEMS_SIMILAR_MOVIES = 6;
const IMG_SIZE = 500;
const CAROUSEL_SLIDES_TO_SLIDE = 2;
const CAROUSEL_AUTOPLAY_DURATION = 5000;

const MovieSimilar = (props) => {
  const {
      similarMovies
  } = props;

  const SimilarMoviesCarouselResponsive = {
    all: {
      breakpoint: { max: Infinity, min: 0 },
      items: NO_OF_ITEMS_SIMILAR_MOVIES
    }
  };  

  const renderCastBlock = (item, idx) => {
    return (
      <div 
        className='movie-similar__container routed-image-carousel' 
        onClick={() => props.routeToMovieDetails(item.id)}
        key={idx}
      >
        <img 
            className='movie-similar__container-image ' 
            src={ `${TMDBApi.getImgURL(IMG_SIZE)}${ item.poster_path }`} 
            alt='poster'
            
        />
        <div 
          className='movie-similar__container-title routed-text'>
          { item?.title}
        </div>
      </div>
    )
  }

  return (
    <div className='movie-similar'>
      <div style={{width: '100%'}}>
        <Carousel 
          responsive={SimilarMoviesCarouselResponsive}
          infinite={true}
          autoPlay={true}
          slidesToSlide={CAROUSEL_SLIDES_TO_SLIDE}
          autoPlaySpeed={CAROUSEL_AUTOPLAY_DURATION}
        >
        { similarMovies.filter((item) => item.poster_path).map((item, idx) => renderCastBlock(item, idx)) }
        </Carousel>
      </div>   
    </div>
  );
};

MovieSimilar.defaultProps = {
    similarMovies: []
}

export default MovieSimilar

