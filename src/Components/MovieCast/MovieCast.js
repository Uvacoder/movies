import React from 'react';
import "./MovieCast.scss"
import Carousel from 'react-multi-carousel';
import TMDBApi from 'utils/TMDBApi';
import AvatarPlaceholderMan from '../../Images/avatarPlaceholderMan.svg'
import AvatarPlaceholderWoman from '../../Images/avatarPlaceholderWoman.svg'

const MOVIE_CAST_NO_OF_CAROUSEL_ITEMS = 6;
const IMG_SIZE = 185;
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

  const renderPlaceholder = (gender) => {
    if (gender === 1) {
      return AvatarPlaceholderWoman
    }
    
    return AvatarPlaceholderMan
  };

  const renderCastBlock = (item, idx) => {
    return (
      <div className='movie-cast__container' key={idx}>
        <img 
          className='movie-cast__container-image' 
          src={ item.profile_path ? `${TMDBApi.getImgURL(IMG_SIZE)}${ item.profile_path }` : renderPlaceholder(item.gender) } 
          alt=''
        />
        <div className='movie-cast__container-name'>{ item.name }</div>
        <div className='movie-cast__container-character'>{ item.character }</div>
      </div>
    );
  };

  return (
    <div className='movie-cast'>
      <div style={{width: '100%'}}> {/* Carousel component bug workaround */}
        <Carousel 
          responsive={movieCastCarouseleResponsive}
          infinite={false}
          autoPlay={false}
          slidesToSlide={CAROUSEL_SLIDES_TO_SLIDE}
        >
          { castItems.map((item,idx) => renderCastBlock(item,idx)) }
        </Carousel>
      </div>   
    </div>
  );
};

MovieCast.defaultProps = {
    castItems: []
};

export default MovieCast