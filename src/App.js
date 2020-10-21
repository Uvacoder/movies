import React from 'react';
import './App.scss';
import { ConnectedRouter } from 'connected-react-router'
import {Switch,Route} from "react-router-dom";
import WelcomePage from 'containers/WelcomePage/WelcomePage'
import AppLayout from 'containers/AppLayout/AppLayout'
import { history } from './Store/store';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

function App() {
  const isLoading = useSelector(state => state.changeLoading.isLoading);

  return (
    <ConnectedRouter history={history}>
      <Spin indicator={antIcon} spinning={isLoading} size={'large'} delay={100}>
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