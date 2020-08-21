import React, { useState,useEffect } from 'react';
import "./RandomMovie.scss"
import DoughnutChart from 'components/DoughnutChart/DoughnutChart'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRandom } from 'actions/HomePageActions';
import YouTube from 'react-youtube';
import Calculation from 'utils/Calculation';
import { Scrollbars } from 'react-custom-scrollbars';

const NO_OF_FIRST_RANDOM_ITEM = 0;
const NO_OF_LAST_LAST_ITEM = 20; // No more than 20, <- maximum TMDB API table length.
const API_PATH = 'https://image.tmdb.org/t/p/w500'
const VOTE_AVERAGE_MAX_VALUE = 10;
const VOTE_AVERAGE_VALUE_OF_CHART_COLOR_CHANGE = 7;

const RandomMovie = () => {
  const randomMovie = useSelector(state => state.homePage.random.items);
  const [randomMovieId] = useState(Calculation.randomInt(NO_OF_FIRST_RANDOM_ITEM, NO_OF_LAST_LAST_ITEM));
  const dispatch = useDispatch();
  const currentMovie = randomMovie[randomMovieId];

  useEffect(() => {
    dispatch(fetchRandom(randomMovieId));
  },[dispatch, randomMovieId]);

  if (!currentMovie) {
    return null;
  }

  return (
    <div className='random-movie'>
      <img 
        className='random-movie__image' 
        src={`${API_PATH}${currentMovie.poster_path}`} 
        alt='poster'
      />
      <div className='random-movie__details'> 
        <div className='random-movie__details-title'>
            {currentMovie.title}
        </div> 
        <div className='random-movie__details-overwiev'>
          <div className='random-movie__details-overwiev-title'>
            Overwiev: 
          </div >
          <Scrollbars autoHeight>
            <div className='random-movie__details-overwiev-content'>
                {currentMovie.overview} 
            </div >
          </Scrollbars>
        </div>
        <div className='random-movie__details-date'>
          <div className='random-movie__details-date-title'>
            Release Date:
          </div>
          <div className='random-movie__details-date-content'>
            {currentMovie.release_date}
          </div>
        </div>
        <div className='random-movie__details-vote-wrapper'>
          <div className='random-movie__details-vote-wrapper-popularity'>
            <div  className='random-movie__details-vote-wrapper-popularity-name'>
                Popularity:
            </div>
            <DoughnutChart data={ Math.floor(currentMovie.popularity)  } />
          </div>
          <div className='random-movie__details-vote-wrapper-average'>
            <div className='random-movie__details-vote-wrapper-average-name'>
                Vote average:
            </div>
            <DoughnutChart 
              data={currentMovie.vote_average} 
              maxValue={VOTE_AVERAGE_MAX_VALUE} 
              percent={false} 
              chartColor= {currentMovie.vote_average > VOTE_AVERAGE_VALUE_OF_CHART_COLOR_CHANGE ? 'lightgreen' : 'Aquamarine' }
            />
          </div>
        </div>
      </div>
      <div className='random-movie__trailer'>
        <YouTube videoId={ currentMovie.videoKey[0].key }  />
      </div>   
    </div>
  )
};

export default RandomMovie
  