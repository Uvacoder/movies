import React from 'react';
import './Roots.scss'
import { Switch,Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage'
import RandomGifGenerator from '../RandomGifGenerator/RandomGifGenerator'

function Roots() {
    return ( 
      <>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/random-gif-generator">
          <RandomGifGenerator />
        </Route>
      </>
    )   
  }
  
export default Roots;
    