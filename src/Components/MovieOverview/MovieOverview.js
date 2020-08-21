import React from 'react';
import "./MovieOverview.scss"
import { Scrollbars } from 'react-custom-scrollbars';

const MovieOverview = (props) => {
  const {
    poster,
    description,
    genres,
    realeaseDate,
    runtime,
    country,
    director,
    writers,
    budget,
    revenue,
    languages,
    companies
  } = props;

  return (
    <div className='movie-overview'>
      <div className='movie-overview__poster'>
        <img src={poster} alt='poster'/>
      </div>
      <div className='movie-overview__description'>
        <div className='movie-overview__description-title'>Overview:</div>
        <Scrollbars autoHeight>
          <div className='movie-overview__description-text'>{description}</div>   
        </Scrollbars>  
      </div>
      <div className='movie-overview__release'>
        <div className='movie-overview__release-title'>Release date:</div>
        <div className='movie-overview__release-text'>{realeaseDate}</div>
      </div>
      <div className='movie-overview__genres'>
        <div className='movie-overview__genres-title'>Genres:</div>
        <div className='movie-overview__genres-text'>{genres}</div>
      </div>
      <div className='movie-overview__director'>
        <div className='movie-overview__director-title'>Director:</div>
        <div className='movie-overview__director-text'>{director}</div>
      </div>
      <div className='movie-overview__writers'>
        <div className='movie-overview__writers-title'>Writers:</div>
        <div className='movie-overview__writers-text'>{writers}</div>
      </div>
      <div className='movie-overview__extra'>
        <div className='movie-overview__extra-runtime'>
          <div className='movie-overview__extra-runtime-title'>Runtime:</div>
          <div className='movie-overview__extra-runtime-text'>{runtime} min.</div>
        </div>
        <div className='movie-overview__extra-countries'>
          <div className='movie-overview__extra-countries-title'>Production countries:</div>
          <div className='movie-overview__extra-countries-text'>{country}</div>
        </div>
        <div className='movie-overview__extra-budget'>
          <div className='movie-overview__extra-budget-title'>Budget:</div>
          <div className='movie-overview__extra-budget-text'>{budget}</div>
        </div>
        <div className='movie-overview__extra-revenue'>
          <div className='movie-overview__extra-revenue-title'>Revenue:</div>
          <div className='movie-overview__extra-revenue-text'>{revenue}</div>
        </div>
        <div className='movie-overview__extra-spoken-languages'>
          <div className='movie-overview__extra-spoken-languages-title'>Spoken languages:</div>
          <div className='movie-overview__extra-spoken-languages-text'>{languages}</div>
        </div>
        <div className='movie-overview__extra-production-companies'>
          <div className='movie-overview__extra-production-companies-title'>Production companies:</div>
          <div className='movie-overview__extra-production-companies-text'>{companies}</div>
        </div>
      </div>
    </div>
  );
};

MovieOverview.defaultProps = {
    poster:'–',
    description:'–',
    genres:'–',
    realeaseDate:'–',
    runtime:'–',
    country:'–',
    director:'–',
    writers:'–',
    budget: '–',
    revenue: '–',
    languages:'–',
    companies:'–'
}

export default MovieOverview

