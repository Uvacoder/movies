import React from 'react';
import "./MovieSimilar.scss"
import Carousel from 'react-multi-carousel';

const MovieSimilar = (props) => {
  const {
      similarMovies
  } = props;

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 6
    }
  };  

  const renderCastBlock = (item) => {
  return (
      <div className='movie-similar__container'>
      <img 
          className='movie-similar__container-image' 
          src={ `https://image.tmdb.org/t/p/w500${ item?.poster_path }`} 
          alt=''
      />
      <div className='movie-similar__container-title'>{ item?.title}</div>
      </div>
      )
  }

  return (
    <div className='movie-similar'>
      <div style={{width: '100%'}}>
        <Carousel 
          responsive={responsive}
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

