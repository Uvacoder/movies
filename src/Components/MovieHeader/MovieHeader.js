import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./MovieHeader.scss"
import DoughnutChart from '../DoughnutChart/DoughnutChart'
import UserVote from 'components/UserVote/UserVote'
import { Tooltip } from 'antd';
import { withRouter } from 'react-router-dom'
import { getUserRating, saveUserRating } from 'actions/UserActions'
import UserUtil from 'utils/UserUtil'
import withSkeleton from 'utils/withSkeleton';
import { PLACEHOLDER } from 'utils/Consts/Text';

const VOTE_AVERAGE_MAX_VALUE = 10;
const VOTE_AVERAGE_DISPLAY_PERCENT = false;
const POPULARITY_MAX_VALUE = 100;
const POPULARITY_DISPLAY_PERCENT = true;
const TOOTLTIP_TEXT = 'To use all Movie Lounge features like voting or commenting, please register.'
const TOOTLTIP_COLOR = '#044251';

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
  const [voteTooltipVisible, setVoteTooltipVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setVoteTooltipVisible(true)
    }, 1500)
    return () => tooltipSeenActions();
  }, [])

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

  const getVoteTootlipVisited = () => {
    return JSON.parse(localStorage.getItem('voteTooltipVisited'))
  }

  const tooltipSeenActions = () => {
    localStorage.setItem('voteTooltipVisited', true)
    setVoteTooltipVisible(false)
  }

  const renderTooltipText = () => {
    return (
      <div 
        className="user-vote__tooltip-text" 
        onClick={() => { tooltipSeenActions() }}
      >
        <p>{`Hello ${localStorage.getItem('userName')}!`}</p>
        <p>Don't forget to rate and comment</p>
      </div>
    );
  };

  const renderUserVote = (onClick) => {
    return (
      <div className='movie-header__user-vote' onClick={ onClick }>
        <UserVote 
          onClick={onClick}
          currentMovieId={Number(props.match.params.id)} 
          currentMovieRating = {movieList.find( item => item.movieId === Number(props.match.params.id))}
          saveUserRating = {(...args) => dispatch(saveUserRating(...args))}
        />
      </div>
    )
  }

  const displayUserVote = () => {
    if (!UserUtil.isUserLogged()) {
      return (
        <Tooltip 
          placement="left" 
          title={TOOTLTIP_TEXT} 
          color={TOOTLTIP_COLOR}
        >
          <div className='movie-header__user-vote'>
            <UserVote />
          </div>
        </Tooltip>
      )
    } else {
      const tooltipVisible = voteTooltipVisible && !getVoteTootlipVisited();

      return (
        <Tooltip 
          placement="bottom"
          title={renderTooltipText} 
          color={'#f5f5f5'}
          visible={tooltipVisible}
          overlayClassName="user-vote__tooltip-overlay"
        >
          { renderUserVote(tooltipVisible && tooltipSeenActions) }
        </Tooltip>
      )
    }
  };

  return (
    <div className='movie-header'>
      <div className='movie-header__image-wrapper'>
        {renderBackdropImage()}
      </div>
      <div className='movie-header__wrapper'>
        <div className='movie-header__wrapper-title'>
          {withSkeleton(title, { width: 500, height: 30 })}
        </div>
        <div className='movie-header__wrapper-tagline'>
          {withSkeleton(tagline, { width: 300, height: 15 })}
        </div>
        <div className='movie-header-votes'>
          <div className='movie-header-votes-average'>
            <span className='movie-header-votes-average-title'>Vote average:</span>
            <DoughnutChart 
              data={voteAverage} 
              maxValue={VOTE_AVERAGE_MAX_VALUE} 
              percent={VOTE_AVERAGE_DISPLAY_PERCENT}
              ignoreZeroValue={true}
            />
          </div>
          <div className='movie-header-votes-popularity'>
            <span className='movie-header-votes-average-title'>Popularity:</span>
            <DoughnutChart 
              data={Math.floor(popularity)} 
              maxValue={POPULARITY_MAX_VALUE} 
              percent={POPULARITY_DISPLAY_PERCENT} 
              ignoreZeroValue={true}
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
    title: PLACEHOLDER,
    tagline: PLACEHOLDER,
    voteAverage: 0,
    popularity: 0
};

export default withRouter(MovieHeader)