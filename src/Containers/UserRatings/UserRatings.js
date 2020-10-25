import React,{ useEffect } from 'react';
import "./UserRatings.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserRatings, saveUserRating } from 'actions/UserActions'
import SearchedMovies from 'components/SearchedMovies/SearchedMovies'
import UserVote from 'components/UserVote/UserVote'
import { routeToMovieDetails } from 'utils/Routing/Routing'
import { Divider } from 'antd'

function UserRatings () {
  const movieList = useSelector(state => state.userRating.movies);
  const isLoading = useSelector(state => state.global.isLoading);
  const reversedMovieList = [...movieList].reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserRatings());
  },[dispatch]);

  const renderUserRatings = () => {
    if (movieList.length !== 0) {
      return reversedMovieList.map((item) => {
        if (!item.details) {
          return null
        };

        return (
          <div className='user-ratings__item'>
            <UserVote 
              currentMovieId = {item.movieId}
              currentMovieRating = {movieList.find(movie => movie.movieId === item.movieId)}
              saveUserRating = {(...args) => dispatch(saveUserRating(...args))}
           />
            <SearchedMovies 
              routeToMovieDetails={() => dispatch(routeToMovieDetails(item.movieId))}
              poster={item.details.poster_path}
              title={item.details.title}
              release_date={item.details.release_date}
              runtime={item.details.runtime}
              genres={item.details.genres.length !== 0 ? item.details.genres.map((item) => item.name).join(', ') : '–'}
              director={item.details.credits.crew.find((item) => item.job === "Director").name}
              vote_average={item.details.vote_average}
              popularity={item.details.popularity}
            />
          </div>
        );
      });
    } else {
      return (
        <div className='user-ratings__empty'>
          You haven't rated any movies yet.
        </div>
      );
    };
  };

  if (isLoading) {
    return null
  };
 
  return (
    <div className='user-ratings'>
      <Divider className='user-ratings__divider' orientation='center'>Your ratings ({movieList.length}):</Divider>
      {renderUserRatings()}
    </div>
  );
};

export default UserRatings;