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
    // console.log('isLoading',isLoading)
  return (
    <ConnectedRouter history={history}>
      <Spin 
        indicator={<Loader />} 
        spinning={isLoading} 
        size={'large'} 
        delay={0} 
        wrapperClassName={isLoading ? 'ant-spin__wrapper--spinning' : ''}
        className='ant-spin__global'
      > {/* TO DO Change delay to 1000ms */}
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