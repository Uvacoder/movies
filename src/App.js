import React from 'react';
import './App.scss';
import { ConnectedRouter } from 'connected-react-router'
import {Switch,Route} from "react-router-dom";
import WelcomePage from 'containers/WelcomePage/WelcomePage'
import AppLayout from 'containers/AppLayout/AppLayout'
import { history } from './Store/store';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { ReactComponent as Loader } from "./Images/loader.svg"

function App() {
  const isLoading = useSelector(state => state.global.isLoading);
  debugger;
  return (
    <ConnectedRouter history={history}>
      {/* <Spin indicator={antIcon} spinning={isLoading} size={'large'} delay={100}> */}
      {/* <Spin indicator={myConst()} spinning={true} size={'large'} delay={150}> */}
      <Spin indicator={<Loader />} spinning={isLoading} size={'large'} delay={150}>
        <Switch>
          <Route exact path="/">
            <WelcomePage />
          </Route>
          <AppLayout />
        </Switch>
      </Spin>
    </ConnectedRouter>
  );
};

export default App;