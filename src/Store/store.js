import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import allReducers from 'reducers/allReducers';
import { routerMiddleware } from 'connected-react-router'
import storeRegistry from './storeRegistry';

export const history = createBrowserHistory()
history.listen(() => {
  window.scrollTo(0, 0)
});


console.log('createStore')
const store = createStore(
  allReducers(history),
  compose(
    applyMiddleware(routerMiddleware(history), thunk), 
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose
  )
);

storeRegistry.setStore(store)




