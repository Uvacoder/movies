import React from 'react';
import "./MovieHeader.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import UserVote from 'components/UserVote/UserVote'

const VOTE_AVERAGE_MAX_VALUE = 10;
const VOTE_AVERAGE_DISPLAY_PERCENT = false;
const VOTE_AVERAGE_CHART_COLOR_CHANGE_VALUE = 7;
const VOTE_AVERAGE_CHART_COLOR_HIGH = 'lightgreen';
const VOTE_AVERAGE_CHART_COLOR_LOW = 'Aquamarine';
const POPULARITY_MAX_VALUE = 100;
const POPULARITY_DISPLAY_PERCENT = true;

const MovieHeader = (props) => {
  const {
    backDropPath,
    title,
    tagline,
    voteAverage,
    popularity
  } = props;

  return (
    <div className='movie-header'>
      <div className='movie-header_image-wrapper'>
        <img src={backDropPath ? backDropPath : null } alt=''/>
      </div>
      <div className='movie-header__wrapper'>
        <div className='movie-header__wrapper-title'>
          {title}
        </div>
        <div className='movie-header__wrapper-tagline'>
          "{tagline}"
        </div>
        <div className='movie-header-votes'>
          <div className='movie-header-votes-average'>
            <span className='movie-header-votes-average-title'>Vote average:</span>
            <DoughnutChart 
              data={voteAverage} 
              maxValue={VOTE_AVERAGE_MAX_VALUE} 
              percent={VOTE_AVERAGE_DISPLAY_PERCENT} 
              chartColor= {{voteAverage} > VOTE_AVERAGE_CHART_COLOR_CHANGE_VALUE ? VOTE_AVERAGE_CHART_COLOR_HIGH : VOTE_AVERAGE_CHART_COLOR_LOW }
            />
          </div>
          <div className='movie-header-votes-popularity'>
            <span className='movie-header-votes-average-title'>Popularity:</span>
            <DoughnutChart 
              data={Math.floor(popularity)} 
              maxValue={POPULARITY_MAX_VALUE} 
              percent={POPULARITY_DISPLAY_PERCENT} 
            />
          </div> 
        </div>
      </div>
      <div className='movie-header__user-vote'>
        <UserVote />
      </div>
    </div>
  );
};

MovieHeader.defaultProps = {
    backDropPath: 'path',
    title: 'movie title',
    tagline: 'tagline',
    voteAverage: 1,
    popularity: 1
}

export default MovieHeader

