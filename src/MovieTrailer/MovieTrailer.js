import React from 'react';
import "./MovieTrailer.scss"
import Carousel from 'react-multi-carousel';
import YouTube from 'react-youtube';

const NO_OF_VIDEOS_DISPLAYED = 1;
const NAME_OF_SEARCHED_SITE = "YouTube";

const MovieTrailer = (props) => {
  const {
    videoItems
  } = props;

  const responsive = {
    all: {
      breakpoint: { max: Infinity, min: 0 },
      items: NO_OF_VIDEOS_DISPLAYED
    }
  };  

  const renderMovieTrailerBlock = (item) => {
    return (
      <div className='movie-trailer__container'>
        <YouTube videoId={ item.key }  />
      </div>
    )
  }

  return (
    <div className='movie-trailer'>
      <div style={{width: '100%'}}>
        <Carousel 
          responsive={responsive}
          infinite={false}
          autoPlay={false}
          keyBoardControl={false}
        >
          { videoItems.filter((item) => item.site === NAME_OF_SEARCHED_SITE).map((item) => renderMovieTrailerBlock(item)) }
        </Carousel>
      </div>   
    </div>
  );
};

MovieTrailer.defaultProps = {
  videoItems: []
}

export default MovieTrailer

