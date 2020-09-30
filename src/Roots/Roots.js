import React from 'react';
import './Roots.scss'
import { Route } from "react-router-dom";
import HomePage from 'containers/HomePage/HomePage'
import RandomGifGenerator from 'components/RandomGifGenerator/RandomGifGenerator'
import MovieDetails from 'containers/MovieDetails/MovieDetails'
import SearchResults from 'containers/SearchResults/SearchResults'
import TopList from 'containers/TopList/TopList'
import RecentMovies from 'containers/RecentMovies/RecentMovies'

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
      </>
    )   
  }
  
export default Roots;
    