import React from 'react';
import './App.scss';
import { ConnectedRouter } from 'connected-react-router'
import {Switch,Route} from "react-router-dom";
import WelcomePage from 'containers/WelcomePage/WelcomePage'
import AppLayout from 'containers/AppLayout/AppLayout'
import { history } from './store';

function App() {
  return (
    <ConnectedRouter onUpdate={() => window.scrollTo(0, 0)} history={history} >
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <AppLayout />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
