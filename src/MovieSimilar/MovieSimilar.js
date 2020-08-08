import React from 'react';
import "./MovieSimilar.scss"
import Carousel from 'react-multi-carousel';

const NO_OF_ITEMS_SIMILAR_MOVIES = 6;
const TMDB_API_IMG_PATH = 'https://image.tmdb.org/t/p/w500';

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

  const renderCastBlock = (item) => {
    return (
      <div className='movie-similar__container'>
        <img 
            className='movie-similar__container-image' 
            src={ `${TMDB_API_IMG_PATH}${ item?.poster_path }`} 
            alt='poster'
        />
        <div className='movie-similar__container-title'>
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
        >
        { similarMovies.filter((item) => item.poster_path).map((item) => renderCastBlock(item)) }
        </Carousel>
      </div>   
    </div>
  );
};

MovieSimilar.defaultProps = {
    similarMovies: []
}

export default MovieSimilar

