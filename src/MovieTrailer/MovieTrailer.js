import React from 'react';
import "./MovieTrailer.scss"
import Carousel from 'react-multi-carousel';
import YouTube from 'react-youtube';


const MovieTrailer = (props) => {
  const {
    videoItems
  } = props;

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1
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
          { videoItems.filter((item) => item.site === "YouTube").map((item) => renderMovieTrailerBlock(item)) }
        </Carousel>
      </div>   
    </div>
  );
};

MovieTrailer.defaultProps = {
  videoItems: []
}

export default MovieTrailer

