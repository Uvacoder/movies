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
  const dispatch = useDispatch();
  const reversedMovieList = [...movieList].reverse();

  useEffect(() => {
    dispatch(getAllUserRatings());
  },[dispatch]);

  console.log(movieList)

  const renderUserRatings = () => {
    if (movieList.length !== 0) {
      return reversedMovieList.map((item) => {
        return (
          <div className='user-ratings__item'>
            <UserVote 
              currentMovieId = {item.movieId}
              currentMovieRating = {movieList.find(x => x.movieId === item.movieId)}
              saveUserRating = {(...args) => dispatch(saveUserRating(...args))}
           />
            <SearchedMovies item={item.details} routeToMovieDetails={() => dispatch(routeToMovieDetails(item.movieId))}/>
          </div>
        );
      })
    } else {
      return (
        <div className='user-ratings__empty'>
          You haven't rated any movies yet.
        </div>
      )
    }
  }
 
  return (
    <div className='user-ratings'>
      <Divider className='user-ratings__divider' orientation='center'>Your ratings ({movieList.length}):</Divider>
      {renderUserRatings()}
    </div>
  );
};

export default UserRatings;