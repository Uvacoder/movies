import React from 'react';
import './Roots.scss'
import { Switch,Route } from "react-router-dom";
import HomePage from '../HomePage/HomePage'

function Roots() {
    return ( 
      <>
        <Route path="/home">
          <HomePage />
        </Route>
      </>
    )   
  }
  
export default Roots;
    