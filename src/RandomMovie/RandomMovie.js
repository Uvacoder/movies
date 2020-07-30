import React, { useState,useEffect } from 'react';
import "./RandomMovie.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRandom } from '../Actions/HomePageActions';
import YouTube from 'react-youtube';

const NO_OF_FIRST_RANDOM_ITEM = 0;
const NO_OF_LAST_LAST_ITEM = 20; // No more than 20, <- maximum TMDB API table length.
const API_PATH = 'https://image.tmdb.org/t/p/w500'

const RandomMovie = () => {

    const randomMovie = useSelector(state => state.homePage.random.items);
    const [randomMovieId] = useState(randomInt(NO_OF_FIRST_RANDOM_ITEM, NO_OF_LAST_LAST_ITEM));
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchRandom(randomMovieId));

    },[]);

    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
      }

    const currentMovie = randomMovie[randomMovieId];

    if (!currentMovie) {
      return null;
    }

    return (
        <div className='random-movie-container'>
          <img className='random-movie-container__image' src={`${API_PATH}${currentMovie.poster_path}`}/>
          <div className='random-movie-container__details'> 
            <div className='random-movie-container__details-title'>
                {currentMovie.title}
            </div> 
            <div className='random-movie-container__details-overwiev'>
              <div className='random-movie-container__details-overwiev-title'>
                Overwiev: 
              </div >
              <div className='random-movie-container__details-overwiev-content'>
                {currentMovie.overview}
              </div >
            </div>
            <div className='random-movie-container__details-date'>
              <div className='random-movie-container__details-date-title'>
                Release Date:
              </div>
              <div className='random-movie-container__details-date-content'>
               {currentMovie.release_date}
              </div>
            </div>
            <div className='random-movie-container__details-vote-wrapper'>
              <div className='random-movie-container__details-vote-wrapper-popularity'>
                <div  className='random-movie-container__details-vote-wrapper-popularity-name'>
                    Popularity:
                </div>
                <DoughnutChart data={ Math.floor(currentMovie.popularity)  } />
              </div>
              <div className='random-movie-container__details-vote-wrapper-average'>
                <div className='random-movie-container__details-vote-wrapper-average-name'>
                    Vote average:
                </div>
                <DoughnutChart 
                  data={currentMovie.vote_average} 
                  maxValue={10} percent={false} 
                  chartColor= {currentMovie.vote_average > 7 ? 'lightgreen' : 'Aquamarine' }
                />
              </div>
            </div>
          </div>
          <div className='random-movie-container__trailer'>
            <YouTube videoId={ currentMovie.videoKey[0].key }  />
          </div>   
        </div>
    )
};

export default RandomMovie
  