import React from 'react';
import './Roots.scss'
import { Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage'
import RandomGifGenerator from '../RandomGifGenerator/RandomGifGenerator'
import MovieDetails from '../MovieDetails/MovieDetails'

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
    