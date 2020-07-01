import React from 'react';
import './Roots.scss'
import { Switch,Route } from "react-router-dom";

function Roots() {
    return ( 
      <>
        <Route path="/home">
          HOME PAGE
        </Route>
      </>
    )   
  }
  
export default Roots;
    