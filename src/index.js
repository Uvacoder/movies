import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import storeRegistry from './Store/storeRegistry';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ storeRegistry.getStore() }>
      <App /> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();