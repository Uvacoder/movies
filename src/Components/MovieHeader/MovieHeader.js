import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./MovieHeader.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import UserVote from 'components/UserVote/UserVote'
import { Tooltip } from 'antd';
import { withRouter } from 'react-router-dom'
import { getUserRating, saveUserRating } from 'actions/UserActions'
import UserUtil from 'utils/UserUtil'

const VOTE_AVERAGE_MAX_VALUE = 10;
const VOTE_AVERAGE_DISPLAY_PERCENT = false;
const POPULARITY_MAX_VALUE = 100;
const POPULARITY_DISPLAY_PERCENT = true;
const TOOTLTIP_TEXT = 'To use all Movie Lounge features like voting or commenting, please register.'
const TOOTLTIP_COLOR = '#1890ff';

const MovieHeader = (props) => {
  const {
    backDropPath,
    title,
    tagline,
    voteAverage,
    popularity,
  } = props;
  const dispatch = useDispatch();
  const movieList = useSelector(state => state.userRating.movies);

  useEffect(() => {
    if (UserUtil.isUserLogged()) {
      dispatch(getUserRating(props.match.params.id));
    }
  },[dispatch, props.match.params.id]);

  const renderBackdropImage = () => {
    if (!backDropPath) {
      return <div className='movie-header__image-wrapper-placeholder'/>
    };
    return <img src={backDropPath} alt=''/>
  };

  const displayUserVote = () => {
    if (!UserUtil.isUserLogged()) {
      return (
      <Tooltip placement="left" title={TOOTLTIP_TEXT} color={TOOTLTIP_COLOR}>
        <div className='movie-header__user-vote'>
          <UserVote />
        </div>
      </Tooltip>
      )
    } else
    return (
      <div className='movie-header__user-vote'>
        <UserVote 
          currentMovieId={Number(props.match.params.id)} 
          currentMovieRating = {movieList.find( item => item.movieId === Number(props.match.params.id))}
          saveUserRating = {(...args) => dispatch(saveUserRating(...args))}
        />
      </div>
    );
  };

  return (
    <div className='movie-header'>
      <div className='movie-header__image-wrapper'>
        {renderBackdropImage()}
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
      {displayUserVote()}
    </div>
  );
};

MovieHeader.defaultProps = {
    backDropPath: '',
    title: '',
    tagline: '',
    voteAverage: 0,
    popularity: 0
};

export default withRouter(MovieHeader)

