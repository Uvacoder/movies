import React, { useState,useEffect } from 'react';
import "./RandomMovie.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import { useSelector, useDispatch } from 'react-redux'
import { fetchRandom, cleanUpFetchRandom } from '../Actions/HomePageActions'


const NO_OF_FIRST_RANDOM_ITEM = 0;
const NO_OF_LAST_LAST_ITEM = 20; // No more than 20, <- maximum TMDB API table length.
const API_PATH = 'https://image.tmdb.org/t/p/w500'

const RandomMovie = () => {

    const randomMovie = useSelector(state => state.homePage.random.items);
    const [randomMovieId, setRandomMovieId] = useState(randomInt(NO_OF_FIRST_RANDOM_ITEM, NO_OF_LAST_LAST_ITEM));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRandom());
    
        return () => {
          setRandomMovieId(null);
          dispatch(cleanUpFetchRandom());
          console.log('cleaned up')
        }
      },[dispatch]);

    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
      }
    
    return (
        <div className='random-movie-container'>
          <img className='random-movie-container__image' src={`${API_PATH}${randomMovie[randomMovieId]?.poster_path}`}/>
          <div className='random-movie-container__details'> 
            <div className='random-movie-container__details-title'>
                {randomMovie[randomMovieId]?.title}
            </div>  
            <div className='random-movie-container__details-overwiev'>
                Overwiev: {randomMovie[randomMovieId]?.overview}
            </div>
            <div className='random-movie-container__details-date'>
                Release Date: {randomMovie[randomMovieId]?.release_date}
            </div>
            <div className='random-movie-container__details-vote-wrapper'>
              <div className='random-movie-container__details-vote-wrapper-popularity'>
                <div  className='random-movie-container__details-vote-wrapper-popularity-name'>
                    Popularity:
                </div>
                <DoughnutChart data={Math.floor(randomMovie[randomMovieId]?.popularity)}/>
              </div>
              <div className='random-movie-container__details-vote-wrapper-average'>
                <div className='random-movie-container__details-vote-wrapper-average-name'>
                    Vote average:
                </div>
                <DoughnutChart data={randomMovie[randomMovieId]?.vote_average} maxValue={10} percent={false}/>
              </div>
            </div>
          </div>
          <iframe className='random-movie-container__video' width="420" height="315"
            src="https://www.youtube.com/embed/tgbNymZ7vqY">
          </iframe>
        </div>
    )
  };

export default RandomMovie
  