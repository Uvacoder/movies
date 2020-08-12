import React from 'react';
import './Roots.scss'
import { Route } from "react-router-dom";
import HomePage from '../Containers/HomePage/HomePage'
import RandomGifGenerator from '../Components/RandomGifGenerator/RandomGifGenerator'
import MovieDetails from '../Containers/MovieDetails/MovieDetails'

function Roots() {
    return ( 
      <>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/random-gif-generator">
          <RandomGifGenerator />
        </Route>
        <Route path="/movie">
          <MovieDetails />
        </Route>
      </>
    )   
  }
  
export default Roots;
    