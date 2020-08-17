import React, { useEffect } from 'react';
import "./SearchedMovies.scss"
import Api from 'utils/Api';
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import ImgPlaceholder from '../../Images/imgPlaceholder.svg'
import { clearSearched } from 'actions/SearchActions'
import { useDispatch } from 'react-redux';

const POSTER_WIDTH = 500;
const VOTE_AVERAGE_MAX_VALUE = 10;
const VOTE_AVERAGE_DISPLAY_PERCENT = false;
const VOTE_AVERAGE_CHART_COLOR_CHANGE_VALUE = 7;
const VOTE_AVERAGE_CHART_COLOR_HIGH = 'lightgreen';
const VOTE_AVERAGE_CHART_COLOR_LOW = 'Aquamarine';
const POPULARITY_MAX_VALUE = 100;
const POPULARITY_DISPLAY_PERCENT = true;

const SearchedMovies = (props) => {
  const {
    item
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSearched())
    }
  },[])
 
  const filterDirector = () => {
    const director = item.details.credits.crew.filter((item) => item.job === "Director")?.[0]?.name
    return director ? director : '–'
  }

  return (
    <div className='searched-movies'>
      <div className='searched-movies__poster routed-image'>
        <img 
          src={ item.poster_path ? `${Api.getImgURL(POSTER_WIDTH)}${item.poster_path}` : ImgPlaceholder} 
          alt='poster'
          onClick={props.routing}
        />
      </div>
      <div 
        className='searched-movies__title routed-text' 
        onClick={props.routing}
      >
        {item.title}
      </div>
      <div className='searched-movies__first-container'>
        <div className='searched-movies__first-container-release'>
          <div className='searched-movies__first-container-release-title'>Release date:</div>
          <div className='searched-movies__first-container-release-text'>{item.release_date}</div>
        </div>
        <div className='searched-movies__first-container-runtime'>
          <div className='searched-movies__first-container-runtime-title'>Runtime: </div>
          <div className='searched-movies__first-container-runtime-text'>{`${item.details.runtime} min.`}</div>
        </div>
      </div>
      <div className='searched-movies__second-container'>
        <div className='searched-movies__second-container-genres'>
          <div className='searched-movies__second-container-genres-title'>Genres:</div>
          <div className='searched-movies__second-container-genres-text'>
            {item.details.genres.length !== 0 ? item.details.genres.map((item) => item.name).join(', ') : '–'}
          </div>
        </div>
        <div className='searched-movies__second-container-director'>
          <div className='searched-movies__second-container-director-title'>Director:</div>
          <div className='searched-movies__second-container-director-text'>{filterDirector()}</div>
        </div>
      </div>
      <div className='searched-movies__votes'>
        <div className='searched-movies__votes-average'>
          <div className='searched-movies__votes-average-title'>Vote average:</div>
          <div className='searched-movies__votes-average-chart'>
            <DoughnutChart 
              data={item.vote_average} 
              maxValue={VOTE_AVERAGE_MAX_VALUE} 
              percent={VOTE_AVERAGE_DISPLAY_PERCENT} 
              chartColor= {item.voteAverage > VOTE_AVERAGE_CHART_COLOR_CHANGE_VALUE ? VOTE_AVERAGE_CHART_COLOR_HIGH : VOTE_AVERAGE_CHART_COLOR_LOW }
            />
          </div>
        </div>
        <div className='searched-movies__votes-popularity'>
          <div className='searched-movies__votes-popularity-title'>Popularity:</div>
          <div className='searched-movies__votes-popularity-chart'>
            <DoughnutChart 
              data={Math.floor(item.popularity)} 
              maxValue={POPULARITY_MAX_VALUE} 
              percent={POPULARITY_DISPLAY_PERCENT} 
            />
          </div>
        </div>
      </div> 
    </div>
  );
};

SearchedMovies.defaultProps = {
    item: {}
}

export default SearchedMovies

