import React from 'react';
import "./MovieOverview.scss"
import { Scrollbars } from 'react-custom-scrollbars';
import withSkeleton from 'utils/withSkeleton';

const PLACEHOLDER = '–'
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
          <div className='movie-overview__description-text'>{withSkeleton(description, { width: 250, rows: 4 })}</div>   
        </Scrollbars>  
      </div>
      <div className='movie-overview__release'>
        <div className='movie-overview__release-title'>Release date:</div>
        <div className='movie-overview__release-text'>{withSkeleton(realeaseDate, { width: 150 })}</div>
      </div>
      <div className='movie-overview__genres'>
        <div className='movie-overview__genres-title'>Genres:</div>
        <div className='movie-overview__genres-text'>{withSkeleton(genres, { width: 100 })}</div>
      </div>
      <div className='movie-overview__director'>
        <div className='movie-overview__director-title'>Director:</div>
        <div className='movie-overview__director-text'>{withSkeleton(director, { width: 230 })}</div>
      </div>
      <div className='movie-overview__writers'>
        <div className='movie-overview__writers-title'>Writers:</div>
        <div className='movie-overview__writers-text'>{withSkeleton(writers, { width: 150 })}</div>
      </div>
      <div className='movie-overview__extra'>
        <div className='movie-overview__extra-runtime'>
          <div className='movie-overview__extra-runtime-title'>Runtime:</div>
          <div className='movie-overview__extra-runtime-text'>{withSkeleton(runtime, { width: 100 })} {runtime !== PLACEHOLDER ? 'min.' : ''}</div>
        </div>
        <div className='movie-overview__extra-countries'>
          <div className='movie-overview__extra-countries-title'>Production countries:</div>
          <div className='movie-overview__extra-countries-text'>{withSkeleton(country, { width: 250 })}</div>
        </div>
        <div className='movie-overview__extra-budget'>
          <div className='movie-overview__extra-budget-title'>Budget:</div>
          <div className='movie-overview__extra-budget-text'>{withSkeleton(budget, { width: 100 })}</div>
        </div>
        <div className='movie-overview__extra-revenue'>
          <div className='movie-overview__extra-revenue-title'>Revenue:</div>
          <div className='movie-overview__extra-revenue-text'>{withSkeleton(revenue, { width: 100 })}</div>
        </div>
        <div className='movie-overview__extra-spoken-languages'>
          <div className='movie-overview__extra-spoken-languages-title'>Spoken languages:</div>
          <div className='movie-overview__extra-spoken-languages-text'>{withSkeleton(languages, { width: 250 })}</div>
        </div>
        <div className='movie-overview__extra-production-companies'>
          <div className='movie-overview__extra-production-companies-title'>Production companies:</div>
          <div className='movie-overview__extra-production-companies-text'>{withSkeleton(companies, { width: 260 })}</div>
        </div>
      </div>
    </div>
  );
};

MovieOverview.defaultProps = {
  poster: PLACEHOLDER,
  description: PLACEHOLDER,
  genres: PLACEHOLDER,
  realeaseDate: PLACEHOLDER,
  runtime: PLACEHOLDER,
  country: PLACEHOLDER,
  director: PLACEHOLDER,
  writers: PLACEHOLDER,
  budget: PLACEHOLDER,
  revenue: PLACEHOLDER,
  languages: PLACEHOLDER,
  companies: PLACEHOLDER
};

export default MovieOverview