import React from 'react';
import './App.scss';
import {BrowserRouter as Router} from "react-router-dom";
import {Switch,Route} from "react-router-dom";
import WelcomePage from './WelcomePage/WelcomePage'
import AppLayout from './Containers/AppLayout/AppLayout'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <AppLayout />
      </Switch>
    </Router>
  );
}

export default App;
