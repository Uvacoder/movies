import React from 'react';
import "./MovieCast.scss"
import Carousel from 'react-multi-carousel';
import TMDBApi from 'utils/TMDBApi';

const MOVIE_CAST_NO_OF_CAROUSEL_ITEMS = 6;
const IMG_SIZE = 500;
const CAROUSEL_SLIDES_TO_SLIDE = 3;

const MovieCast = (props) => {
  const {
    castItems
  } = props;

  const movieCastCarouseleResponsive = {
    all: {
      breakpoint: { max: Infinity, min: 0 },
      items: MOVIE_CAST_NO_OF_CAROUSEL_ITEMS
    }
  };  

  const renderCastBlock = (item) => {
  return (
    <div className='movie-cast__container'>
      <img 
          className='movie-cast__container-image' 
          src={ `${TMDBApi.getImgURL(IMG_SIZE)}${ item?.profile_path }`} 
          alt=''
      />
      <div className='movie-cast__container-name'>{ item?.name}</div>
      <div className='movie-cast__container-character'>{ item?.character}</div>
    </div>
    )
  }

  return (
    <div className='movie-cast'>
      <div style={{width: '100%'}}>
        <Carousel 
          responsive={movieCastCarouseleResponsive}
          infinite={false}
          autoPlay={false}
          slidesToSlide={CAROUSEL_SLIDES_TO_SLIDE}
        >
          { castItems.filter((item) => item.profile_path).map((item) => renderCastBlock(item)) }
        </Carousel>
      </div>   
    </div>
  );
};

MovieCast.defaultProps = {
    castItems: []
}

export default MovieCast

