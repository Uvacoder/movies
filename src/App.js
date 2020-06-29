import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Switch,Route} from "react-router-dom";
import WelcomePage from './WelcomePage/WelcomePage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
