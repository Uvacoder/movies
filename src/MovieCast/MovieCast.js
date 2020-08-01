import React from 'react';
import "./MovieCast.scss"
import Carousel from 'react-multi-carousel';


const MovieCast = (props) => {

    const {
        castItems
    } = props;

    const responsive = {
        all: {
          breakpoint: { max: 4000, min: 0 },
          items: 6
        }
      };  

    const renderCastBlock = (item) => {
    return (
        <div className='movie-cast__container'>
        <img 
            className='movie-cast__container-image' 
            src={ `https://image.tmdb.org/t/p/w500${ item?.profile_path }`} 
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
          responsive={responsive}
          infinite={false}
          autoPlay={false}
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

