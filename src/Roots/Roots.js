import React from 'react';
import { Route } from "react-router-dom";
import HomePage from 'containers/HomePage/HomePage'
import RandomGifGenerator from 'containers/RandomGifGenerator/RandomGifGenerator'
import MovieDetails from 'containers/MovieDetails/MovieDetails'
import SearchResults from 'containers/SearchResults/SearchResults'
import About from 'components/About/About'
import TopList from 'containers/TopList/TopList'
import RecentMovies from 'containers/RecentMovies/RecentMovies'
import UserRatings from 'containers/UserRatings/UserRatings'

function Roots() {
  return ( 
    <>
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/random-gif-generator">
        <RandomGifGenerator />
      </Route>
      <Route path="/movie/:id">
        <MovieDetails />
      </Route>
      <Route path="/toplist/:type">
        <TopList />
      </Route>
      <Route path="/search-results">
        <SearchResults />
      </Route>
      <Route path="/new/:type">
        <RecentMovies />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/user-ratings">
        <UserRatings />
      </Route>
    </>
  );   
};
  
export default Roots;