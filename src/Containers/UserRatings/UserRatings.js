import React,{ useEffect } from 'react';
// import "./UserRatings.scss"
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserRatings } from 'actions/UserActions'
import SearchedMovies from 'components/SearchedMovies/SearchedMovies'
import UserVote from 'components/UserVote/UserVote'
import { routeToMovieDetails } from 'utils/Routing/Routing'


function UserRatings (props) {
  const movieList = useSelector(state => state.userRating.movies);
  const dispatch = useDispatch();
  const reversedMovieList = [...movieList].reverse();

  useEffect(() => {
    dispatch(getAllUserRatings());
  },[dispatch]);

  console.log(movieList)

  const renderUserRatings = () => {
      return reversedMovieList.map((item) => {
        return (
          <div className='user-ratings__item'>
            <SearchedMovies item={item.details} routeToMovieDetails={() => dispatch(routeToMovieDetails(item.movieId))}/>
            <UserVote movieId = {item.movieId}/>
            {/* <UserVote /> */}
          </div>
        );
      })
  }
 
  return (
    <div className='user-ratings'>
      {renderUserRatings()}
    </div>
  );
};

export default UserRatings;