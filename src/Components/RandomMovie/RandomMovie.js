import React from 'react';
import "./RandomMovie.scss"
import DoughnutChart from 'components/DoughnutChart/DoughnutChart'
import YouTube from 'react-youtube';
import { Scrollbars } from 'react-custom-scrollbars';
import TMDBApi from 'utils/TMDBApi';

const IMG_SIZE = 342;
const VOTE_AVERAGE_MAX_VALUE = 10;

const RandomMovie = (props) => {
  const {
    randomMovie 
  } = props;

  const renderImage = (imgPath) => {
    return (
      <img 
        className='random-movie__image routed-image' 
        src={imgPath} 
        alt='poster'
        onClick={() => props.routeToMovieDetails(randomMovie.id)}
      />
    );
  };

  const renderDetails = (movie) => {
    return (
      <>
        <div 
        className='random-movie__details-title routed-text'
        onClick={() => props.routeToMovieDetails(movie.id)}>
          {movie.title}
        </div> 
        <div className='random-movie__details-overwiev'>
          <div className='random-movie__details-overwiev-title'>
            Overview: 
          </div >
          <Scrollbars autoHeight>
            <div className='random-movie__details-overwiev-content'>
                {movie.overview} 
            </div >
          </Scrollbars>
        </div>
        <div className='random-movie__details-date'>
          <div className='random-movie__details-date-title'>
            Release Date:
          </div>
          <div className='random-movie__details-date-content'>
            {movie.release_date}
          </div>
        </div>
      </>
    );
  };

  const renderVoteCharts = (movie) => {
    return (
      <>
        <div className='random-movie__details-vote-wrapper-average'>
          <div className='random-movie__details-vote-wrapper-average-name'>
            Vote average:
          </div>
          <DoughnutChart 
            data={movie.vote_average} 
            maxValue={VOTE_AVERAGE_MAX_VALUE} 
            percent={false} 
          />
        </div>
        <div className='random-movie__details-vote-wrapper-popularity'>
          <div className='random-movie__details-vote-wrapper-popularity-name'>
              Popularity:
          </div>
          <DoughnutChart data={ Math.floor(movie.popularity) }/>
        </div>
      </>
    );
  };

  if (!randomMovie || !randomMovie.videoKey) {
    return null;
  };

  return (
    <div className='random-movie'>
      {renderImage(`${TMDBApi.getImgURL(IMG_SIZE)}${randomMovie.poster_path}`)}
      <div className='random-movie__details'> 
        {renderDetails(randomMovie)}
        <div className='random-movie__details-vote-wrapper'>
          {renderVoteCharts(randomMovie)}
        </div>
      </div>
      <div className='random-movie__trailer'>
        <YouTube videoId={ randomMovie.videoKey.key }  />
      </div>   
    </div>
  );
};

export default RandomMovie
  