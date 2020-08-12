import React from 'react';
import "./SearchedMovies.scss"

const SearchedMovies = (props) => {
  const {
    item
  } = props;

  return (
    <div className='searched-movies'>
      {/* <div className='searched-movies__poster'>
        <img src={poster} alt='poster'/>
      </div>
      <div className='searched-movies__release'>
        <div className='searched-movies__release-title'>Release date:</div>
        <div className='searched-movies__release-text'>{item.realease_date}</div>
      </div>
      <div className='searched-movies__runtime'>
        <div className='searched-movies__runtime-title'>Runtime:</div>
        <div className='searched-movies__runtime-text'>{runtime}</div>
      </div>
      <div className='searched-movies__genres'>
        <div className='searched-movies__genres-title'>Genres:</div>
        <div className='searched-movies__genres-text'>{item.genres_id}</div>
      </div>
      <div className='searched-movies__director'>
        <div className='searched-movies__director-title'>Director:</div>
        <div className='searched-movies__director-text'>{director}</div>
      </div>
      <div className='searched-movies__votes'>
        <div className='searched-movies__votes-average'>
          <div className='searched-movies__votes-average-title'>Vote average:</div>
          <div className='searched-movies__votes-average-chart'>{average}</div>
        </div>
        <div className='searched-movies__votes-popularity'>
          <div className='searched-movies__votes-popularity-title'>Popularity</div>
          <div className='searched-movies__votes-popularity-chart'>{popularity}</div>
        </div>
      </div> */}
    </div>
  );
};

SearchedMovies.defaultProps = {
    item: {}
}

export default SearchedMovies

