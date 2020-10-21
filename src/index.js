import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
// import { store } from './Store/store'
import storeRegistry from './Store/storeRegistry';

// const { detect } = require('detect-browser');
// const browser = detect();

// if (browser.name === 'ie' || browser.name === 'edge') {
//   <div>PLEASE USE MODERN BROWSER. EX. CHROME</div>
//   const root = document.getElementById('root');
//   const myDiv = document.createElement('div');
//   myDiv.innerHTML = "Please use modern browser like Chrome or Firefox" 
//   root.appendChild(myDiv)
// } else {
ReactDOM.render(
  <React.StrictMode>
    <Provider store={ storeRegistry.getStore() }>
      <App /> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// }
//SUPER TMP
// window.store = store;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
